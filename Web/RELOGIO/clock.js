function clocker(){
    setInterval(function(){
    var DiaAtual = new Date()
    var HrAtual =  parseInt(DiaAtual.getHours()) 
    var MinAtual = DiaAtual.getMinutes() // ele pega a hora atual e os minutos
    var rotacao = ((HrAtual % 12) - 6 + (MinAtual/60))  * 15 //a cada hora ele roda 15 graus, se for meio dia 12%12 = 0, ele vai ficar na posicao exata 0.
                                            //eu tiro 6 pra que ele fique totalmente dia quando for 12h, A imagem que eu peguei na posisao 0 fica metade metade, entao tem que fazer esse ajuste.
                                            // se for 30 minutos fica 0,5 entre 12 e 13, entao ele vai ficar na posicao 7,5 graus, fica mais preciso
    if (HrAtual >= 12) {         
        rotacao += 180;  // se for 12h da noite ele vai ficar na posicao 180 graus
    }
    document.getElementById("divimg").animate(
        [
            {transform: `rotate(${rotacao}deg)`}, // onde ele comeca
            {transform: `rotate(${rotacao + 180}deg)`} //onde ele termina

        ],
        {
            duration: 43200000, // 12 horas em milissegundos
            iterations: Infinity,
            easing: 'linear'
        }


    )
    if(HrAtual  <= 18  && HrAtual  >= 6){ // 6h as 18h ele fica no modo claro, depois disso fica no modo escuro
        if (MinAtual <=30){
          modoClaro();

        }else{
          modoEscuro();
        }
        
        
    }else{
        modoEscuro();
    }
        document.getElementById("clockH3").innerHTML = HrAtual  + ":" + (MinAtual<10 ? "0" + MinAtual : MinAtual)
    }, 1000); // 01h ou 10h, ele coloca o 0 antes
              // ele atualiza a cada 1 segundo para ser mais preciso
   
}
function modoEscuro(){
    document.getElementById("big").style.background = "#0F0F0F"
    document.getElementById("big").style.boxShadow = " 19px 19px 35px #0b0b0b,-19px -19px 35px #131313"
    document.getElementById("body").style.backgroundColor = "#0F0F0F"
    document.getElementById("mini").style.background = "#0F0F0F"
    document.getElementById("clockp").style.background = "#0F0F0F"
    document.getElementById("clockp").style.boxShadow = "5px 5px 10px #070707,-5px -5px 10px #171717"
    document.getElementById("clockH3").style.color  = "#e0e0e0"
}
function modoClaro(){
    document.getElementById("big").style.background = "#e0e0e0"
    document.getElementById("big").style.boxShadow = " 20px 20px 60px #696969, -20px -20px 60px #ffffff"
    document.getElementById("body").style.backgroundColor = "#e0e0e0"
    document.getElementById("mini").style.background = "#e0e0e0"
    document.getElementById("clockp").style.background = "#e0e0e0"
    document.getElementById("clockp").style.boxShadow = "  5px 5px 10px #656565 , -5px -5px 10px #ffffff"
    document.getElementById("clockH3").style.color  = "#0F0F0F"
}
