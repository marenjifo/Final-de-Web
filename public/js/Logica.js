class Logica{

    constructor(app){
    this.app=app;
    this.pantalla=-1;
    this.app.imageMode(this.app.CENTER);
    //this.fondo=this.app.loadImage("/imgs/switch.png");
      }

    pintar(){

        switch (this.pantalla) {
            case -1:
                    this.app.background(255,0,255);
                break;
            case 0:
                    this.app.background(255,255,0);
                break;
        
            case 1:
                this.app.background(0);
                
                break;
            case 2:
                this.app.background(255,0,0);
            break;

            case 3:
                this.app.background(0,255,0);
                break;
        }
  
      
    }

    mouse(){

        console.log(this.app.mouseX+" "+this.app.mouseY);

        switch (this.pantalla) {
            case -1:
                this.pantalla=0;
            break;
           
            case 0:
                 this.pantalla=1;
                
                break;
        
            case 1:
               
                break;
        }

    }


    teclado(){ 

      
       
    }

    soltarTeclado(){

       
       
    }

    



}
