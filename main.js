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

    document.querySelectorAll('video').forEach(video => {
        video.muted = false;
        video.loop = true;
        video.setAttribute('playsinline', '');
        video.removeAttribute('autoplay'); // Mencegah autoplay
        video.pause(); // Pastikan video tidak jalan dari awal
        
        if (window.matchMedia("(hover: hover)").matches) {
            // Desktop (harus hover)
            video.addEventListener('mouseenter', () => video.play());
            video.addEventListener('mouseleave', () => video.pause());
        } else {
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
});


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