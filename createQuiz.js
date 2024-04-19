function submitFilters() {
    const url = "https://opentdb.com/api.php?";

    const inputElement = document.getElementById('limit');
    const questionNumber = inputElement.value;

    const categoryCheckboxes = document.querySelectorAll('#category input[type="checkbox"]');
    const selectedCategories = [];

    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    const difficultyRadios = document.querySelectorAll('#difficulty input[type="radio"]');
    var selectedDifficulty = null;

    difficultyRadios.forEach(radio => {
        if (radio.checked) {
            selectedDifficulty = radio.value;
        }
    });

    const typeCheckboxes = document.querySelectorAll('#question-type input[type="checkbox"]');
    const selectedTypes = [];

    typeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTypes.push(checkbox.value);
        }
    });

    if (questionNumber < 3)
        questionNumber = 3;

    if (questionNumber > 20)
        questionNumber = 20;

    console.log("Question number: " + questionNumber);
    console.log("Selected categories: " + selectedCategories);
    console.log("Selected difficulty: " + selectedDifficulty);
    console.log("Selected types: " + selectedTypes);

    var questionsPerCategory;
    var leftoverQuestions;
    if (selectedCategories.length > 0) {
        questionsPerCategory = Math.floor(questionNumber / selectedCategories.length);
        leftoverQuestions = questionNumber % selectedCategories.length;
    }

    console.log("Questions per category: " + questionsPerCategory);
    console.log("Leftover questions: " + leftoverQuestions);

    var difficulty = '';
    if (selectedDifficulty != null) {
        difficulty = `&difficulty=${selectedDifficulty}`;
    }

    var type = '';
    if (selectedTypes.length == 1) {
        type = `&type=${selectedTypes[0]}`;
    }

    if (selectedCategories.length == 0) {
        fetch(`${url}amount=${questionNumber}${difficulty}${type}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer a solicitação: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Houve um erro:', error);
            });
    } else {
        selectedCategories.forEach(category => {
            console.log('caralho');
            if (category == selectedCategories[selectedCategories.length - 1]) {
                questionsPerCategory += leftoverQuestions;
            }
            fetch(`${url}amount=${questionsPerCategory}${difficulty}${type}&category=${category}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao fazer a solicitação: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Houve um erro:', error);
                });
        });
    }


}