//Guardamos los id de los contenedores donde se generará el html
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('total');
//Guardamos los id de los templates que se insertarán en el html
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
//Fragmento que va a crear dinamicamente en el html en base a los templates
const fragment = document.createDocumentFragment();
//Creamos el carrito de compras
let carrito = {};

//Evento que carga el iniciar la página e inicia la promesaJson
document.addEventListener('DOMContentLoaded', () => {
    promesaJson();
    //Intenta obtener carrito en localStorage en caso de existir inicia la función insertarCarrito para cargar los productos
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarrito();
    }
})

//Evento del boton Agregar al carrito
cards.addEventListener('click', e => {
    aniadirAlCarrito(e);
})

//Evento de los botones del carrito + -
items.addEventListener('click', e => {
    btnMasMenos(e);
})

/*Promesa para obtener los datos del archivo products.json en caso de conseguirlo inicia la función 
insertarCarrito para crear las cards con los datos obtenidos en caso de no poder imprime por consola */
const promesaJson = async() => {
    try {
        const res = await fetch('products.json');
        const data = await res.json();
        insertarCards(data);
    } catch (error) {
        console.log(error);
    }
}

//Creamos dinámicamente los productos de la página
const insertarCards = data => {
    data.forEach(producto => {
        //Con el querySelector tomamos el tag del html y le insertamos el valor correspondiente según el json
        templateCard.querySelector('h5').textContent = producto.title;
        templateCard.querySelector('.product-description').textContent = producto.description;
        templateCard.querySelector('.product-price').textContent = producto.price;
        templateCard.querySelector('img').setAttribute('src', producto.image);
        //Generamos el Id tomado desde el json asignandole al boton agregar al carrito
        templateCard.querySelector('.btn-dark').dataset.id = producto.id;
        //Clona las cartas con cada item dentro del json
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    //Inserta al html
    cards.appendChild(fragment);
}

/* Capturamos todos los clicks en las cartas y mediante un boolean tomamos 
solo los que contengan la clase btn-dark en este caso el botón agregar al 
carrito que le asignamos un datset.id y lo agregamos al carrito*/
const aniadirAlCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        infParaCarrito(e.target.parentElement)

        //Alerta indicando que se agregó el producto al carrito
        const alert = document.querySelector('.alert')

        setTimeout(function() {
            alert.classList.add('hide');
        }, 700)
        alert.classList.remove('hide');

    }
    e.stopPropagation();
}

//Tomamos la información de los valores del producto para agregar al carrito
const infParaCarrito = obj => {
    //Definimos el producto tomando los valores del template card generado correspondiente
    const producto = {
            id: obj.querySelector('.btn-dark').dataset.id,
            title: obj.querySelector('h5').textContent,
            description: obj.querySelector('.product-description').textContent,
            price: obj.querySelector('.product-price').textContent,
            cantidad: 1,
        }
        /*Mediante un boolean verificamos si el producto ya se encuentra en el carrito 
        y en lugar de pasarlo nuevamente solo sumamos 1 a la cantidad */
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad++;
    }
    /* Mediante el spread operator adquirimos la información del producto y agregamos al carrito 
    en caso de que no exista se crea y en el caso contrario se sobrescribe agregando el producto*/
    carrito[producto.id] = {...producto };
    //Inicia la función insertarCarrito()
    insertarCarrito();
}

