const questions = [
    "Apakah kamu sering mempunyai perasaan sedih dan gampang tersinggung yang berkepanjangan?",
    "Apakah kamu sering kehilangan minat untuk melakukan aktivitas sehari-hari?",
    "Apakah kamu sering merasa tidak tertarik untuk bergaul atau ngobrol dengan orang lain?",
    "Apakah kamu sering merasa sulit fokus dan susah untuk mengambil keputusan?",
    "Apakah kamu sering mempunyai rasa bersalah yang muncul setiap hari?",
    "Apakah kamu pernah merasa bahwa dirimu tidak berharga?",
    "Apakah kamu sering mengalami depresi yang membuat kamu sering merasa lelah dan tidak punya energi sepanjang hari?",
    "Apakah kamu sering mengalami depresi yang membuat kamu berpikir untuk menyakiti diri sendiri atau bahkan bunuh diri?",
    "Apakah kamu sering mengalami insomnia atau tidur berlebihan?",
    "Apakah kamu sering merasa naik atau turunnya berat badan secara drastis?"
];

let currentQuestion = 0;
let totalScore = 0;
let selectedScore = null;
let tidakTahuCount = 0;

function loadQuestion() {
    document.getElementById("question-text").innerText = `${currentQuestion + 1}. ${questions[currentQuestion]}`;
    document.getElementById("question-number").innerText = `Soal ${currentQuestion + 1}/${questions.length}`;

    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    selectedScore = null;
    document.getElementById("submit-button").style.display = "none";

    ["Ya", "Tidak"].forEach((text, index) => {
        let score = index === 0 ? 1 : 0;
        let button = document.createElement("button");
        button.innerText = text;
        button.onclick = () => selectAnswer(score, button);
        optionsContainer.appendChild(button);
    });
}

function createStars() {
    const container = document.getElementById("quiz-container");
    
    for (let i = 0; i < 10; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        let containerRect = container.getBoundingClientRect();
        let x = Math.random() * containerRect.width;
        let y = Math.random() * containerRect.height;

        star.style.top = `${y}px`;
        star.style.left = `${x}px`;

        container.appendChild(star);

        setTimeout(() => star.remove(), 1000);
    }
}

function selectAnswer(score, button) {
    let buttons = document.querySelectorAll(".options button");
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedScore = score;

    if (score === 0) {
        tidakTahuCount++;
    }

    document.getElementById("submit-button").style.display = "block";
}

function submitAnswer() {
    if (selectedScore !== null) {
        totalScore += selectedScore;
        currentQuestion++;

        if (tidakTahuCount === questions.length) {
            showResult('Hasil tidak terdefinisi karena Anda memilih "Tidak Tahu" untuk semua pertanyaan.');
            return;
        }
        
        createStars();
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
}

function showResult() {
    let percentage = Math.max(0, (totalScore / questions.length) * 100);
    let resultText = "";
    let imageUrl = "";
    let explanationTitle = "";
    let explanationText = "";
    let showHandlingButton = false;

    if (percentage <= 30) {
        resultText = "Anda memiliki sedikit atau tidak ada gejala depresi.";
        imageUrl = "happy.jpeg";
        explanationTitle = "Sehat Mental!";
        explanationText = "Anda berada dalam kondisi mental yang baik. Tetap jaga kesehatan mental dengan pola hidup sehat dan hubungan sosial yang positif.";
    } else if (percentage <= 50) {
        resultText = "Anda menunjukkan beberapa gejala depresi.";
        imageUrl = "thinking.jpeg";
        explanationTitle = "Waspadai Gejala!";
        explanationText = "Beberapa gejala depresi mulai terlihat. Cobalah menjaga pola tidur, berolahraga, dan berbicara dengan seseorang yang dipercaya.";
    } else if (percentage <= 75) {
        resultText = "Gejala depresi Anda cukup signifikan.";
        imageUrl = "anxious.jpeg";
        explanationTitle = "Depresi Sedang!";
        explanationText = "Gejala depresi yang Anda alami cukup signifikan. Disarankan untuk mencari dukungan dari orang terpercaya atau profesional.";
        showHandlingButton = true;
    } else {
        resultText = "Gejala depresi Anda sangat signifikan.";
        imageUrl = "sad.jpeg";
        explanationTitle = "Cara Menangani Depresi Tingkat Tinggi";
        explanationText = "Gejala depresi Anda berada pada tingkat yang mengkhawatirkan. Disarankan untuk mencari bantuan profesional.";
        showHandlingButton = true;
    }

    const quizContainer = document.getElementById("quiz-container");
    if (quizContainer) {
        quizContainer.innerHTML = `
            <h2>Hasil Tes Depresi</h2>
            <div style="font-size: 2rem; font-weight: bold; color: #6a5acd;">${percentage.toFixed(2)}%</div>
            <img src="${imageUrl}" alt="Hasil Tes" class="result-image">
            <div class="explanation-box in-view">
                <h2>${explanationTitle}</h2>
                <p>${explanationText}</p>
            </div>
            <div class="button-container">
                ${showHandlingButton ? '<button class="handle-button" onclick="scrollToHandling()">Cara Menangani</button>' : ''}
                <button class="retry-button" onclick="retryQuiz()">Coba Lagi</button>
            </div>
        `;
    } else {
        console.error("Element with id 'quiz-container' not found.");
    }
}

function scrollToHandling() {
    let targetSection = totalScore / questions.length > 0.75 ? "scroll-2" : "scroll-1";

    sessionStorage.setItem("fromQuiz", "true");
    sessionStorage.setItem("scrollTarget", targetSection);
    window.location.href = "./index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const explanationText = document.getElementById('explanation-text');
    const explanationContainer = document.getElementById('scroll');

    explanationText.querySelectorAll('h2, p').forEach((paragraph, index) => {
        paragraph.style.transitionDelay = `${1 + index * 0.3}s`;
    });

    explanationContainer.classList.add('in-view');
    explanationText.querySelectorAll('h2, p').forEach((paragraph, index) => {
        setTimeout(() => paragraph.classList.add('in-view'), (1 + index * 300));
    });
});

function retryQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    tidakTahuCount = 0;

    document.getElementById("quiz-container").innerHTML = `
        <h2 style="color: #6a5acd; font-weight: bold;">Tes Depresi</h2>
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

document.addEventListener('DOMContentLoaded', () => {
    const depressionText = document.getElementById('depression-explanation');

    const checkIfInView = () => {
        const rect = depressionText.getBoundingClientRect();
        const buffer = 100;

        const isVisible = rect.top < window.innerHeight - buffer && rect.bottom > buffer;

        if (isVisible) {
            depressionText.classList.add('in-view');
        } else {
            depressionText.classList.remove('in-view');
        }
    };

    window.addEventListener('scroll', checkIfInView);
    checkIfInView();
});