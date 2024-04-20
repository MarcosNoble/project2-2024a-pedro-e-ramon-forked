// Suponha que `jsonData` seja a variável que armazena o JSON retornado de um fetch
const jsonData = {
    "response_code": 0,
    "results": [
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Geography",
            "question": "Colchester Overpass, otherwise known as &quot;Bunny Man Bridge&quot;, is located where?",
            "correct_answer": "Fairfax County, Virginia",
            "incorrect_answers": [
                "Medford, Oregon",
                "Braxton County, Virgina",
                "Lemon Grove, California"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Geography",
            "question": "How many time zones does China have?",
            "correct_answer": "1",
            "incorrect_answers": [
                "3",
                "4",
                "2"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Geography",
            "question": "What are the four corner states of the US?",
            "correct_answer": "Utah, Colorado, Arizona, New Mexico",
            "incorrect_answers": [
                "Oregon, Idaho, Nevada, Utah",
                "Kansas, Oklahoma, Arkansas, Louisiana",
                "South Dakota, Minnesota, Nebraska, Iowa"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "Geography",
            "question": "In 2012 the German-speaking microstate &quot;Liechtenstein&quot; in Central Europe had a population of how many inhabitants?",
            "correct_answer": "36,600",
            "incorrect_answers": [
                "2,400",
                "90,000",
                "323,400"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Geography",
            "question": "What is the capital of Scotland?",
            "correct_answer": "Edinburgh",
            "incorrect_answers": [
                "Glasgow",
                "Dundee",
                "London"
            ]
        }
    ]
};

// Array para armazenar objetos de questão
const questions = [];

// Percorra o array de questões
jsonData.results.forEach(result => {
  // Crie um objeto de questão para cada questão
  const question = {
      type: result.type,
      difficulty: result.difficulty,
      category: result.category,
      questionText: result.question,
      // Combine as opções de resposta corretas e incorretas em um array
      options: [result.correct_answer, ...result.incorrect_answers],
      correctAnswer: result.correct_answer
  };

  // Embaralhe as opções de resposta para que a resposta correta não seja sempre a primeira
  question.options = shuffleArray(question.options);

  // Adicione o objeto de questão ao array de questões
  questions.push(question);
});

// Função para embaralhar um array (no caso, as opções de resposta)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Agora você tem um array de objetos de questão pronto para ser usado no seu aplicativo
console.log(questions);


let currentQuestionIndex = 0; // Índice da pergunta atual sendo exibida

// Função para renderizar uma página com uma única pergunta e suas alternativas
function renderQuestionPage() {
  // Obtenha a pergunta atual com base no índice atual
  const currentQuestion = questions[currentQuestionIndex];

  // Crie uma div para conter a pergunta e suas alternativas
  const questionContainer = document.createElement('div');

  // Adicione a pergunta como um elemento de texto à div da pergunta
  const questionText = document.createElement('p');
  questionText.textContent = currentQuestion.questionText;
  questionContainer.appendChild(questionText);

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
              // Se não houver mais perguntas, exiba uma mensagem de conclusão
              alert('Você concluiu o quiz!');
          }
      });
      questionContainer.appendChild(optionButton);
  });

  // Adicione a div da pergunta à página
  document.body.innerHTML = ''; // Limpa o conteúdo anterior da página
  document.body.appendChild(questionContainer);
}

// Renderize a primeira pergunta ao carregar a página
renderQuestionPage();


