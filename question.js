var urlsIdx = 0;
// Recuperar o vetor da memória local e converter de volta para um vetor JavaScript
const vetorSalvo = JSON.parse(localStorage.getItem('urls-fetch'));


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
                category: decodeHTMLEntities(result.category),
                questionText: decodeHTMLEntities(result.question),
                options: [result.correct_answer, ...result.incorrect_answers].map(decodeHTMLEntities),
                correctAnswer: decodeHTMLEntities(result.correct_answer)
            };

            let categoryName = question.category;
            if (categoryName.startsWith("Entertainment:") || categoryName.startsWith("Science:"))
            {
                question.category = categoryName.substring(categoryName.indexOf(":") + 1).trim();
            }

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
// Objeto para armazenar os resultados por categoria
var resultadosPorCategoria = {};

// Função para registrar um acerto em uma categoria específica
function correct(category) {
    if (!resultadosPorCategoria[category]) {
        resultadosPorCategoria[category] = { acertos: 1, erros: 0 };
    } 
    else {
        resultadosPorCategoria[category].acertos++;
    }

    paintButtons();
}

// Função para registrar um erro em uma categoria específica
function incorrect(category) {
    if (!resultadosPorCategoria[category]) {
        resultadosPorCategoria[category] = { acertos: 0, erros: 1 };
    } 
    else {
        resultadosPorCategoria[category].erros++;
    }

    paintButtons();
}

function paintButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = 'red';
        button.style.borderWidth = '2px'; // Set border width
        button.style.borderStyle = 'solid'; // Set border style
        
        if (button.textContent === questions[currentQuestionIndex].correctAnswer) {
            button.style.backgroundColor = 'blue';
            button.style.borderColor = 'green'; // Set border color for correct answer
            button.style.borderRadius = '50%'; // Round border for correct answer
        } else {
            button.style.borderColor = 'red'; // Set border color for incorrect answer
        }
    });
}



var questions = [];
// Função para renderizar uma página com uma única pergunta e suas alternativas
async function renderQuestionPage() {

    if (currentQuestionIndex == 0) {
        console.log('Fetching questions...');
        questions = await getQuestions();
    }

    const category = document.getElementById('category');

    category.textContent = questions[currentQuestionIndex].category;

    const idx = document.getElementById('idx');

    idx.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

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
                correct(questions[currentQuestionIndex].category);
            } 
            else {
                // Resposta incorreta
                incorrect(questions[currentQuestionIndex].category);
            }

            setTimeout(() => {
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
                        console.log(resultadosPorCategoria);
                        localStorage.setItem('resultados', JSON.stringify(resultadosPorCategoria));
                        window.location.href = 'results.html';
                    }
                }
            }, 1000);
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