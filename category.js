function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Define o endpoint da API
const url = "https://opentdb.com/api_category.php";

// Seleciona o elemento UL onde os dados serão exibidos
const categoriasLista = document.getElementById('category');

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
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = categoria.id;
    label.textContent = capitalize(categoria.name);
    label.appendChild(input);
    categoriasLista.appendChild(label);
  });
})
.catch(error => {
  // Manipula erros
  console.error('Houve um erro:', error);
});


function capitalize(str) {
  // Check if the string is empty
  if (str.length === 0) return str;

  // Capitalize the first letter and concatenate it with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função para limitar o número máximo de checkboxes selecionadas
function limitarSelecoesMaximas() {
  const checkboxes = document.querySelectorAll('#dropdown3 input[type="checkbox"]');
  const maxCategorias = 5; // Defina o número máximo de seleções permitidas
  
  let selecoesAtuais = 0;
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          if (this.checked) {
              selecoesAtuais++;
              if (selecoesAtuais > maxCategorias) {
                  this.checked = false;
                  selecoesAtuais--;
              }
          } 
          else {
              selecoesAtuais--;
          }
      });
  });
}

// Chama a função para limitar o número máximo de seleções quando a página carrega
window.addEventListener('load', limitarSelecoesMaximas);

