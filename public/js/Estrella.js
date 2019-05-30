class Estrella{


    constructor(app,x,y){
        this.app=app;
        this.x=x;
        this.y=y;
        this.imagen=[];
        this.punt=0;
        for (let i = 0; i < 4; i++) {
            this.imagen.push(this.app.loadImage('/imgs/est' + (i+1)+ '.png'));
         }
        this.animacion=this.animacion.bind(this);
        this.animar=setInterval(this.animacion,280);
        this.mover=this.mover.bind(this);
        this.moviendose=setInterval(this.mover,50);
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
        this.y-=5;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    stop(){
        clearInterval(this.moviendose);
        clearInterval(this.animar);
    }


}