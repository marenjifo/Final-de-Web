

window.addEventListener("load" , function(){
    feather.replace();
    //TweenMax.to(".producto__corazon", 2, {backgroundColor:"#ff0000", width:"30%", top:"100px", ease:Power2.easeInOut});
    
    //Animacion GSAP de botones corazon
    var btnCor=document.querySelectorAll('.producto__corazon');
    
    function animarCarrito() {
        var tl2 = new TimelineMax();
        tl2.add( TweenMax.to(".app__carrito", 0.25, {rotation:15,scale:1.15,ease: Power2.easeOut}) );
        tl2.add( TweenMax.to(".app__carrito", 0.25, {rotation:-15,scale:1.15,ease: Power2.easeOut}) );
        tl2.add( TweenMax.to(".app__carrito", 0.25, {rotation:0,scale:1,ease: Power2.easeOut}) );
    }

    
    if(btnCor!=null){ 
    btnCor.forEach(function(btn){

        btn.addEventListener('mouseenter',function(){

            var padre= btn.parentNode.parentNode;
            var cor = padre.querySelector('.cor');
            var tl = new TimelineMax({repeat:1});
            tl.add( TweenMax.to(cor, 0.2, {scale:1.2, ease: Bounce.easeOut}) );
            tl.add( TweenMax.to(cor, 0.2, {scale:1, ease:Power2.easeInOut}) );
        });
    });
}
    
    var botonCarrito = document.querySelector(".goCarrito");
    var botonComprar=document.querySelector('.irCheck');
    function aCarrito(){
        location.href='/carrito';
    }
    function aCheck(){
        location.href='/checkout';
    }
    if(botonCarrito!= null){
        botonCarrito.addEventListener("click" , aCarrito);
    }
    if(botonComprar!= null){
        botonComprar.addEventListener("click" , aCheck);
    }

    var listaProductos=[];
    


    if(localStorage.getItem("listaProductos")!=null){
    listaProductos=JSON.parse(localStorage.getItem
    ("listaProductos"));
    }
    //Agregar productos desde la tienda
    var tienda_agregar = document.querySelectorAll(".producto__mas");
    var detalles_agregar = document.querySelectorAll(".mas-detalles");
    var num__productos = document.querySelector(".app__NoProducto");
    var paraComprar=document.querySelector('.carrito__izquierda');
    var totalCompra=document.querySelector('.total');
    var subtotalCompra=document.querySelector('.subtotal');

    function actualizarCarrito(){
        var suma=0;
        animarCarrito();
        //Numero de productos en el carrito
        if(num__productos!=null){
            num__productos.innerHTML=listaProductos.length;
        }
        //Actualizar localStorage
        localStorage.setItem("listaProductos",JSON.stringify(listaProductos));

        if(paraComprar!=null){
            paraComprar.innerHTML="";
        }

        //Crear element por cada producto en el carrito
        listaProductos.forEach(function(producto,index){
                var carrito__productoN=document.createElement('div');
                var carrito__imagenN=document.createElement('div');
                var carrito__descripcionN=document.createElement('div');
                var carrito__nombreN=document.createElement('h3');
                var carrito__precioN=document.createElement('p');
                var carrito__categoriaN=document.createElement('p');
                var carrito__logoN=document.createElement('i');
                var carrito__opcionesN=document.createElement('div');
                var carrito__eliminarN=document.createElement('i');
                var carrito__cantidadN=document.createElement('div');
                var carrito__menosN=document.createElement('p');
                var carrito__numeroN=document.createElement('p');
                var carrito__masN=document.createElement('p');
                
                if(paraComprar!=null){
                    paraComprar.appendChild(carrito__productoN);
                    carrito__productoN.appendChild(carrito__imagenN);
                    carrito__productoN.appendChild(carrito__descripcionN);
                        carrito__descripcionN.appendChild(carrito__nombreN);
                        carrito__descripcionN.appendChild(carrito__precioN);
                        carrito__descripcionN.appendChild(carrito__categoriaN);
                            carrito__categoriaN.appendChild(carrito__logoN);
                    carrito__productoN.appendChild(carrito__opcionesN);
                        carrito__opcionesN.appendChild(carrito__eliminarN);
                        carrito__opcionesN.appendChild(carrito__cantidadN);
                            carrito__cantidadN.appendChild(carrito__menosN);
                            carrito__cantidadN.appendChild(carrito__numeroN);
                            carrito__cantidadN.appendChild(carrito__masN); 
                }

                carrito__productoN.className= 'carrito__producto';
                carrito__imagenN.className= 'carrito__imagen';
                carrito__descripcionN.className= 'carrito__descripcion';
                carrito__nombreN.className= 'carrito__nombre';
                carrito__precioN.className= 'carrito__precio';
                carrito__categoriaN.className= 'carrito__categoria';
                carrito__logoN.className= 'carrito__game';
                carrito__logoN.className= 'fas fa-gamepad';
                carrito__opcionesN.className= 'carrito__opciones';
                carrito__eliminarN.className= 'carrito__eliminar far fa-times-circle';
                carrito__cantidadN.className= 'carrito__cantidad';
                carrito__menosN.className= 'carrito__menos';
                carrito__numeroN.className= 'carrito__numero';
                carrito__masN.className= 'carrito__menos';
                
                
               
                carrito__imagenN.style.backgroundImage='url('+producto.imagen+')';
                carrito__nombreN.innerHTML=producto.nombre;
                carrito__precioN.innerHTML='$'+producto.precio;
                carrito__categoriaN.innerHTML=producto.categoria;
                carrito__menosN.innerHTML='-';
                carrito__numeroN.innerHTML='1';
                carrito__masN.innerHTML='+';


                //Eliminar del carrito
                carrito__eliminarN.addEventListener('click',function(){
                    listaProductos.splice(index,1);
                    carrito__productoN.remove();

                    actualizarCarrito();

                });

                //Total de la compra
                suma+= parseInt(producto.precio);
                if(totalCompra!=null && subtotalCompra!=null){
                subtotalCompra.innerHTML="$"+suma;
                totalCompra.innerHTML="$"+suma;
                }

        });

        if(totalCompra!=null && subtotalCompra!=null){
            totalCompra.innerHTML="$"+suma;
            subtotalCompra.innerHTML="$"+suma;
        }
    }
        
    actualizarCarrito();
    //Funcion que recorre los botones
    function tiendaBotones (btn){
        
        btn.addEventListener("click" , function(){ 
            var padre = btn.parentNode.parentNode;
            var nombre=  padre.querySelector(".nombre").value;
            var precio=  padre.querySelector(".precio").value;
            var categoria=  padre.querySelector(".categoria").value;
            var imagen=  padre.querySelector(".producto__img").style.backgroundImage;
            var imagenUrl = imagen.replace('url(','').replace(')','');
            var textoMas= padre.querySelector('.texto__mas');
            var masTienda=padre.querySelector('.mas-tienda');

            var producto ={
                nombre:nombre,
                precio:precio,
                categoria:categoria,
                imagen:imagenUrl,
            };

            listaProductos.push(producto);
            actualizarCarrito();
            console.log(producto.precio);
            //Animacion GSAP cuando se agrega al carrito
            var tl3 = new TimelineMax();
            var tl=new TimelineMax();
            tl.add( TweenMax.to(btn, 0.7, {width:"30%",ease: Bounce.easeOut}) );
            tl3.add( TweenMax.to(masTienda, 1.3, {rotation:180,scale:1.2,ease: Bounce.easeOut}) );
            tl3.add( TweenMax.to(masTienda, 0.8, {scale:0,display:"none",ease: Bounce.easeOut}) );
            tl3.add( TweenMax.to(textoMas, 0.1, {scale:0,ease: Bounce.easeOut}) );
            tl3.add( TweenMax.to(textoMas, 0.5, {scale:1,display:"block",ease: Bounce.easeOut}) );
            tl3.add( TweenMax.to(btn, 0.8, {backgroundColor:"#A5E879",ease: Power2.easeOut}) );

        });
    }

    if(tienda_agregar!=null){
    tienda_agregar.forEach(tiendaBotones);
    }

    //Botones detalles
    function detallesBotones (btn){
        

        btn.addEventListener("click" , function(){ 
            var nombre=  document.querySelector(".detalles__nombre").innerHTML;
            var precio=  document.querySelector(".detalles__pre").value;
            var categoria=  document.querySelector(".detalles__categoria").value;
            var imagen=  document.querySelector(".descripcion__imagen").style.backgroundImage;
            var imagenUrl = imagen.replace('url(','').replace(')','');

            

            var producto ={
                nombre:nombre,
                precio:precio,
                categoria:categoria,
                imagen:imagenUrl,
            };

            listaProductos.push(producto);
            actualizarCarrito();
            console.log(producto.precio);

        });
    }

    if(detalles_agregar!=null){
    detalles_agregar.forEach(detallesBotones);
    }

    //Enviar pedido de productos
    var formulario=document.querySelector('.form');
    function enviarValorTotal(event){
        var valorTotal=document.querySelector('.valorTotal');
        valorTotal.value=totalCompra.innerText;
    }
    function enviarPedidos(event){
        var pedidos=document.querySelector('.pedidos');
        pedidos.value=localStorage.getItem('listaProductos');
        localStorage.removeItem('listaProductos');
    }
    if(formulario!=null){
        formulario.addEventListener('submit',enviarValorTotal);
        formulario.addEventListener('submit',enviarPedidos);
    }
    
});