document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.explanation-container').forEach(container => {
        const explanationText = container.querySelector('.explanation-text');

        explanationText.querySelectorAll('h2, p').forEach((paragraph, index) => {
            paragraph.style.transitionDelay = `${1 + index * 0.3}s`;
        });

        const checkIfInView = () => {
            const rect = container.getBoundingClientRect();
            const buffer = 200;
            const isVisible = rect.top < window.innerHeight - buffer && rect.bottom > buffer;

            if (isVisible) {
                container.classList.add('in-view');
                explanationText.querySelectorAll('h2, p').forEach((paragraph, index) => {
                    setTimeout(() => paragraph.classList.add('in-view'), (1 + index * 300));
                });
            } else {
                container.classList.remove('in-view');
                explanationText.querySelectorAll('h2, p').forEach(paragraph => {
                    paragraph.classList.remove('in-view');
                });
            }
        };

        window.addEventListener('scroll', checkIfInView);
        checkIfInView();
    });

    let currentPlayingVideo = null;
    const videos = document.querySelectorAll('video');
    const frame = document.querySelector('.frame');

    videos.forEach(video => {
        video.muted = false;
        video.loop = true;
        video.setAttribute('playsinline', '');
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'metadata');
        video.pause();
        video.currentTime = 0;
    });

    if (window.matchMedia("(hover: hover)").matches) {
        videos.forEach(video => {
            video.addEventListener('mouseenter', () => {
                video.play();
            });

            video.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
    } else {
        let isScrolling;

        frame.addEventListener('scroll', () => {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                let closestVideo = null;
                let minDistance = Infinity;

                videos.forEach(video => {
                    const rect = video.getBoundingClientRect();
                    const distance = Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestVideo = video;
                    }
                });

                if (closestVideo) {
                    frame.scrollTo({
                        left: closestVideo.parentElement.offsetLeft - frame.offsetLeft,
                        behavior: "smooth"
                    });

                    if (currentPlayingVideo && currentPlayingVideo !== closestVideo) {
                        currentPlayingVideo.pause();
                        currentPlayingVideo.currentTime = 0;
                        currentPlayingVideo.classList.remove('playing');
                    }
                    
                    closestVideo.play();
                    closestVideo.classList.add('playing'); 
                    currentPlayingVideo = closestVideo;
                }
            }, 100);
        });
    }

    window.addEventListener("pageshow", () => {
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    });

    document.querySelectorAll('a[href="index.html"]').forEach(link => {
        link.addEventListener('click', () => {
            sessionStorage.setItem("pauseVideos", "true");
        });
    });

    if (sessionStorage.getItem("pauseVideos")) {
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        sessionStorage.removeItem("pauseVideos");
    }

    window.onload = function () {
        let targetSection = null;

        if (sessionStorage.getItem("fromMBTI")) {
            targetSection = "scroll-1";
            sessionStorage.removeItem("fromMBTI");
        }

        if (sessionStorage.getItem("fromQuiz")) {
            targetSection = sessionStorage.getItem("scrollTarget");
            sessionStorage.removeItem("fromQuiz");
        }

        if (!targetSection) {
            targetSection = sessionStorage.getItem("scrollTarget");
        }

        if (targetSection) {
            let targetElement = document.getElementById(targetSection);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 200);
            }
            sessionStorage.removeItem("scrollTarget");
        }
    };
});
