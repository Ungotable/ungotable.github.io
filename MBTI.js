const questions = [
    { question: "Saat berada di pesta, kamu lebih suka…", options: ["Berinteraksi dengan banyak orang dan bersosialisasi", "Menghabiskan waktu dengan beberapa teman dekat"], type: "EI" },
    { question: "Saat mengisi energi, kamu lebih cenderung…", options: ["Berada di tempat ramai dengan banyak orang", "Menghabiskan waktu sendiri untuk refleksi"], type: "EI" },
    { question: "Saat berbicara, kamu lebih suka…", options: ["Menyampaikan pemikiran dengan spontan", "Berpikir dahulu sebelum berbicara"], type: "EI" },
    { question: "Dalam memahami informasi, kamu lebih suka…", options: ["Fakta konkret dan detail yang jelas", "Ide-ide abstrak dan kemungkinan yang lebih luas"], type: "SN" },
    { question: "Saat belajar sesuatu yang baru, kamu lebih nyaman dengan…", options: ["Instruksi langkah demi langkah yang jelas", "Eksplorasi ide secara mandiri dan kreatif"], type: "SN" },
    { question: "Kamu lebih percaya pada…", options: ["Pengalaman nyata dan hal yang bisa dibuktikan", "Intuisi dan perasaan tentang apa yang mungkin terjadi"], type: "SN" },
    { question: "Dalam mengambil keputusan, kamu lebih mengandalkan…", options: ["Logika dan objektivitas", "Perasaan dan hubungan antar manusia"], type: "TF" },
    { question: "Saat menilai situasi, kamu lebih mempertimbangkan…", options: ["Apa yang benar secara rasional", "Bagaimana perasaan orang lain akan terpengaruh"], type: "TF" },
    { question: "Dalam diskusi, kamu lebih cenderung…", options: ["Menekankan argumen yang masuk akal dan kuat", "Mencari kesepahaman dan keharmonisan"], type: "TF" },
    { question: "Ketika bekerja pada suatu proyek, kamu lebih suka…", options: ["Memiliki rencana yang jelas dan terstruktur", "Membiarkan proses berkembang secara fleksibel"], type: "JP" },
    { question: "Saat menghadapi perubahan, kamu lebih nyaman dengan…", options: ["Rencana yang sudah ditentukan sebelumnya", "Menyesuaikan diri secara spontan dengan situasi"], type: "JP" },
    { question: "Dalam menyelesaikan tugas, kamu lebih suka…", options: ["Mengikuti jadwal yang ketat dan jelas", "Menyesuaikan dengan suasana hati dan keadaan"], type: "JP" }
];

let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function loadQuestion() {
    document.getElementById("question-text").innerText = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;
    document.getElementById("question-number").innerText = `Soal ${currentQuestion + 1}/${questions.length}`;

    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    let submitButton = document.getElementById("submit-button");
    submitButton.style.display = "none";

    questions[currentQuestion].options.forEach((text, index) => {
        let type = questions[currentQuestion].type;
        let button = document.createElement("button");
        button.innerText = text;
        button.onclick = () => selectAnswer(type[index], button);
        optionsContainer.appendChild(button);
    });

    selectedType = "";
}

let selectedType = "";

function selectAnswer(type, button) {
    let buttons = document.querySelectorAll("#options-container button");
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");

    selectedType = type;

    document.getElementById("submit-button").style.display = "block";
}

function submitAnswer() {
    if (!selectedType) {
        alert("Pilih jawaban terlebih dahulu!");
        return;
    }

    scores[selectedType]++;
    selectedType = "";

    let quizContainer = document.getElementById("quiz");
    quizContainer.classList.add("fade-out"); // Tambahkan efek transisi

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }

        quizContainer.classList.remove("fade-out");
        quizContainer.classList.add("fade-in");
    }, 300); // Beri jeda sebelum mengganti pertanyaan
}


