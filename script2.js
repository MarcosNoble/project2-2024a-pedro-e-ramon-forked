
// Define o endpoint da API
const url = "https://opentdb.com/api_category.php";


// Seleciona o elemento UL onde os dados serão exibidos
const tagsLista = document.getElementById('tags-lista');

// Faz a solicitação GET para o endpoint da API usando fetch
fetch(`${url}`)
.then(response => {
  // Verifica se a resposta foi bem-sucedida (código de status 200)
  if (!response.ok) {
    throw new Error('Erro ao fazer a solicitação: ' + response.status);
  }
  // Converte a resposta para JSON
  return response.json();
})
.then(data => {
  // Para cada categoria, cria um item de lista e adiciona ao elemento UL
  data.trivia_categories.forEach(categoria => {
    const listItem = document.createElement('li');
    listItem.textContent = categoria.name;
    tagsLista.appendChild(listItem);
  });
})
.catch(error => {
  // Manipula erros
  console.error('Houve um erro:', error);
});