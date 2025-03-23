// variaveis iniciais

let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let palavraLista = [];
let potuacao = 0;
let opcaoJogo;
let coluna = 0;
let linha = 0;
let tentativas = 5;


//banco de dados de palavras
let plsecreta = [
  // Palavras de 4 letras
  ["amor", "bala", "casa", "dado", "fogo", "galo", "hoje", "jogo", "lata", "mesa",
  "nojo", "ovo", "pato", "rato", "sapo", "teto", "urso", "vela", "zelo", "bico",
  "cego", "doce", "foca", "gema", "lobo", "nulo", "onda", "puxa", "roda", "sede"],

  // Palavras de 5 letras
  ["abriu", "barco", "canto", "doido", "exato", "fosse", "gosto", "junto", "lapis", "mente",
  "noite", "olhos", "ponto", "quase", "rosto", "sopro", "tente", "verde", "zebra", "prato",
  "radio", "sabor", "tchau", "vigor", "cinco", "grito", "lugar", "nuvem", "pomar", "vento"],

  // Palavras de 6 letras
  ["amavel", "caneta", "dancar", "esfera", "famoso", "garota", "habito", "inicio", "juntar", "magico",
  "noites", "orgulo", "pratos", "quente", "rapido", "tesouro", "ultimo", "viagem", "xadrez", "botina",
  "chaves", "escuro", "folhas", "gravata", "herois", "imagem", "jornal", "livros", "mestres", "oceano"]
];


// pegar a pontuação no local storage
window.onload = function (){
  ptsalvo = localStorage.getItem('pontos');
  if(ptsalvo){
      potuacao =  parseInt(ptsalvo);;
  }
  else{
    localStorage.setItem('pontos', potuacao);
}
  document.querySelectorAll(".pontuacao").forEach(score => {
    score.innerHTML = potuacao;
    
  });
}

// atualizar pontos
function atualizarPontos(){
  potuacao += 10;
  localStorage.setItem('pontos', potuacao);
}
// gerar os butões parte de baixo

function addButtaoLetras(){
  
  let divLetra = document.querySelector(".opcoes")
  for(let i =0; i<letras.length;i++){
    let letra = document.createElement("button");
    letra.addEventListener("click",() =>{
        tentativa(i);
    });
    letra.innerHTML = `${ letras[i]}`;
    letra.classList.add("letras");
    divLetra.appendChild(letra)
  }
// butao voltar
  let voltar = document.createElement("button");
  voltar.innerHTML = "voltar"
  voltar.addEventListener("click",() =>{
    voltarInicio();
  })
  voltar.classList.add("voltar");
  divLetra.appendChild(voltar)
  // butao sair
  let sair = document.createElement("button");
  sair.innerHTML = "enviar"
  sair.addEventListener("click",() =>{
    adivinhar();
  })
  sair.classList.add("enviar");
  divLetra.appendChild(sair)
}

// gerar os butões parte de cima

function addButtaoTentativas(){
  
  let divTentativas = document.querySelector(".tentativa")
  for(let i =0; i<5;i++){
    let buttao = "";
    for(let j =0; j<4+coluna;j++){
    buttao += `<button onclick = "retirar(${j})" class="tentativasLetra" ></button>`;
    }
    let tentativa = document.createElement("div");
    tentativa.innerHTML =`${buttao}`;
    tentativa.classList.add("tentativaLinha");
    divTentativas.appendChild(tentativa)
  }
}

function resetJogo(){
  tentativas = 5;
  document.querySelector(".resultado").style.display = "none";
  document.querySelector(".conteudo").style.display = "grid";
  document.querySelector(".tentativa").innerHTML = ""
  document.querySelector(".opcoes").innerHTML = ""
  
}

function jogaNovamente(){
  resetJogo();
  jogar(opcaoJogo);
}


function criarLista(){
  palavraLista = []
  for(let i=0;i<4+opcaoJogo;i++){
    palavraLista.unshift("-1");
  }
  console.log(palavraLista)
  
}


function jogar(num){
  opcaoJogo = num;
  coluna = num;
  if(num == 0){
    linha = Math.floor(Math.random() * plsecreta[0].length)
  }
  else if(num == 1){ 
    linha = Math.floor(Math.random() * plsecreta[1].length) 
  }
  else{
    linha = Math.floor(Math.random() * plsecreta[2].length)
  }
  console.log(palavraLista)
  document.querySelector(".conteudo").style.display = "grid"
  document.querySelector(".menu").style.display = "none"
  console.log(plsecreta[coluna][linha])
  criarLista()
  addButtaoTentativas();
  addButtaoLetras();
}


function vrfDeLinha(){
  let linha = document.querySelectorAll(".tentativaLinha");
  let linhaTentativa = -1;
  let i = 0;
  do{
      if(!linha[i].classList.contains("trancado")){
        linhaTentativa = i;
      }
      i++
  }while(linhaTentativa == -1 && i<linha.length);
  return linha[linhaTentativa];
}

function voltarInicio(){
  document.querySelector(".menu").style.display = "grid";
  document.querySelector(".resultado").style.display = "none";
  resetJogo();
  document.querySelector(".conteudo").style.display = "none";
}

