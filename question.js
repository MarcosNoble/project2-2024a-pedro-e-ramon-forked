var urlsIdx = 0;
// Recuperar o vetor da memória local e converter de volta para um vetor JavaScript
const vetorSalvo = JSON.parse(localStorage.getItem('urls-fetch'));

console.log(vetorSalvo);

// import the urls variable from submit.js

async function getQuestions() {
    var questions = [];
    const url = vetorSalvo[urlsIdx];
    urlsIdx++;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.results.forEach(result => {
            const question = {
                type: result.type,
                difficulty: result.difficulty,
                category: result.category,
                questionText: decodeHTMLEntities(result.question),
                options: [result.correct_answer, ...result.incorrect_answers],
                correctAnswer: result.correct_answer
            };
            question.options = shuffleArray(question.options);
            questions.push(question);
        });
        return questions;
    } catch (error) {
        console.error('Fetch error:', error);
        return questions; // Return empty array in case of error
    }
}


// Função para embaralhar um array (no caso, as opções de resposta)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

var currentQuestionIndex = 0; // Índice da pergunta atual sendo exibida
var questions;

// Função para renderizar uma página com uma única pergunta e suas alternativas
async function renderQuestionPage() {

    if (currentQuestionIndex == 0) {
        console.log('Fetching questions...');
        questions = await getQuestions();
    }

    console.log(questions);

    // Obtenha a pergunta atual com base no índice atual
    const currentQuestion = questions[currentQuestionIndex];

    // Crie uma div para conter a pergunta e suas alternativas
    const questionContainer = document.createElement('div');

    // Adicione a pergunta como um elemento de texto à div da pergunta
    const questionText = document.createElement('p');
    questionText.textContent = currentQuestion.questionText;

    const textContainer = document.createElement('div');
    textContainer.appendChild(questionText);
    textContainer.classList.add('text-container');

    questionContainer.appendChild(textContainer);

    const buttonsContainer = document.createElement('div');
    const buttonRowContainer = document.createElement('div');
    const buttonRow2Container = document.createElement('div');
    var buttonsPerRow;

    if (currentQuestion.type === "multiple") {
        buttonsPerRow = 2;
    } else {
        buttonsPerRow = 1;
    }

    let buttonsInRow = 0;

    // Adicione as alternativas como botões à div da pergunta
    currentQuestion.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => {
            // Lógica para verificar se a opção selecionada é a correta ou não
            if (option === currentQuestion.correctAnswer) {
                // Resposta correta
                alert('Resposta correta!');
            } else {
                // Resposta incorreta
                alert('Resposta incorreta!');
            }

            // Avance para a próxima pergunta
            currentQuestionIndex++;
            // Verifique se ainda há perguntas a serem exibidas
            if (currentQuestionIndex < questions.length) {
                // Renderize a próxima pergunta
                renderQuestionPage();
            } else {
                currentQuestionIndex = 0;
                if (urlsIdx < vetorSalvo.length)
                    renderQuestionPage();
                else {
                    console.log('Fim das perguntas!');
                    // printe dos resultados
                }
            }
        });

        if (buttonsInRow < buttonsPerRow - 1) {
            buttonRowContainer.appendChild(optionButton);
            buttonsInRow++;
        } else {
            buttonRow2Container.appendChild(optionButton);
            buttonsInRow = 0;
        }
    });

    buttonsContainer.appendChild(buttonRowContainer);
    buttonsContainer.appendChild(buttonRow2Container);
    questionContainer.appendChild(buttonsContainer);

    buttonsContainer.classList.add('buttons-container');
    buttonRowContainer.classList.add('button-row-container');
    buttonRow2Container.classList.add('button-row-container');

    // Adicione a div da pergunta à página

    // Limpa o conteúdo anterior da página
    const elementsToRemove = document.querySelectorAll('body > :not(header)');
    elementsToRemove.forEach(element => {
        element.remove();
    });

    document.body.appendChild(questionContainer);
}

window.addEventListener('load', function() {
    renderQuestionPage();
});

function decodeHTMLEntities(text) {
    var tempElement = document.createElement("div");
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText;
}