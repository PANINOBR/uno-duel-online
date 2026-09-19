let baralho = [];

let minhaMao = [];

let cartaMesa = null;



const cores = [
    "red",
    "blue",
    "green",
    "yellow"
];


const numeros = [
    "0","1","2","3","4","5",
    "6","7","8","9"
];



function criarBaralho(){

    baralho=[];


    cores.forEach(cor=>{


        numeros.forEach(numero=>{


            baralho.push({

                cor:cor,

                valor:numero

            });


        });


    });



}



function embaralhar(){


    baralho.sort(()=>Math.random()-0.5);


}




function iniciarJogo(){


    criarBaralho();


    embaralhar();



    minhaMao=[];



    for(let i=0;i<7;i++){


        minhaMao.push(
            baralho.pop()
        );


    }



    cartaMesa = baralho.pop();



    document
    .getElementById("menu")
    .classList.add("hidden");



    document
    .getElementById("game")
    .classList.remove("hidden");



    atualizarTela();



}




function atualizarTela(){


    document
    .getElementById("myCount")
    .innerHTML =
    minhaMao.length;



    document
    .getElementById("currentCard")
    .innerHTML =
    cartaMesa.valor;



    document
    .getElementById("currentCard")
    .className =
    "card " + cartaMesa.cor;



    mostrarCartas();


}





function mostrarCartas(){


    let area =
    document.getElementById("hand");



    area.innerHTML="";



    minhaMao.forEach((carta,index)=>{


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




function jogarCarta(index){


    let carta =
    minhaMao[index];



    if(
        carta.cor == cartaMesa.cor ||
        carta.valor == cartaMesa.valor
    ){


        cartaMesa=carta;



        minhaMao.splice(index,1);



        atualizarTela();



    }else{


        alert(
        "Essa carta não pode ser jogada"
        );


    }


}




document
.getElementById("startBtn")
.onclick =
iniciarJogo;




document
.getElementById("drawBtn")
.onclick=function(){


    if(baralho.length>0){


        minhaMao.push(
            baralho.pop()
        );


        atualizarTela();


    }


};




document
.getElementById("unoBtn")
.onclick=function(){

    alert("UNO!");

};
