
/// function para criar as div e as class

function NovoElemento (tagName , className) { 
    const elem = document.createElement(tagName)
    elem.className = className
    
    return  elem
}

/// criad as div's e as class 

function Barreira (reversa = false){
    this.elemento = NovoElemento( 'div' , 'barreiras')

    const borda = NovoElemento ('div' , 'borda')
    const corpo = NovoElemento ('div' , 'corpo')
    
    
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}



function PardeBarreiras (altura , abertura , x ) {
     this.elemento = NovoElemento('div' , 'par-das-barreiras')

     this.superior = new Barreira(true)
     this.inferior = new Barreira()

     this.elemento.appendChild(this.superior.elemento)
     this.elemento.appendChild(this.inferior.elemento)
     

     this.sortearAberturas = () => {
         const alturaSuperior  = Math.random() * (altura  - abertura)
         const alturaInferior  = altura - abertura - alturaSuperior

         this.inferior.setAltura(alturaInferior)
         this.superior.setAltura(alturaSuperior)
     }

     this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
     this.setX =  x => this.elemento.style.left = `${x}px`
     this.getLargura = () => this.elemento.clientWidth  
     this.sortearAberturas()
     this.setX(x)
    }



    ///funcao para movimentacao das barreiras 

    function Barreiras ( altura , largura , abertura  , espaco , notificarPonto) { 
        this.pares = [
            new PardeBarreiras( altura , abertura , largura ) ,
            new PardeBarreiras( altura , abertura , largura  + espaco),
            new PardeBarreiras( altura , abertura , largura + espaco * 2),
            new PardeBarreiras( altura , abertura , largura + espaco * 3)
        ]

        const deslocamento = 2
        this.animar = ()=>{
            this.pares.forEach( par => {
                par.setX(par.getX() - deslocamento)

                ////se o elemento sair da tela 
                if(par.getX() < -par.getLargura()){
                  par.setX(par.getX() + espaco * this.pares.length)
                  par.sortearAberturas()
                }

                const meio  = largura / 2 
                const cruxouMeio = par.getX() + deslocamento >= meio 
                && par.getX() < meio 
                if(cruxouMeio) notificarPonto
            })
        }   
    }
    // funcao que vai criar o passaro e fazer a movimentacao dele 

function Passaro (alturaJogo) {
    let voando = 0 
console.log(alturaJogo)
    this.elemento = NovoElemento('img' , 'passaro')
    this.elemento.src = "FLAAPY/passaro.png"
    
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    
    window.onkeydown = e => voando = true
    window.onkeyup = e => voando=  false
    
    /// funcao que vai  fazer com que o passaro voue 
    
    this.animar =  () => {
        const novoY  = this.getY() + (voando ? 10 : -4 )
        const alturaMaxima =  alturaJogo - this.elemento.clientHeight
        
        
        if(novoY <= 0 ){
            this.setY(0)
        }else if ( novoY >= alturaMaxima){
            this.setY(alturaMaxima)
        }else{
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2 )
}


    const barreira = new Barreiras(700 , 400 , 300 ,400)
    const passaro = new Passaro(700)
    const areaJogo = document.querySelector('[flappyzinho]')
    areaJogo.appendChild(passaro.elemento)
    barreira.pares.forEach(par => areaJogo.appendChild(par.elemento))

    setInterval(()=>{
        barreira.animar()
        passaro.animar()
     } , 30)
    
    

