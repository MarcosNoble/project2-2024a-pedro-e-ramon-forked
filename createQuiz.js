function submitFilters()
{
    const url = "https://quizapi.io/api/v1/";

    const apiKey = "iXaI9iMzp8MnpIwVW1tUpnaEuw0iRDhhvWXBToVU";

    const categoryCheckboxes = document.querySelectorAll('#category input[type="checkbox"]');
    const selectedCategories = [];

    categoryCheckboxes.forEach(checkbox => {
        if(checkbox.checked){
            selectedCategories.push(checkbox.value);
        }
    });
    console.log(selectedCategories);
    
    const selectElement = document.getElementById("difficulty-select");
    const selectedDifficulty = selectElement.value;
    console.log("Selected difficulty:", selectedDifficulty);


    const inputElement = document.getElementById('limit');
    const questionNumber = inputElement.value;

    
}