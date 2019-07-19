var pedidos = pedidos || {}
var url = "localhost:8080/pedidos";

 pedidos.vista = (function (){

    function init(){
        console.log("Comienza Pedidos")
        limpiarCampos();
    }

    function crearPedido(){
        if(validarCampos){
            pedidos.service.enviarPedido();
        }
    }

    function validarCampos(){
        return true;
    }

    function limpiarCampos(){

    }

    return{
        init:init
    }
}());


pedidos.service = (function (){

    function enviarPedido(){

        pedido = {
            "nombre": "ps4",
            "monto":"10",
            "descuento":"5"
            }

        $.ajax({
            method: "POST",
            url: url+"/guardar",
            data: pedido
          })
            .done(function( resultado ) {
              
            });
    }

   
    return{
        enviarPedido:enviarPedido
    }
}());