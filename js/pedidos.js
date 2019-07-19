var pedidos = pedidos || {}
var url = "localhost:8080/pedidos";

 pedidos.vista = (function (){
     var mensajes;
    function init(){
        console.log("Comienza Pedidos")
        limpiarCampos();
    }

    function crearPedido(){
        if(validarCampos()){
            pedidos.service.enviarPedido();
        }else{
            mostrarValidaciones();
        }
    }

    function validarCampos(){
        let nombre = document.getElementById("nombre").value;
        let monto = document.getElementById("monto").value;
        let esValido =true
        mensajes = [];

        if(nombre === "" ){
            $('#nombre').addClass('error');
            mensajes.push("El campo nombre es obligatorio.");
            esValido = false;
        }else if (nombre.length > 100) {
            $('#nombre').addClass('error');
            errores.push("El campo nombre no puede ser mayor a 100 caracteres.");
            esValido = false;
        }

        if (monto === "" ){
            $('#monto').addClass('error');
            mensajes.push("El campo monto es obligatorio.");
            esValido= false;
        }

        return esValido;
    }

     function mostrarValidaciones() {
         mensajes.forEach(function (value, index, array) {
             $('#div-mensajes').append("<p>"+ value+"</p>");
         });
         $('#div-mensajes').addClass('alert-warning');
         $('#div-mensajes').removeClass('oculto');
    }

    function mostrarError(error){
        $('#div-mensajes').append("<p> Ocurrio un error al intentar crear el pedido</p>");
        $('#div-mensajes').addClass('alert-danger');
        $('#div-mensajes').removeClass('oculto');
    }

    function mostrarExito(){
        $('#div-mensajes').append("<p> Se creo el pedido exitosamente! </p>");
        $('#div-mensajes').addClass('alert-success');
        $('#div-mensajes').removeClass('oculto');
    }

    function limpiarCampos(){
        document.getElementById("nombre").innerHTML = "";
        document.getElementById("monto").innerHTML = "";
        document.getElementById("descuento").innerHTML = "";
    }

    function resetMensajes(){
        $('input').removeClass('error');
        $('#div-mensajes').addClass('oculto');
        $('#div-mensajes').empty()
        $('#div-mensajes').removeClass('alert-danger');
        $('#div-mensajes').removeClass('alert-warning');
        $('#div-mensajes').removeClass('alert-success');
    }


    return{
        init:init,
        crearPedido:crearPedido,
        resetMensajes: resetMensajes,
        mostrarExito: mostrarExito,
        mostrarError: mostrarError
    }
}());


pedidos.service = (function (){

    function enviarPedido(){
        pedidos.vista.resetMensajes();
        pedido = generarPedido();

        $.ajax({
            method: "POST",
            url: url+"/guardar",
            data: pedido
          })
            .done(function( resultado ) {
                  if(resultado){
                    console.log('Exito');
                      pedidos.vista.mostrarExito()
                  }else{
                      pedidos.vista.mostrarError();
                  }
            }).fail(function (error) {
                pedidos.vista.mostrarError();
            });
    }

    function generarPedido(){
        return { "nombre": document.getElementById("nombre").value,
            "monto": document.getElementById("monto").value,
            "descuento": document.getElementById("descuento").value}
    }
   
    return{
        enviarPedido:enviarPedido
    }
}());