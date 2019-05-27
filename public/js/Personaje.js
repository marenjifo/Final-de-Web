class Personaje{
    
    static estrellas=[];
    constructor(app,x,y){
        
        this.app=app;
        this.x=x;
        this.y=y;
        this.vel=4;
        this.imagen=[];
        for (let i = 0; i < 4; i++) {
           this.imagen.push(this.app.loadImage('/imgs/kirDown' + (i+1)+ '.png'));
            
        }
        this.punt=0;
        this.animacion=this.animacion.bind(this);
        setInterval(this.animacion,200);
        this.moverIzq=false;
        this.moverDer=false;    
    }


pintar(){

this.app.image(this.imagen[this.punt],this.x,this.y);
for (let i = 0; i < Personaje.estrellas.length; i++) {
    Personaje.estrellas[i].pintar();
}

if(this.moverIzq && this.x>30){
    this.x-=this.vel;
}

if(this.moverDer && this.x<720){
    this.x+=this.vel;
}

}

animacion(){
    this.punt++;
    if(this.punt>3){
        this.punt=0;
    }
}

mover(){

    switch(this.app.keyCode){

        case this.app.RIGHT_ARROW:
            this.moverDer=true;
            this.moverIzq=false;
            break;

        case this.app.LEFT_ARROW:
            this.moverIzq=true;
            this.moverDer=false;
            break;
    }
}

parar(){
    switch(this.app.keyCode){

        case this.app.RIGHT_ARROW:
            this.moverDer=false;
            break;

        case this.app.LEFT_ARROW:
            this.moverIzq=false;
            break;
    }
}

disparar(){
    Personaje.estrellas.push(new Estrella(this.app,this.x,this.y));
}

}