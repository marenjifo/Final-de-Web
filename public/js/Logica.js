class Logica{

    constructor(app){
    this.app=app;
    this.pantalla=-1;
    this.app.imageMode(this.app.CENTER);
    this.morir=false;
    this.ganar=false;
    this.vidas=3;
    this.puntaje=0;
    this.tiempo=30;
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
                this.app.fill(255);
                this.app.text("Vidas: "+this.vidas,25,25);
                this.app.text("Puntos: "+this.puntaje,25,55);
                this.app.text("Tiempo: "+this.tiempo,25,85);
                this.personaje.pintar();
                for (let i = 0; i < this.enemigos.length; i++) {
                    this.enemigos[i].pintar();  
                } 
                if(this.app.frameCount%60==0){
                    this.tiempo--;
                }
                if(this.morir){
                    this.pantalla=2;
                }
                if(this.ganar){
                    this.pantalla=3;
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

        if(this.vidas==0 || this.tiempo<=0){
            this.morir=true;
        }

        if(this.puntaje<=0){
            this.puntaje=0;
        }

        if(this.puntaje==3 && this.tiempo>0){
            this.ganar=true;
        }

        this.validarColisiones();

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

    
    validarColisiones(){

        if(Personaje.estrellas!=null){
        for (let i = 0; i < Personaje.estrellas.length; i++) {
            for (let j = 0; j < this.enemigos.length; j++) { 
            let estrella= Personaje.estrellas[i];
            let enemigo= this.enemigos[j];
            if(this.app.dist(estrella.x,estrella.y,enemigo.x,enemigo.y)<=20){
                enemigo.stop();
                estrella.stop();
                this.enemigos.splice(j,1);
                Personaje.estrellas.splice(i,1);
                this.puntaje++;
                return;
            }
            
        }
        
     }
    }
       
            for (let j = 0; j < this.enemigos.length; j++) { 
            let perso= this.personaje;
            let enemigo= this.enemigos[j];
            if(this.app.dist(perso.x,perso.y,enemigo.x,enemigo.y)<=20){
                enemigo.stop();
                this.enemigos.splice(j,1);
                this.vidas--;
                this.puntaje--;
                return;
            }
            
        }
        


}


}
