new p5(function(app){
    var log;
    app.setup = function(){
    const canvas = app.createCanvas(750, 430);
    canvas.parent("juego");
    log = new Logica(app);
    }
    
    app.draw = function(){
        log.pintar();
    }
  
    app.keyPressed = function(){
      log.teclado();
    }
  
    app.keyReleased = function(){
      log.soltarTeclado();
    }
  
    app.mousePressed = function(){
      log.mouse();
      if(log.morir==true && log.pantalla==2){
        this.setup();
      }
      if(log.ganar==true && log.pantalla==3){
        this.setup();
      }
    }
    
    
    }
    );
    
    
    
    