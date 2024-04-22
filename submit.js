const urls = [];

function submitFilters() {
    const url = "https://opentdb.com/api.php?";

    /* Get the number of questions */
    const inputElement = document.getElementById('limit');
    var questionNumber = inputElement.value;

    /* Get the selected categories */
    const categoryCheckboxes = document.querySelectorAll('#category input[type="checkbox"]');
    const selectedCategories = [];
    const nameSelectedCategories = [];

    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
            
            // Verifica se checkbox.name começa com "Entertainment:" ou "Science:"
            if (checkbox.name.startsWith("Entertainment:") || checkbox.name.startsWith("Science:")) {
                // Pega o resto da string após "Entertainment:" ou "Science:"
                const restOfString = checkbox.name.substring(checkbox.name.indexOf(":") + 1).trim();
                nameSelectedCategories.push(restOfString);
            } 
            else {
                // Se não começar com "Entertainment:" ou "Science:", adiciona o nome como está
                nameSelectedCategories.push(checkbox.name);
            }
        }
    });
    

    /* Get the selected difficulty */
    const difficultyRadios = document.querySelectorAll('#difficulty input[type="radio"]');
    var selectedDifficulty = null;

    difficultyRadios.forEach(radio => {
        if (radio.checked) {
            selectedDifficulty = radio.value;
        }
    });

    /* Get the selected question types */
    const typeCheckboxes = document.querySelectorAll('#question-type input[type="checkbox"]');
    const selectedTypes = [];

    typeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTypes.push(checkbox.value);
        }
    });

    /* Validate the number of questions */
    if (questionNumber == null)
        return;

    if (questionNumber < 10)
        questionNumber = 10;

    if (questionNumber > 40)
        questionNumber = 40;


    /* Calculate the number of questions per category */
    var questionsPerCategory;
    var leftoverQuestions;
    if (selectedCategories.length > 0) {
        questionsPerCategory = Math.floor(questionNumber / selectedCategories.length);
        leftoverQuestions = questionNumber % selectedCategories.length;
    }

    /* Create the URLs */

    /* arranges the difficulty and type parameters */
    var difficulty = '';
    if (selectedDifficulty != null) {
        difficulty = `&difficulty=${selectedDifficulty}`;
    }

    /* if both or neither types are selected, the type parameter is not added, since it will pick both for both cases */
    var type = '';
    if (selectedTypes.length == 1) {
        type = `&type=${selectedTypes[0]}`;
    }

    /* if no categories are selected, the URL will have only the amount, difficulty and type parameters */

    if (selectedCategories.length == 0) {
        urls.push(`${url}amount=${questionNumber}${difficulty}${type}`);
    } 
    else { /* if categories are selected, the URLs will each have their divided amount, difficulty, type and category parameters */
        selectedCategories.forEach(category => {
            if (category == selectedCategories[selectedCategories.length - 1]) {
                questionsPerCategory += leftoverQuestions;
            }
            urls.push(`${url}amount=${questionsPerCategory}${difficulty}${type}&category=${category}`);
        });
    }
    // Converter o vetor em JSON e salvá-lo na memória local
    localStorage.setItem('urls-fetch', JSON.stringify(urls));
    localStorage.setItem('nameSelectedCategories', JSON.stringify(nameSelectedCategories));

    window.location.href = "quiz.html";

}