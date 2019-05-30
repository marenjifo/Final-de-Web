class Logica{

    constructor(app){
    this.app=app;
    this.pantalla=-1;
    this.app.imageMode(this.app.CENTER);
    this.morir=false;
    this.ganar=false;
    this.poder=false;
    this.contPoder=0;
    this.vidas=3;
    this.puntaje=0;
    this.tiempo=30;
    this.inicio=this.app.loadImage('/imgs/inicio.png');
    this.nivel=this.app.loadImage('/imgs/nivel.png');
    this.barra=this.app.loadImage('/imgs/barra.png');
    this.perdiste=this.app.loadImage('/imgs/perdiste.png');
    this.ganaste=this.app.loadImage('/imgs/ganaste.png');
    }

    pintar(){

        switch (this.pantalla) {
            case -1:
                    
                    this.app.image(this.inicio,this.app.width/2,this.app.height/2);
                break;
            case 0:
                    this.app.background(255,255,0);
                    
                break;
        
            case 1:
                this.app.background(0);
                this.app.image(this.nivel,this.app.width/2,this.app.height/2);
                
                this.personaje.pintar();
                for (let i = 0; i < this.enemigos.length; i++) {
                    this.enemigos[i].pintar();  
                } 
                
                for (let i = 0; i < this.poderes.length; i++) {
                    this.poderes[i].pintar();  
                } 

                //Barra de puntaje, vidas y tiempo
                this.app.image(this.barra,this.app.width/2,this.app.height/2);
                this.app.fill(255);
                this.app.textSize(20);
                this.app.text(this.vidas,700,30);
                this.app.text(this.puntaje,490,30);
                this.app.text(this.tiempo,590,30);

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
                this.app.image(this.perdiste,this.app.width/2,this.app.height/2);
            break;

            case 3:
                this.app.image(this.ganaste,this.app.width/2,this.app.height/2);
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
                 setInterval(this.generarEnemigos,1500);
                 
                 this.update=this.update.bind(this);
                 setInterval(this.update,20);
                 
                 this.poderes= [];
                 this.generarPoderes=this.generarPoderes.bind(this);
                 setInterval(this.generarPoderes,3000);
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

    generarPoderes(){
        this.poderes.push(new Poder(this.app));
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

        if(this.puntaje>=3 && this.tiempo>0){
            this.ganar=true;
        }

        if(this.poder==true){

            if(this.app.frameCount%60==0){
                this.contPoder++;
            }
            for (let i = 0; i < this.enemigos.length; i++) {
                this.enemigos[i].vel=1;
            }

            

            if(this.contPoder==10){
                this.contPoder=0;
                this.poder=false;
            }
            this.personaje.vel=8;
            this.personaje.estado=1;
        }else{

            for (let i = 0; i < this.enemigos.length; i++) {
                this.enemigos[i].vel=2;
            }

            this.personaje.vel=4;
            this.personaje.estado=0;
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

        for (let j = 0; j < this.poderes.length; j++) { 
            let perso= this.personaje;
            let poder= this.poderes[j];
            if(this.app.dist(perso.x,perso.y,poder.x,poder.y)<=20){
                poder.stop();
                this.poderes.splice(j,1);
                this.puntaje+=2;
                this.poder=true;
                return;
            }
            
        }
        


}


}
