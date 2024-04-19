// Seleciona o elemento input pelo seu ID
const inputElement = document.getElementById('limit');

inputElement.addEventListener('input', function() {
    // Obtém o valor do elemento input
    const inputValue = inputElement.value;
    console.log(inputValue);
});

const difficulty = document.getElementById('difficulty');

addEventListener('change', function() {
    // Obtém o valor do elemento select
    const selectValue = difficulty.value;
});