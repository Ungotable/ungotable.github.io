document.addEventListener('DOMContentLoaded', () => {
    let currentPlayingVideo = null;

    document.querySelectorAll('video').forEach(video => {
        video.muted = false;
        video.loop = true;
        video.setAttribute('playsinline', '');
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'metadata');
        video.pause();
        video.currentTime = 0;

        if (window.matchMedia("(hover: hover)").matches) {
            video.addEventListener('mouseenter', () => video.play());
            video.addEventListener('mouseleave', () => video.pause());
        } else {
            video.addEventListener('click', () => {
                if (currentPlayingVideo && currentPlayingVideo !== video) {
                    currentPlayingVideo.pause();
                    currentPlayingVideo.currentTime = 0;
                }

                if (video.paused) {
                    video.play();
                    currentPlayingVideo = video;
                } else {
                    video.pause();
                    video.currentTime = 0;
                    currentPlayingVideo = null;
                }
            });
        }
    });
});

window.addEventListener("pageshow", () => {
    document.querySelectorAll('video').forEach(video => {
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
    document.querySelectorAll('video').forEach(video => {
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

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav");

    menuButton.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});