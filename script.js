const botao = document.getElementById("startBtn");

const jogo = document.getElementById("game");

const mensagem = document.getElementById("message");


botao.addEventListener("click", function(){


    jogo.classList.remove("hidden");


    mensagem.innerHTML = 
    "🎮 Partida criada com sucesso!";


    botao.style.display = "none";


});
