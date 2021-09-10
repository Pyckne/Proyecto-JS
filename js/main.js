//Declaro el carrito y el total de la compra
let carritoCompra = [];
let totalCompra = 0;
//Creo los objetos de mi tienda
const tiendaRopa = [
    producto1 = {
        id: 1,
        nombre: 'pantalon',
        precio: 1000,
    },
    producto2 = {
        id: 2,
        nombre: 'buzo',
        precio: 1200,
    },
    producto3 = {
        id: 3,
        nombre: 'campera',
        precio: 1800,
    },
    producto4 = {
        id: 4,
        nombre: 'remera',
        precio: 800,
    }
];

//Función que agrega producto al carrito
function aniadirAlCarrito(producto) {

    carritoCompra.push(producto);
}

/*function removerProducto(array, producto) {

    array.splice(producto, 1)
}
removerProducto(carritoCompra, producto4) */
//Calcula el total sumando el precio de todos los productos en el carrito
function calcularTotal() {

    for (let i = 0; i < carritoCompra.length; i++) {
        totalCompra = totalCompra + carritoCompra[i].precio
    }
    return totalCompra.toFixed(2)
}


//Le pedimos que ingrese el nombre para saludarlo
alert("Bienvenido a Moon Shop \n¡Lo estabamos esperando!")
let nombre = prompt("Por favor ingresa tu nombre")


//Se crea la función compraRopa que toma el nombre lo saluda y pide que ingrese el número del producto y lo agrega al carrito 
function compraRopa() {

    let productoElegido = prompt(`Hola ${nombre}. Porfavor ingresa el número del producto elegido
    Seleccione uno de nuestros productos:
    1. Pantalon
    2. Buzo
    3. Campera
    4. Remera
    `)

    switch (parseInt(productoElegido)) {
        case 1:
            aniadirAlCarrito(producto1);
            break;
        case 2:
            aniadirAlCarrito(producto2);
            break;
        case 3:
            aniadirAlCarrito(producto3);

            break;
        case 4:
            aniadirAlCarrito(producto4);
            break;
        default:
            alert('Ingresó un caracter inválido')
            compraRopa();
            break;
    }

}
compraRopa();

//Declaramos las variables para seguir comprando
let elijeMasProductos = prompt("Quiere seguir comprando ? Si o No")
let confirmaMasProductos = elijeMasProductos.toUpperCase();

//Se incorpora el ciclo while para poder agregar la cantidad que se desea al producto
while (confirmaMasProductos == "SI") {
    do {
        compraRopa();

        elijeMasProductos = prompt("Quiere seguir comprando ? Si o No")
        confirmaMasProductos = elijeMasProductos.toUpperCase();

    } while (confirmaMasProductos == "SI")
}
//Declaro la constante nombre que trae todos los nombres dentro de carrito
const nombres = carritoCompra.map(carritoCompra => carritoCompra.nombre);
//Por último inicializamos la función calcular total
calcularTotal();
iniciar();
//Mostramos el total de la compra y los nombres del carrito
console.log(`Su carrito contiene los siguientes productos: ${nombres}`);


//Simulador para agregar iva, aplicar descuento y cuotificar el valor de la compra.
function iniciar() {

    let valorDelProducto = totalCompra;
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
                case 18:
                    valorCuotas = (valorFinal * 1.20) / 18;
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
            alert("¡Pago exitoso! Disfrute su compra." + "Felecitaciones el valor de su compra es: " + valorFinal.toFixed(2));

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