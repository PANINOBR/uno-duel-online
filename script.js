// ===============================
// UNO DUEL LOCAL
// SISTEMA DE PARTIDA
// ===============================

let jogadores = [
    {
        nome: "Douglas",
        tipo: "developer",
        cartas: []
    },
    {
        nome: "Jogador",
        tipo: "player",
        cartas: []
    }
];

let baralho = [];
let descarte = [];
let turno = 0;


// ===============================
// CRIAR BARALHO UNO
// ===============================

function criarBaralho(){

    const cores = [
        "vermelho",
        "azul",
        "verde",
        "amarelo"
    ];

    baralho = [];

    cores.forEach(cor=>{

        for(let i=0;i<=9;i++){

            baralho.push({
                cor:cor,
                valor:i
            });

        }

    });


    // cartas extras simples

    for(let i=0;i<20;i++){

        baralho.push({
            cor:"preto",
            valor:"+4"
        });

    }


    embaralhar();

}



// ===============================
// EMBARALHAR
// ===============================

function embaralhar(){

    baralho.sort(()=>{
        return Math.random()-0.5;
    });

}



// ===============================
// DISTRIBUIR CARTAS
// ===============================

function distribuir(){

    jogadores.forEach(jogador=>{

        jogador.cartas=[];

        for(let i=0;i<7;i++){

            jogador.cartas.push(
                baralho.pop()
            );

        }

    });


    descarte.push(
        baralho.pop()
    );

}



// ===============================
// INICIAR PARTIDA
// ===============================

function iniciarJogo(){

    criarBaralho();

    distribuir();

    atualizarTela();

}



// ===============================
// CARTA ATUAL
// ===============================

function cartaAtual(){

    return descarte[
        descarte.length-1
    ];

}

// ===============================
// MOSTRAR CARTAS DO DOUGLAS
// ===============================

function mostrarMinhaMao(){

    let area =
    document.getElementById("hand");


    area.innerHTML="";


    jogadores[0].cartas.forEach((carta,index)=>{


        let div =
        document.createElement("div");


        div.className =
        "handCard " + carta.cor;



        div.innerHTML =
        carta.valor;



        div.onclick=function(){

            jogarCarta(index);

        };



        area.appendChild(div);


    });


}



// ===============================
// ATUALIZAR TELA
// ===============================

function atualizarTela(){


    let mesa =
    cartaAtual();



    document
    .getElementById("currentCard")
    .innerHTML =
    mesa.valor;



    document
    .getElementById("myCount")
    .innerHTML =
    jogadores[0].cartas.length;



    document
    .getElementById("enemyCount")
    .innerHTML =
    jogadores[1].cartas.length;



    document
    .getElementById("turn")
    .innerHTML =

    "Turno: " +

    jogadores[turno].nome;



    document
    .getElementById("currentCard")
    .className =
    "card " + mesa.cor;



    mostrarMinhaMao();


}



// ===============================
// VALIDAR CARTA
// ===============================

function podeJogar(carta){


    let atual =
    cartaAtual();



    return (

        carta.cor === atual.cor ||

        carta.valor === atual.valor ||

        carta.cor === "preto"

    );


}




// ===============================
// JOGAR CARTA
// ===============================

function jogarCarta(index){



    if(turno !== 0){

        alert(
        "Aguarde o adversário"
        );

        return;

    }



    let carta =
    jogadores[0]
    .cartas[index];



    if(!podeJogar(carta)){


        alert(
        "Carta inválida"
        );


        return;


    }



    descarte.push(carta);



    jogadores[0]
    .cartas.splice(index,1);



    verificarVitoria();



    turno=1;



    atualizarTela();



    setTimeout(

        jogadaComputador,

        1000

    );



}




// ===============================
// COMPRAR CARTA
// ===============================

function comprarCarta(){



    if(baralho.length===0){

        return;

    }



    jogadores[0]
    .cartas.push(
        baralho.pop()
    );



    atualizarTela();


}




// ===============================
// VERIFICAR VITÓRIA
// ===============================

function verificarVitoria(){


    if(
    jogadores[0].cartas.length===0
    ){

        alert(
        "🎉 Douglas venceu!"
        );


    }



}

// ===============================
// JOGADA DO COMPUTADOR
// ===============================

function jogadaComputador(){


    let cartas =
    jogadores[1].cartas;


    let jogou = false;



    for(let i=0;i<cartas.length;i++){


        if(podeJogar(cartas[i])){


            descarte.push(
                cartas[i]
            );


            cartas.splice(i,1);


            jogou=true;


            break;


        }


    }




    if(!jogou){


        if(baralho.length>0){


            cartas.push(
                baralho.pop()
            );


        }


    }




    verificarVitoriaComputador();



    turno=0;



    atualizarTela();



}




// ===============================
// VITÓRIA COMPUTADOR
// ===============================

function verificarVitoriaComputador(){


    if(
    jogadores[1].cartas.length===0
    ){


        alert(
        "😢 O Jogador venceu!"
        );


        iniciarJogo();


    }


}




// ===============================
// BOTÃO COMPRAR
// ===============================

document
.getElementById("drawBtn")
.onclick=function(){


    if(turno!==0){


        alert(
        "Não é sua vez"
        );


        return;


    }



    comprarCarta();


};




// ===============================
// BOTÃO UNO
// ===============================

document
.getElementById("unoBtn")
.onclick=function(){


    if(
    jogadores[0].cartas.length===1
    ){


        alert(
        "🔥 UNO!"
        );


    }
    else{


        alert(
        "Você ainda tem mais de uma carta"
        );


    }


};




// ===============================
// BOTÃO INICIAR
// ===============================

document
.getElementById("startBtn")
.onclick=function(){


    document
    .getElementById("menu")
    .classList.add("hidden");



    document
    .getElementById("game")
    .classList.remove("hidden");



    iniciarJogo();


};
