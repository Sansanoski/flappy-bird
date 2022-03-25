function NovoElemento (tagName , className) { 
    const elem = document.createElement(tagName)
    elem.className = className
    
    return  elem
}


function Barreira (reversa = false){
    this.elemento = NovoElemento( 'div' , 'barreiras')


    const borda = NovoElemento ('div' , 'borda')
    const corpo = NovoElemento ('div' , 'corpo')
    

    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

// const b = new Barreira (true)
// b.setAltura(200)
// document.querySelector('[flappyzinho]').appendChild(b.elemento)


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
    
    
    const b = new PardeBarreiras(700 , 300 , 200)
    document.querySelector('[flappyzinho]').appendChild(b.elemento)