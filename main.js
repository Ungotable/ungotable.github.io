document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('video').forEach(video => {
        video.muted = false;
        video.loop = true;
        video.setAttribute('playsinline', '');
        video.removeAttribute('autoplay');
        video.pause();

        if (window.matchMedia("(hover: hover)").matches) {
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

    window.addEventListener("pageshow", () => {
        document.querySelectorAll('video').forEach(video => {
            video.pause();
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