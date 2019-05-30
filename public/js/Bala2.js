class Bala2 extends Enemigo{

    constructor(app){
       super(app);
        for (let i = 0; i < 4; i++) {
           this.imagen.push(this.app.loadImage('/imgs/bomb' + (i+1)+ '.png'));
            
        }
    }



}