export const urls = [];

function submitFilters() {
    const url = "https://opentdb.com/api.php?";

    /* Get the number of questions */
    const inputElement = document.getElementById('limit');
    const questionNumber = inputElement.value;

    /* Get the selected categories */
    const categoryCheckboxes = document.querySelectorAll('#category input[type="checkbox"]');
    const selectedCategories = [];

    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
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
    if(questionNumber == null)
        return;

    if (questionNumber < 3)
        questionNumber = 3;

    if (questionNumber > 30)
        questionNumber = 30;


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
    } else { /* if categories are selected, the URLs will each have their divided amount, difficulty, type and category parameters */
        selectedCategories.forEach(category => {
            if (category == selectedCategories[selectedCategories.length - 1]) {
                questionsPerCategory += leftoverQuestions;
            }
            urls.push(`${url}amount=${questionsPerCategory}${difficulty}${type}&category=${category}`);
        });
    }

    //window.location.href = "quiz.html";
    console.log(urls);


}

var button = document.getElementById("botao-submit");
button.addEventListener("click", submitFilters);






