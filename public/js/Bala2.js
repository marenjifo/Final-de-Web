class Bala2 extends Enemigo{

    constructor(app){
       super(app);
        for (let i = 0; i < 4; i++) {
           this.imagen.push(this.app.loadImage('/imgs/kirDown' + (i+1)+ '.png'));
            
        }
    }



}