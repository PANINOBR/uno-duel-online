// =======================================
// UNO DUEL - RENDER REALISTA DE CARTAS
// =======================================


let mesa = document.getElementById("currentCard");
let minhaMao = document.getElementById("playerCards");


// jogadores já existentes
let jogadorAtual = 0;



// =======================================
// CRIAR CARTA VISUAL
// =======================================

function criarCartaVisual(carta, index, minhaCarta = false){


    let div = document.createElement("div");


    if(minhaCarta){

        div.className = "handCard";

    }else{

        div.className = "card";

    }



    // cor da carta

    if(carta.cor){

        div.classList.add(carta.cor);

    }



    // conteúdo

    div.innerHTML = `

        <span class="numeroCarta">

            ${carta.valor}

        </span>

    `;



    // clique na carta

    if(minhaCarta){

        div.onclick = function(){

            jogarCarta(index);

        };

    }



    return div;


}





// =======================================
// MOSTRAR MINHAS CARTAS
// =======================================


function renderizarMinhaMao(){


    if(!minhaMao) return;



    minhaMao.innerHTML="";



    jogadores[0].cartas.forEach((carta,index)=>{


        let elemento =

        criarCartaVisual(
            carta,
            index,
            true
        );



        minhaMao.appendChild(elemento);



    });



}

// =======================================
// MOSTRAR CARTA DA MESA
// =======================================


function renderizarMesa(){


    mesa.innerHTML="";


    let cartaAtual =

    descarte[
        descarte.length - 1
    ];



    if(!cartaAtual){

        return;

    }



    let carta =

    criarCartaVisual(
        cartaAtual,
        0,
        false
    );



    mesa.appendChild(carta);


}






// =======================================
// MOSTRAR BARALHO
// =======================================


function renderizarBaralho(){


    let deck =

    document.getElementById("deck");



    if(!deck){

        return;

    }



    deck.innerHTML = `

        <span>

        UNO

        </span>

    `;


    deck.className =
    "card back";



}






// =======================================
// ATUALIZAR TODA A MESA
// =======================================


function atualizarMesa(){



    renderizarMesa();


    renderizarMinhaMao();


    renderizarBaralho();



}






// =======================================
// ORGANIZAR CARTAS EM LEQUE
// =======================================


function organizarLeque(){


    let cartas =

    document.querySelectorAll(
        ".handCard"
    );



    cartas.forEach((carta,index)=>{


        let meio =

        (cartas.length - 1) / 2;



        let distancia =

        index - meio;



        carta.style.transform =

        `rotate(${distancia * 5}deg)
        translateY(${Math.abs(distancia)*2}px)`;



        carta.style.zIndex=index;



    });



}






// =======================================
// ATUALIZAÇÃO AUTOMÁTICA DO LEQUE
// =======================================


setInterval(()=>{


    organizarLeque();


},500);

// =======================================
// INICIAR PARTIDA
// =======================================


document
.getElementById("startBtn")
.onclick = function(){


    document
    .getElementById("menu")
    .classList.add("hidden");



    document
    .getElementById("game")
    .classList.remove("hidden");



    iniciarJogo();



    atualizarMesa();


};






// =======================================
// JOGAR CARTA COM ANIMAÇÃO
// =======================================


function jogarCarta(index){



    let carta =

    jogadores[0]
    .cartas[index];



    let atual =

    descarte[
        descarte.length-1
    ];



    if(

        carta.cor !== atual.cor &&

        carta.valor !== atual.valor &&

        carta.cor !== "preto"

    ){

        alert(
        "Carta inválida!"
        );


        return;

    }




    descarte.push(carta);



    jogadores[0]
    .cartas.splice(index,1);




    atualizarMesa();





    verificarVitoria();



}






// =======================================
// COMPRAR CARTA
// =======================================


document
.getElementById("drawBtn")
.onclick=function(){



    if(baralho.length > 0){


        jogadores[0]
        .cartas.push(
            baralho.pop()
        );



        atualizarMesa();


    }


};






// =======================================
// BOTÃO UNO
// =======================================


document
.getElementById("unoBtn")
.onclick=function(){



    if(
    jogadores[0].cartas.length === 1
    ){


        alert(
        "🔥 UNO!"
        );


    }
    else{


        alert(
        "Você ainda não está no UNO"
        );


    }


};






// =======================================
// EFEITO DE CARTA NOVA
// =======================================


function animarCarta(elemento){


    elemento.classList.add(
        "playingCard"
    );


}
