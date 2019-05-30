class Bala extends Enemigo{

    constructor(app){
       super(app);
        for (let i = 0; i < 4; i++) {
           this.imagen.push(this.app.loadImage('/imgs/eneN' + (i+1)+ '.png'));
            
        }
    }



}