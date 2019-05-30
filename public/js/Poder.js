class Poder{

    constructor(app){
        this.app=app;
        this.x=this.app.random(this.app.width);
        this.y=-100;
        this.mover=this.mover.bind(this);
        this.moviendose=setInterval(this.mover,20);
        this.imagen=this.app.loadImage('/imgs/poder.png');
    }


pintar(){
this.app.image(this.imagen,this.x,this.y);
}

mover(){
this.y+=3;
}

getX(){
    return this.x;
}

getY(){
    return this.y;
}

stop(){
    clearInterval(this.moviendose);
}

}