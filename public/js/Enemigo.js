class Enemigo{

    constructor(app){
        this.app=app;
        this.x=this.app.random(this.app.width);
        this.y=-100;
        this.imagen=[];
        this.punt=0;
        this.animacion=this.animacion.bind(this);
        this.animar=setInterval(this.animacion,200);
        this.mover=this.mover.bind(this);
        this.moviendose=setInterval(this.mover,20);
    }


pintar(){
this.app.image(this.imagen[this.punt],this.x,this.y);
}

animacion(){
    this.punt++;
    if(this.punt>3){
        this.punt=0;
    }
}

mover(){
this.y+=2;

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