function showResult() {
    let mbtiType = (scores.E >= scores.I ? "E" : "I") +
        (scores.S >= scores.N ? "S" : "N") +
        (scores.T >= scores.F ? "T" : "F") +
        (scores.J >= scores.P ? "J" : "P");

    let explanations = {
        "INTJ": "Kamu adalah seorang perencana visioner yang mengandalkan logika dan strategi untuk mencapai tujuan.",
        "INTP": "Kamu seorang pemikir yang suka menganalisis konsep dan mencari kebenaran dalam berbagai aspek.",
        "ENTJ": "Kamu adalah pemimpin alami yang tegas dan selalu mencari cara untuk meningkatkan efisiensi.",
        "ENTP": "Kamu penuh ide dan suka berdebat untuk mengeksplorasi berbagai kemungkinan dalam hidup.",
        "INFJ": "Kamu seorang idealis yang memiliki visi besar dan berusaha membantu orang lain mencapai potensi terbaik mereka.",
        "INFP": "Kamu sangat peduli dengan nilai-nilai pribadi dan sering kali berusaha membuat dunia menjadi tempat yang lebih baik.",
        "ENFJ": "Kamu adalah inspirator yang hebat dan suka membimbing serta memotivasi orang lain.",
        "ENFP": "Kamu energik, penuh ide, dan suka beradaptasi dalam berbagai situasi.",
        "ISTJ": "Kamu sangat terorganisir, bertanggung jawab, dan suka bekerja dengan struktur yang jelas.",
        "ISFJ": "Kamu penyayang, setia, dan selalu berusaha menjaga kesejahteraan orang-orang di sekitar.",
        "ESTJ": "Kamu praktis dan suka mengambil kendali dalam mengatur sesuatu agar berjalan dengan efisien.",
        "ESFJ": "Kamu peduli dengan hubungan sosial dan ingin menciptakan harmoni dalam lingkunganmu.",
        "ISTP": "Kamu suka mencoba hal baru, berpikir logis, dan sering bertindak cepat dalam mengambil keputusan.",
        "ISFP": "Kamu memiliki jiwa seni yang tinggi dan lebih suka mengekspresikan diri melalui tindakan daripada kata-kata.",
        "ESTP": "Kamu penuh energi, suka tantangan, dan suka mengambil risiko dalam hidup.",
        "ESFP": "Kamu ceria, spontan, dan suka menikmati momen saat ini dengan orang-orang di sekitar."
    };

    let explanation = explanations[mbtiType] || "Kamu unik dan memiliki kombinasi sifat yang luar biasa!";
    let imageSrc = `${mbtiType}.jpeg`; 

    document.getElementById("quiz-container").innerHTML = `
        <h2>Hasil Tes MBTI Anda</h2>
        <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
            <div>
            <img src="${imageSrc}" alt="MBTI Type ${mbtiType}" style="width: 300px; height: auto; border-radius: 10px;">
                <div class="mbti-type">${mbtiType}</div>
                <div class="explanation-box">
                    <h2>${mbtiType}</h2>
                    <p>${explanation}</p>
                </div>
                <div class="button-container">
                    <button class="retry-button" onclick="retryQuiz()">Coba Lagi</button>
                    <button class="goto-button" onclick="goToSection('scroll-1')">Apa itu MBTI?</button>
                </div>
            </div>
        </div>
    `;
}

function goToSection(targetSection) {
    sessionStorage.setItem("fromMBTI", "true");
    sessionStorage.setItem("scrollTarget", targetSection);
    window.location.href = "./index.html";
}

function retryQuiz() {
    currentQuestion = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    document.getElementById("quiz-container").innerHTML = `
        <h2 style="color: #6a5acd; font-weight: bold;">Tes MBTI</h2>
        <div id="quiz">
            <p class="question-number" id="question-number"></p> 
            <p class="question" id="question-text">Pertanyaan akan muncul di sini</p>
            <div class="options" id="options-container"></div>
            <button class="submit-button" id="submit-button" onclick="submitAnswer()" style="display: none;">Submit</button>
        </div>
    `;

    loadQuestion();
}

loadQuestion();