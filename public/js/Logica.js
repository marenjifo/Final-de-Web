class Logica{

    constructor(app){
    this.app=app;
    this.pantalla=-1;
    this.app.imageMode(this.app.CENTER);
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
                this.personaje.pintar();
                for (let i = 0; i < this.enemigos.length; i++) {
                    this.enemigos[i].pintar();  
                } 
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
                 this.personaje = new Personaje(this.app,600,380);
                 this.enemigos= [];
                 this.generarEnemigos=this.generarEnemigos.bind(this);
                 setInterval(this.generarEnemigos,2000);
                 this.update=this.update.bind(this);
                 setInterval(this.update,20);
                break;
        
            case 1:
               
                break;
        }

    }

    generarEnemigos(){
        let r=Math.round(this.app.random(0,1));
        switch (r) {
            case 0:
                    this.enemigos.push(new Bala(this.app));
                break;
        
            case 1:
                    this.enemigos.push(new Bala2(this.app));
                break;
        }
        
    }

    update(){


        for (let i = 0; i < this.enemigos.length; i++) {
            if(this.enemigos[i].y>=(this.app.height+30)){
                this.enemigos.splice(i,1);
            }
            
        }

        for (let i = 0; i < Personaje.estrellas.length; i++) {
            if(Personaje.estrellas[i].y<=(-30)){
                Personaje.estrellas.splice(i,1);
            }
            
        }



    }


    teclado(){ 

        this.personaje.mover();   
        if(this.app.key=='a'){
            this.personaje.disparar();
        }
       
    }

    soltarTeclado(){

        this.personaje.parar();
       
    }

    



}
