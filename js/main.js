//Simulador para agregar iva, aplicar descuento y cuotificar el valor de una compra.
function iniciar() {

    alert("¡Bienvenido al simulador de compras!")

    //Pedimos que ingrese el valor del producto
    let valorDelProducto = parseInt(prompt("Ingrese el valor del producto" + "\n\nRecordá que tenemos 15% de descuento en compras mayores a 2500 pesos."));
    let valorFinal = 0;

    //Si no es un número se lo informamos mediante alert, en el caso que sea un número inicimaos la función promoDescuento.
    if (isNaN(valorDelProducto)) {
        alert("El dato ingresado es invalido o no es un número");
    } else {
        promoDescuento(valorDelProducto);
    }

    //Es inicializada por promoDescuento y agrega iva al valor del producto.
    function agregarIva(valorDelProducto) {
        let valorConIva = valorDelProducto * 1.21;
        console.log("El valor más iva es: " + valorConIva.toFixed(2));
        return valorConIva;
    }

    //Se inicia por la función comoAbona y en base a la cantidad de cuotas ingresadas le agrega una recarga tomando como valor del producto la variable valorFinal.
    function cuotificarValor(numeroDeCuotas) {
        //Ciclo while para aplicar cuotas
        let valorCuotas = 0;
        while (numeroDeCuotas != 0) {

            switch (numeroDeCuotas) {
                case 1:
                    alert("Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2));
                    break;
                case 3:
                    valorCuotas = valorFinal / 3;
                    console.log(valorCuotas.toFixed(2));
                    alert("Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2) + "\nEl valor de cada cuota es de es: " + valorCuotas.toFixed(2));
                    break;
                case 6:
                    valorCuotas = (valorFinal * 1.05) / 6;
                    console.log(valorCuotas.toFixed(2));
                    alert("Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2) + "\nEl valor de cada cuota es de es: " + valorCuotas.toFixed(2));
                    break;
                case 9:
                    valorCuotas = (valorFinal * 1.10) / 9;
                    console.log(valorCuotas.toFixed(2));
                    alert("Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2) + "\nEl valor de cada cuota es de es: " + valorCuotas.toFixed(2));
                    break;
                case 12:
                    valorCuotas = valorFinal / 12;
                    console.log(valorCuotas.toFixed(2));
                    alert("Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2) + "\nEl valor de cada cuota es de es: " + valorCuotas.toFixed(2));
                    break;
                default:
                    console.log("Número de cutoas no válido")
                    alert("Recordá que podés hacerlo en 1, 3, 6, 9, 12 y 18 cuotas" + "\n Para salir ingrese 0")
                    break;
            }
            numeroDeCuotas = parseInt(prompt("Para salir ingrese 0" + "\n\nSi quiere cambiar la cantidad de cuotas recuerde que puede hacerlo en 1, 3, 6, 9, 12 y 18 cuotas"));
        }
    }

    //La inicializa promoDescuento una vez que aplica iva al valor del producto y le consulta al usuario como desea abona, en caso de selecionar Crédito incia la función cuotificar valor
    function comoAbona() {
        let debitoCredito = parseInt(prompt("¿Cómo desa abonar? \n\nIngrese 1 si desea abonar con efectivo o debito \nIngrese 2 si desea abonar con tarjeta de crédito"));
        if (debitoCredito == 1) {
            alert("¡Pago exitoso! Disfrute su compra.");

        } else if (debitoCredito == 2) {
            let numeroDeCuotas = parseInt(prompt("Ingresa la cantidad de cuotas. \nRecargo por cuota: \n- 1, 3 y 12 cuotas sin interés \n- 6 cuotas 5% de interés \n- 9 cuotas 10% de interés \n- 18 cuotas 20% de interés"));
            cuotificarValor(numeroDeCuotas);

        } else {
            debitoCredito = parseInt(prompt("Ingreso un número o caracter inválido \n\nIngrese 1 si desea abonar con efectivo o debito \nIngrese 2 si desea abonar con tarjeta de crédito"));
            comoAbona(debitoCredito)
        }

    }

    /*Comprueba el valor ingresado para aplicar el descuento y al resultado le aplica la función iva.
    Caundo finaliza el boolean asigna el valor más decuento e iva a nuevoValor e inicia la función comoAbona */
    function promoDescuento() {
        let nuevoValor = 0;
        if (agregarIva(valorDelProducto) >= 2500) {
            nuevoValor = agregarIva(valorDelProducto) * 0.85;
        } else {
            nuevoValor = agregarIva(valorDelProducto);
        }
        alert("El valor total es: " + nuevoValor.toFixed(2));
        valorFinal = nuevoValor;
        comoAbona();
    }

}

//Se inicia la función para comenzar el proceso
iniciar()