# Projeto: Consumindo uma API pública

![Substitua a imagem ao lado por um screenshot do seu projeto](screenshot.gif "Screenshot do projeto")


Acesso: https://elc1090.github.io/project2-2024a-pedro-e-ramon/


### Desenvolvedores
Pedro Henrique da Silva Hinerasky 
&
Ramon Godoy Izidoro - Ciência da Computação

### Nosso produto

Utilizando da API Open Trivia Database, criamos um site que, após receber diversos filtros do usuário, lhe apresenta um quiz a ser respondido, mostrando os resultados posteriormente


#### API escolhida

A API escolhida foi a Open Trivia Database, uma API que contém questões de Múltipla Escolha ou Verdadeiro ou Falso sobre 24 temas diferentes, divididas em 3 dificuldades. https://opentdb.com/api_config.php

### Desenvolvimento

Iniciamos o trabalho pelos filtros, a fim de construir a url para dar o fetch para a API. Nossa principal ideia era a de poder escolher questões de diversas categorias diferentes para criar um quiz totalmente customizado, entretanto, a API escolhida apenas permite uma categoria de perguntas por requisição, ou todas as categorias quando o filtro de categoria é deixado vazio. Pensamos em opções para resolver isso, e nosso pensamento imediato foi de apenas fazer vários fetchs. Porém, foi observado outro problema com a API: ela apenas aceita uma requisição a cada 5 segundos por usuário. Por fim, nossa solução foi limitar o número de categorias por filtro em 3, e então criar um array de URLs a serem requisitadas pela API, assim, quando o primeiro batch de questões acabar, o site da um novo fetch, não sobrecarregando a API.
Após terminar a etapa de filtro do projeto, iniciamos a etapa de criação do quiz, em que pegamos os dados recebidos pela API e implementamos em um modelo de pergunta com botões de alternativa. Nosso principal problema nesta etapa foi a de passar o array de URLs da um arquivo JS para outro. Tentamos de diversos modos com import/export, sempre falhando, até usarmos local storage, que funcionou perfeitamente. Depois disso, o progresso seguiu tranquilamente, com o trabalho se encerrando com a estilização da página e a criação de uma tela de resultados.

#### Tecnologias

- HTML básico
- CSS básico
- JavaScript
- Alguns componentes de Boostrap
- Fonte Personalizada do GoogleApis

#### Ambiente de desenvolvimento

- VsCode
- Extensões de HTML, CSS e JavaScript
- Extensão LiveShare

#### Referências e créditos

Utilizamos diversos materiais de consulta dentre eles se destacam:

- https://www.w3schools.com/css/css_border.asp
- https://getbootstrap.com/docs/5.3/components/spinners/
- https://youtu.be/-cX5jnQgqSM?si=2WWRixkI0Ba-LFUM
- https://www.w3schools.com/css/css_units.asp

Além claro de vários prompts usados para o ChatGPT, onde buscamos encontrar bugs e resolvê-los ou simplesmente aprender como é a sintaxe em javascript de algo já conhecido:

- como utilizar map em javascript
- como somar todas os valores de uma chave dentro de um dicionario
- pode me explicar como é medido 1em?
- como utilizar corretamente as funcoes asyn e await?
- tenho um arquivo .js que exporta uma funcao, como acessar ela no html?

---
Projeto entregue para a disciplina de [Desenvolvimento de Software para a Web](http://github.com/andreainfufsm/elc1090-2024a) em 2024a
