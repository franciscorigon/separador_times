// Função para criar a estrutura de cada jogador
function criarJogador(nome) {
  const div = document.createElement("div");
  div.classList.add("player-card");
  div.innerHTML = `
    <span>${nome}</span>
    <select>
      <option value="fixo">Fixo</option>
      <option value="meia">Meia</option>
      <option value="atacante">Atacante</option>
    </select>
    Velocidade: 
    <span class="velocidade" data-valor="1"></span>
    <span class="velocidade" data-valor="2"></span>
    <span class="velocidade" data-valor="3"></span>
    <span class="velocidade" data-valor="4"></span>
    <span class="velocidade" data-valor="5"></span>
  `;

  // Adicionar evento de clique para selecionar velocidade
  div.querySelectorAll(".velocidade").forEach(velocidade => {
    velocidade.addEventListener("click", function() {
      this.parentNode.querySelectorAll(".velocidade").forEach(v => v.classList.remove("selecionado"));
      this.classList.add("selecionado");
    });
  });

  return div;
}

// Função para adicionar um novo jogador
function adicionarJogador() {
  const nome = prompt("Nome do jogador:");
  if (nome) {
    document.getElementById("jogadores").appendChild(criarJogador(nome));
  }
}

// Adicionar evento de clique ao botão "Adicionar Jogador"
document.getElementById("adicionarJogador").addEventListener("click", adicionarJogador);

// Função para separar os times levando em conta a velocidade e as posições
function separarTimes() {
  // Coletar informações dos jogadores
  const jogadores = [];
  document.querySelectorAll("#jogadores .player-card").forEach(jogador => {
    const nome = jogador.querySelector("span").textContent;
    const posicao = jogador.querySelector("select").value;
    const velocidade = parseInt(jogador.querySelector(".selecionado").dataset.valor);
    jogadores.push({ nome, posicao, velocidade });
    
  });

  const goleiro1 = document.getElementById("goleiro1").value;
  const goleiro2 = document.getElementById("goleiro2").value;

  // Separar jogadores por posição e ordenar por velocidade (decrescente)
  const fixos = jogadores.filter(j => j.posicao === 'fixo').sort((a, b) => b.velocidade - a.velocidade);
  const meias = jogadores.filter(j => j.posicao === 'meia').sort((a, b) => b.velocidade - a.velocidade);
  const atacantes = jogadores.filter(j => j.posicao === 'atacante').sort((a, b) => b.velocidade - a.velocidade);

  // Distribuir jogadores de forma equilibrada
  const time1 = [];
  const time2 = [];
  let totalVelocidadeTime1 = 0;
  let totalVelocidadeTime2 = 0;

  // Distribuir goleiros
  time1.push({ nome: goleiro1, posicao: 'goleiro', velocidade: 0 }); // Assumindo velocidade 0 para goleiros
  time2.push({ nome: goleiro2, posicao: 'goleiro', velocidade: 0 });

  // Função auxiliar para adicionar jogador ao time com menor velocidade total
  function adicionarJogadorAoTime(jogador) { 
    if (time1.length <= time2.length) {
      time1.push(jogador);
      totalVelocidadeTime1 += jogador.velocidade;
    } else {
      time2.push(jogador);
      totalVelocidadeTime2 += jogador.velocidade;
    }
  }

  // Distribuir jogadores de cada posição, alternando entre os times
  while (fixos.length > 0 || meias.length > 0 || atacantes.length > 0) {
    if (fixos.length > 0) adicionarJogadorAoTime(fixos.pop());
    if (meias.length > 0) adicionarJogadorAoTime(meias.pop());
    if (atacantes.length > 0) adicionarJogadorAoTime(atacantes.pop());
  }
  

    // Exibir resultado (numerando jogadores a partir de 1 e na ordem desejada)
  const resultado = document.getElementById("resultado");
  let contadorTime1 = 1; // Contador para o Time Branco
  let contadorTime2 = 1; // Contador para o Time Preto
  resultado.innerHTML = `
    
  <div class="time">
    <h3>Time Branco</h3>
      ${time1.filter(j => j.posicao === 'goleiro').map(j => `<div>${contadorTime1++}. ${j.nome} (${j.posicao})</div>`).join("")}  
      ${time1.filter(j => j.posicao === 'fixo').map(j => `<div>${contadorTime1++}. ${j.nome} (${j.posicao})</div>`).join("")}
      ${time1.filter(j => j.posicao === 'meia').map(j => `<div>${contadorTime1++}. ${j.nome} (${j.posicao})</div>`).join("")}
      ${time1.filter(j => j.posicao === 'atacante').map(j => `<div>${contadorTime1++}. ${j.nome} (${j.posicao})</div>`).join("")}
  </div>
    
  <div class="time">
    <h3>Time Preto</h3>
      ${time2.filter(j => j.posicao === 'goleiro').map(j => `<div>${contadorTime2++}. ${j.nome} (${j.posicao})</div>`).join("")}  
      ${time2.filter(j => j.posicao === 'fixo').map(j => `<div>${contadorTime2++}. ${j.nome} (${j.posicao})</div>`).join("")}
      ${time2.filter(j => j.posicao === 'meia').map(j => `<div>${contadorTime2++}. ${j.nome} (${j.posicao})</div>`).join("")}
      ${time2.filter(j => j.posicao === 'atacante').map(j => `<div>${contadorTime2++}. ${j.nome} (${j.posicao})</div>`).join("")}
  </div>
  `;
}

// Adicionar evento de clique ao botão "Separar Times"
document.getElementById("separarTimes").addEventListener("click", separarTimes);