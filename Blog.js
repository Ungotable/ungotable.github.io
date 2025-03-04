document.addEventListener("DOMContentLoaded", function () {
    showPopup(); // Munculkan popup langsung setelah halaman dimuat
});

function showPopup() {
    let popup = document.createElement("div");
    popup.id = "vignette-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Tahukah kamu?</h2>
            <p>Sistem saraf dalam tubuh bisa mengalami gangguan akibat berbagai faktor, mulai dari trauma, infeksi, tumor, gangguan sistem kekebalan tubuh, hingga kelainan aliran darah.</p>
            <button id="close-popup">Tutup</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    document.getElementById("close-popup").addEventListener("click", function () {
        popup.style.display = "none";
    });
}

const style = document.createElement("style");
style.innerHTML = `
    #vignette-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .popup-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
    }
    #close-popup {
        margin-top: 10px;
        padding: 5px 10px;
        background: #6a5acd;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);
