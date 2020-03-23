// ALTURA E LARGURA DA TELA SERÃO ALTERADOS E RETORNADOS PARA A LOGICA DO JOGO TODA VEZ O JOGADORA DAR UM RESIZE NA JANELA

var altura  = 0
var largura = 0
var vidas = 1


//EXTRAINDO A VARIAVEL DIFICIL DO ENDEREÇO DA PAGINA GERADO PELA INDEX DO JOGO APOS SELECIONAR NIVEL DE DIFICULDADE

var nivel = (window.location.search).replace('?', '')

// CRIANDO LÓGICA DOS NIVELS DE DIFICULDADE DO JOGO

var criandoMoscasTempo = 1500

if (nivel === 'normal') {
    criandoMoscasTempo = 1500
} else if (nivel == 'dificil'){
    criandoMoscasTempo = 1000
} else if (nivel == 'nasa'){
    criandoMoscasTempo = 750
}

console.log(criandoMoscasTempo)




//CONFIGURANDO CRONOMETRO

//DEFININDO VALOR INCIAL DO CRONOMETRO
var tempo = 15

var cronometro = setInterval( function(){
    document.getElementById('cronometro').innerHTML = tempo
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criandoMoscas)
        window.location.href = 'vitoria.html'
    }    
    tempo--
}, 1000);




//CRIANDO CORDENADA ALEATORIA PRA POSICIONAMENTO DOS MOSQUITOS

let dimensaoMosquito
 
function ajustaTelaJogo(params) {

    if (window.innerHeight <= 575.98) {
        dimensaoMosquito = 60
    } else if (window.innerHeight <= 767.98) {
        dimensaoMosquito = 70
    } else if (window.innerHeight <= 991.98) {
        dimensaoMosquito = 80
    } else if (window.innerHeight < 1199.98) {
        dimensaoMosquito = 90
    } else {
        dimensaoMosquito = 100
    }
    
    altura = window.innerHeight - dimensaoMosquito
    largura = window.innerWidth - dimensaoMosquito
}

ajustaTelaJogo()

function posicaoRamdomica() {
    
    var posicaoX = Math.floor(Math.random() * largura)
    var posicaoY = Math.floor(Math.random() * altura)
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    console.log(posicaoX, posicaoY)

    //criando um elemento html atraves do JS e inserindo coordenadas ramdomicas nele

    //VERIFICANDO SE JA EXISTE ALGUM MOSQUITO NA TELA ANTES CRIAR MAIS UM
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        //SE HOUVER UM MOSQUITO NA TELA O USUARIO DEVERA PERDER UMA VIDA, SE ELE PERDEU AS TRES DIRECIONALO PARA PAGINA GAME OVER
        if (vidas > 3) {
            window.location.href = 'game-over.html'
        } else{
        document.getElementById('vida' + vidas).src = 'imagens/coracao_vazio.png'
        vidas++
        }
    }


    var mosca = document.createElement('img')
    mosca.id = 'mosquito'
    mosca.src = 'imagens/mosca.png'
    mosca.className = moscaTamanhoAleatorio() + " " + moscaOlhandoEsquerdaOuDireita() 
    definirTamanhoMosca(mosca.className, mosca)
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.onclick = function () {
        this.remove()
    }

    // INFORMANDO QUE O MOSQUITO É UM ITEM FILHO DO BODY
    document.body.appendChild(mosca)

}

//DEFININDO TAMANHO DAS MOSCAS

function definirTamanhoMosca(classeMosca, elementoMosca) {
    if (classeMosca.indexOf('3') != -1){
        elementoMosca.style.width = `${dimensaoMosquito}px`
        elementoMosca.style.height = `${dimensaoMosquito}px`
    }else if (classeMosca.indexOf('2') != -1){
        elementoMosca.style.width = `${dimensaoMosquito * 0.8}px`
        elementoMosca.style.height = `${dimensaoMosquito * 0.8}px`
    }else{
        elementoMosca.style.width = `${dimensaoMosquito * 0.6}px`
        elementoMosca.style.height = `${dimensaoMosquito * 0.6}px`
    }
   
}

// VARIANDO ALEATORIAMENTE OS TAMANHOS

function moscaTamanhoAleatorio() {
    var classeTamanho = Math.floor(Math.random() * 3)

    switch (classeTamanho) {
        case 0: return('mosquito1')
        case 1: return('mosquito2')
        case 2: return('mosquito3')
    }
    
}

//OLHANDO PRA ESQUERDA OU A DIREITA - ALEATORIO
function moscaOlhandoEsquerdaOuDireita() {
    var classeOlhando = Math.floor(Math.random()*2)
    switch (classeOlhando) {
        case 0: return('olhandoEsquerda')
        case 1: return('olhandoDireita')
    }
}