//Crea dinamicamente el carrito
const insertarCarrito = () => {
    //Limpia los productos del carrito para que spread operator no nos cree duplicados
    items.innerHTML = '';
    //Con el querySelector tomamos el tag del html y le insertamos el valor correspondiente acorde cada carrito
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.description;
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad;
        //definimos el data set de los botones + -
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        //Multiplicamos la cantidad de producto por el precio para obtener el total individual por item
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price;
        //Clona las cartas con cada item dentro del json
        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })

    //Inserta al html
    items.appendChild(fragment);

    //Inicia la función para insertar el footer del carrito
    insertarFooter();

    //Almacena en el local storage el carrito para preservar la información
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Footer de la tabla donde se muestran los totales
const insertarFooter = () => {
    //Limpia los productos del footer carrito para que spread operator no nos cree duplicados
    footer.innerHTML = '';
    //Mediante un boolean comprobamos si el carrito está vacio en caso de ser verdadero insertamos el texto correspondiente
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">¡Su carrito se encuentra vacío!</th>';
        return;
    }
    // Definimos la cantidad total de productos que va a ser igual a la suma de la columna cantidad de cada producto del carrito
    const totalProductos = Object.values(carrito).reduce((i, { cantidad }) => i + cantidad, 0);
    //Definimos el precio final al igual que el paso anterior solo que en este caso multiplicamos la cantidad por el precio de cada producto del carrito
    const totalprices = Object.values(carrito).reduce((i, { cantidad, price }) => i + cantidad * price, 0);
    //Inserta el total del producto
    templateFooter.querySelectorAll('td')[1].textContent = totalProductos;
    templateFooter.querySelector('span').textContent = totalprices;
    //Al limpiar el html cada que se ejecuta hay que clonar el fragmento y crearlo nuevamente
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);
    //Definimos el botón vaciar toma el id vaciar-carrito
    const btnVaciar = document.getElementById('vaciar-carrito');
    //Evento que toma cuando el usuario hace click en el boton
    btnVaciar.addEventListener('click', () => {
        //Vacia el carrito e inicia la función insertarCarrito para que identifique que no existen objs y los elimine el html
        carrito = {};
        insertarCarrito();
        //Alerta indicando que se eliminaron todos los productos del carrito
        const alert = document.querySelector('.remove-all')

        setTimeout(function() {
            alert.classList.add('remove-all')
        }, 700)
        alert.classList.remove('remove-all')
    })
}

//Botón obtenido por evento click en botones del carrito + -
const btnMasMenos = e => {
    /* Aumentamos o disminuimos cantidad de productos identificando la clase btn-info y btn-danger al finalizar los boolean 
    siempre se ejecuta insertarCarrito para que vuelva a insertar el html en caso de corresponder */
    if (e.target.classList.contains('btn-info')) {
        //La constante producto que toma como target el id del producto y suma +1 a la cantidad
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        //Mediante el spread operator vuelve a crear el carrito con la información actualizada
        carrito[e.target.dataset.id] = {...producto };
        insertarCarrito();
        //Alerta indicando que se agregó el producto al carrito
        const alert = document.querySelector('.alert')

        setTimeout(function() {
            alert.classList.add('hide');
        }, 700)
        alert.classList.remove('hide');
    } else if (e.target.classList.contains('btn-danger')) {
        //La constante producto que toma como target el id del producto y resta -1 a la cantidad
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--;
        //En este caso agregamos otro boolean en caso de que la cantidad del producto sea igual a 0 lo eliminamos del producto
        if (producto.cantidad === 0) {

            delete carrito[e.target.dataset.id];
        }
        insertarCarrito();
        //Alerta indicando que se eliminó el producto del carrito
        const alert = document.querySelector('.remove')

        setTimeout(function() {
            alert.classList.add('remove')
        }, 700)
        alert.classList.remove('remove')
    }

    e.stopPropagation();
}




//Me queda agregar un boton de pagar y refactorizar las funciones de modo de pago, cuotificar y descuento.

/* //Total de la compra
let totalCompra = 0;

//Por último inicializamos la función calcular total y posteriormente la 
calcularTotal();
simuladorCoutificar();
//Mostramos el total de la compra y los nombres del carrito
console.log(`Su carrito contiene los siguientes productos: ${nombres}`);


//Simulador para agregar iva, aplicar descuento y cuotificar el valor de la compra.
function simuladorCoutificar() {

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
 */
/*Comprueba el valor ingresado para aplicar el descuento y al resultado le aplica la función iva.
Caundo finaliza el boolean asigna el valor más decuento e iva a nuevoValor e inicia la función comoAbona */
/* function promoDescuento() {
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

} */