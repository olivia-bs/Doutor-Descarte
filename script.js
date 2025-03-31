let score = 0;
let attemptCount = 0;
const scoreValue = document.getElementById('scoreValue');
const feedback = document.getElementById('feedback');

// Função para embaralhar os itens
function shuffleItems() {
    const itemsContainer = document.querySelector('.itens');
    const items = Array.from(itemsContainer.children);

    // Embaralhar os itens de forma aleatória
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]]; // Troca os itens
    }

    // Adiciona os itens embaralhados de volta no container
    itemsContainer.innerHTML = '';
    items.forEach(item => itemsContainer.appendChild(item));
}

// Função para aleatorizar as lixeiras
function shuffleLixeiras() {
    const container = document.querySelector('.container');
    const lixeiras = Array.from(container.children);

    // Embaralha as lixeiras de forma aleatória
    for (let i = lixeiras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lixeiras[i], lixeiras[j]] = [lixeiras[j], lixeiras[i]]; // Troca as lixeiras
    }

    // Adiciona as lixeiras embaralhadas de volta no container
    container.innerHTML = '';
    lixeiras.forEach(lixeira => container.appendChild(lixeira));
}

// Chama a função de aleatorização ao carregar a página
window.onload = function () {
    shuffleItems(); // Aleatoriza os itens
    shuffleLixeiras(); // Aleatoriza as lixeiras
};

// Permitir o drop do item na lixeira
function allowDrop(event) {
    event.preventDefault();
}

// Iniciar o arraste do item
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Colocar o item na lixeira
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedItem = document.getElementById(data);
    const targetLixeira = event.target;

    // Checar se o item foi arrastado corretamente
    let points = 0;
    let correct = false;

    if (targetLixeira.id === "infectante" && ["algodao", "luvas", "aventais"].includes(data)) {
        points = getPoints();
        correct = true;
    } else if (targetLixeira.id === "quimico" && ["medicamentos", "reagentes"].includes(data)) {
        points = getPoints();
        correct = true;
    } else if (targetLixeira.id === "radioativo" && ["residuos_nucleares", "lixo_radioativo"].includes(data)) {
        points = getPoints();
        correct = true;
    } else if (targetLixeira.id === "comum" && ["maca", "papel", "suco"].includes(data)) {
        points = getPoints();
        correct = true;
    } else if (targetLixeira.id === "perfurocortante" && ["agulha", "bisturi"].includes(data)) {
        points = getPoints();
        correct = true;
    }

    if (correct) {
        // Coloca o item na lixeira
        targetLixeira.appendChild(draggedItem);
        score += points;
        feedback.textContent = "Correto! + " + points + " Pontos.";
        feedback.style.color = "#05c613"; // Cor verde para acerto
        attemptCount = 0;
    } else {
        feedback.textContent = "Errado! Tente novamente.";
        feedback.style.color = "#c60505"; // Cor vermelha para erro
        attemptCount++;
    }

    scoreValue.textContent = score;
    feedback.style.display = "block";
}

// Calcular os pontos dependendo da tentativa
function getPoints() {
    if (attemptCount === 0) return 40;
    if (attemptCount === 1) return 20;
    if (attemptCount === 2) return 10;
    if (attemptCount === 3) return 5;
    return 1;
}
