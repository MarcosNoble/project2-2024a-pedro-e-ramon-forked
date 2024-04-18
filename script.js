function toggleDropdown() {
    var dropdown = document.getElementById("checkbox-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }
  
  
// Define o endpoint da API
const url = "https://quizapi.io/api/v1/categories";
// Define o parâmetro da chave da API
const apiKey = "iXaI9iMzp8MnpIwVW1tUpnaEuw0iRDhhvWXBToVU";

// Seleciona o elemento UL onde os dados serão exibidos
const categoriasLista = document.getElementById('categorias-lista');

// Faz a solicitação GET para o endpoint da API usando fetch
fetch(`${url}?apiKey=${apiKey}`)
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
    data.forEach(categoria => {
      const listItem = document.createElement('li');
      listItem.textContent = categoria.name;
      categoriasLista.appendChild(listItem);
    });
  })
  .catch(error => {
    // Manipula erros
    console.error('Houve um erro:', error);
  });