function mudarTela(valor){
  document.querySelector(".conteudo").style.display = "none";
  document.querySelector(".resultado").style.display = "grid";
  resultado =  document.querySelector(".descricaoFinal");
  if(valor == true){
   resultado.innerHTML = `você ganhou +10 </br> a palavra era: ${plsecreta[coluna][linha]}`
  }
  else{
    resultado.innerHTML = `você perdeu </br> a palavra era: ${plsecreta[coluna][linha]}`

  }
}

function tentativa(num){
  if(tentativas>0){let linha = vrfDeLinha();
  let buttoes = linha.querySelectorAll(".tentativasLetra");
  for(let i = 0; i<buttoes.length;++i){
      if(buttoes[i].innerHTML === ""){
          buttoes[i].innerHTML = letras[num];
          buttoes[i].style.cursor = "pointer";
          palavraLista[i] = letras[num];
          return
      }
  }}
}

function retirar(num){
  let linha = vrfDeLinha();
  let buttaos = linha.querySelectorAll(".tentativasLetra")
  buttao = buttaos[num];
  palavraLista[num] = "-1"

  buttao.innerHTML = "";
  buttao.style.cursor = "default";
}

function acertouUmLetra(){
  let letrasCorr = plsecreta[coluna][linha].split('');
  console.log(letrasCorr)
  for(let i=0;i<palavraLista.length;i++){
    if(palavraLista[i].toUpperCase() === letrasCorr[i].toUpperCase()){
      let linha = vrfDeLinha()
      let botoes = linha.querySelectorAll(".tentativasLetra");
      let botao = botoes[i];
      botao.style.backgroundColor = "rgb(39, 182, 29)";
      botao.style.color = "rgb(0, 0, 0)";
      let botoesop = document.querySelectorAll(".letras");
      console.log(botoesop)
      let j = 0;
      botoesop.forEach(letras =>{
        if((letras.innerHTML).toUpperCase() === (palavraLista[i]).toUpperCase()){
          letras.style.backgroundColor = "rgb(39, 182, 29)";
          letras.style.color = "rgb(0, 0, 0)";
        }
        j++;
      })
    }
  }
  
}

function acertouUmLetraPsErrada(){
  let letrastent = palavraLista // lista tentiva
  let letrasCorr = plsecreta[coluna][linha].split(''); // palavra certa
  console.log(letrasCorr)
  for(let i =0;i<palavraLista.length;i++){
    if(letrastent[i].toUpperCase() === letrasCorr[i].toUpperCase()){
      letrastent[i] = "-1"
      letrasCorr[i] = "-1"
    }
    else{
      letrastent[i] = letrastent[i].toUpperCase()
      letrasCorr[i] = letrasCorr[i].toUpperCase()
    }
  }

  for(let i =0;i<palavraLista.length;i++){
    if(letrasCorr.includes(letrastent[i]) && letrastent[i]!="-1"){
      let linha = vrfDeLinha()
      let botoes = linha.querySelectorAll(".tentativasLetra");
      let botao = botoes[i];
      botao.style.backgroundColor = "rgb(246, 255, 0)";
      botao.style.color = "rgb(0, 0, 0)";
      let botoesop = document.querySelectorAll(".letras");
      console.log(botoesop)
      let j = 0;
      botoesop.forEach(letras =>{
        if((letras.innerHTML).toUpperCase() === (letrastent[i]).toUpperCase() && letras.style.backgroundColor !=="rgb(39, 182, 29)"){
          letras.style.backgroundColor = "rgb(246, 255, 0)";
          letras.style.color = "rgb(0, 0, 0)";

        }
        j++;
      })
      letrasCorr[i] == '-1'
    }
    else{
      let botoesop = document.querySelectorAll(".letras");
      console.log(botoesop)
      let j = 0;
      botoesop.forEach(letras =>{
        if((letras.innerHTML).toUpperCase() === (letrastent[i]).toUpperCase() && letras.style.backgroundColor !=="rgb(39, 182, 29)"){
          letras.style.backgroundColor = "rgb(255, 0, 0)";
          letras.style.color = "rgb(0, 0, 0)";

        }
        j++;
      })

    }
  }
}  



function errou(){
  acertouUmLetra();
  acertouUmLetraPsErrada();
  let linha = vrfDeLinha();
  linha.classList.add("trancado");
  criarLista();
  tentativas-=1;
  if(tentativas == 0){
    mudarTela(false);
  }
}

function acertou(){
  let linha = vrfDeLinha();
  console.log(linha)

  butoes = linha.querySelectorAll(".tentativasLetra").forEach(botao =>{
    botao.style.backgroundColor = "rgb(39, 182, 29)";
    botao.style.borderColor = "white";
  
  })
}

function adivinhar(){
  let enviar = document.querySelector(".enviar")
  if(!palavraLista.includes("-1")){
    enviar.style.backgroundColor = "rgb(63, 62, 62)";
    let tentativaPalavra = ""
    for(let i = 0;i<palavraLista.length;i++){
      tentativaPalavra += palavraLista[i];
    }
    if(tentativaPalavra.toUpperCase() === plsecreta[coluna][linha].toUpperCase()){
      acertou();
      atualizarPontos();
      mudarTela(true)
    }
    else{
      errou();
    }
  }
  else{
    enviar.style.backgroundColor = "rgb(255, 0, 0)";
    setTimeout(()=>{
      enviar.style.backgroundColor = "rgb(63, 62, 62)";
    },250)
  }
}








