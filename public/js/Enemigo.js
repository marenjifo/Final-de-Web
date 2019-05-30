class Enemigo{

    constructor(app){
        this.app=app;
        this.x=this.app.random(30,720);
        this.y=-100;
        this.imagen=[];
        this.imagen2=[];
        this.estado=0;
        this.punt=0;
        this.animacion=this.animacion.bind(this);
        this.animar=setInterval(this.animacion,200);
        this.mover=this.mover.bind(this);
        this.moviendose=setInterval(this.mover,20);
        this.vel=2;
    }


pintar(){
    switch (this.estado) {
        case 0:
            this.app.image(this.imagen[this.punt],this.x,this.y);
            break;
            
        case 1:
                this.app.image(this.imagen2[this.punt],this.x,this.y);
            break;
    }
}

animacion(){
    this.punt++;
    if(this.punt>3){
        this.punt=0;
    }
}

mover(){
this.y+=this.vel;

}

getX(){
    return this.x;
}

getY(){
    return this.y;
}

stop(){
    clearInterval(this.animar);
    clearInterval(this.moviendose);
}

}