var resultados = JSON.parse(localStorage.getItem('resultados'));
console.log(resultados);
function showResults() {

    const totais = document.querySelector('#resultados-totais');

    let acertos = somarValoresPorChave( resultados, 'acertos');
    let erros = somarValoresPorChave(resultados, 'erros');

    console.log(acertos, erros);

    let total = acertos + erros;
    
    const tudo = document.createElement('h2');
    tudo.textContent = `Sua pontuação final: ${acertos}/${total} acertos`;
    
    totais.appendChild(tudo);

    const resultadosLista = document.querySelector('#resultados');
    for (const categoria in resultados) {
        const li = document.createElement('li');
        const nomeCategoria = document.createElement('span'); // Criar um elemento span para o nome da categoria
        nomeCategoria.textContent = `${capitalize(categoria)}: `; // Definir o texto da categoria
        li.appendChild(nomeCategoria); // Adicionar o nome da categoria ao li

        const num = document.createElement('span'); // Criar um elemento span para a contagem de acertos
        num.textContent = `${resultados[categoria].acertos}/${resultados[categoria].erros + resultados[categoria].acertos}`;
        if (resultados[categoria].acertos >= 0.5 * (resultados[categoria].erros + resultados[categoria].acertos)) {
            num.style.color = 'green';
        } else {
            num.style.color = 'red';
        }
        li.appendChild(num); // Adicionar a contagem de acertos ao li

        resultadosLista.appendChild(li);
    }

      
}

function capitalize(str) {
    // Check if the string is empty
    if (str.length === 0) return str;

    // Capitalize the first letter and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Função para somar os valores de uma chave dentro do dicionário
function somarValores(chave, dicionario) {
  let soma = 0;
  for (let key in dicionario) {
      if (key === chave) {
          soma += dicionario[key];
      }
  }
  return soma;
}

function somarValoresPorChave(json, chave) {
  // Parse do JSON para obter um objeto JavaScript
  const objeto = (json);
  
  // Use Object.values() e reduce() para somar os valores da chave especificada
  return Object.values(objeto).reduce((soma, valor) => {
      if (valor[chave] !== undefined) {
          return soma + valor[chave];
      } else {
          return soma;
      }
  }, 0);
}

window.addEventListener('load', function() {
    showResults();
});