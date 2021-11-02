//Creamos el carrito de compras
let carrito = {};

//Evento que carga el iniciar la página e inicia la promesaJson
$(document).ready(async() => {
    promesaJson();
    //Intenta obtener carrito en localStorage en caso de existir inicia la función insertarCarrito para cargar los productos
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarrito();
    }
});

//Evento del boton Agregar al carrito
$("#cards").click((e) => {
    aniadirAlCarrito(e);
})

//Evento de los botones del carrito + -
$("#items").click((e) => {
    btnMasMenos(e);
})

//Evento del filtro
$(document).ready(() => {
    searchBtn(".search", ".card-container")
})



/*Promesa para obtener los datos del archivo products.json en caso de conseguirlo inicia la función 
insertarCarrito para crear las cards con los datos obtenidos en caso de no poder imprime por consola */
const promesaJson = async() => {
    const Testjson = "src/data/products.json";
    $.getJSON(Testjson, function(respuesta, estado) {
        if (estado === "success") {
            const data = respuesta;
            insertarCards(data);
        }
    })
}

//Creamos dinámicamente los productos de la página
const insertarCards = data => {
    data.forEach(product => {

        $("#cards").append(`<div class="card-container col d-flex justify-content-center mb-4">
    <div class="card shadow mb-1 rounded">
    <img src="${product.image}" alt="..." class="card-img-top">
    <div class="card-body"><h5>${product.title}</h5>
    <p class="product-description">${product.description}</p>
    <p class="product-price">${product.price}</p>     
    <button data-id="${product.id}"class="btn btn-dark w-100">Agregar al carrito</button>
    </div>
    </div>
    </div>`);
    })
};

/* Capturamos todos los clicks en las cartas y mediante un boolean tomamos 
solo los que contengan la clase btn-dark en este caso el botón agregar al 
carrito que le asignamos un datset.id y lo agregamos al carrito*/
const aniadirAlCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        infParaCarrito(e.target.parentElement)

        //Alerta indicando que se agregó el producto al carrito
        $('.hide').slideDown(700, function() {
            $('.hide').fadeOut(700);
        });

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
    $("#items").empty();
    //Insertamos dinamicamente los productos del carrito
    Object.values(carrito).forEach(product => {

        $("#items").append(`<tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.cantidad}</td>
        <td>
            <button data-id="${product.id}" class="btn btn-info btn-sm">
                +
            </button>
            <button data-id="${product.id}" class="btn btn-danger btn-sm">
                -
            </button>
        </td>
        <td>$ <span>${product.cantidad * product.price}</span></td>
      </tr>`);

    })

    //Inicia la función para insertar el footer del carrito
    insertarFooter();

    //Almacena en el local storage el carrito para preservar la información
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Footer de la tabla donde se muestran los totales
const insertarFooter = () => {
    //Limpia los productos del footer carrito para que spread operator no nos cree duplicados y elimina el botón de pagar en caso de ser creado
    $("#total").empty();
    $('#payment').empty();
    //Mediante un boolean comprobamos si el carrito está vacio en caso de ser verdadero insertamos el texto correspondiente
    if (Object.keys(carrito).length === 0) {
        $("#total").append(`<th scope="row" colspan="5">¡Su carrito se encuentra vacío!</th>`);
        return;
    }
    // Definimos la cantidad total de productos que va a ser igual a la suma de la columna cantidad de cada producto del carrito
    const totalProductos = Object.values(carrito).reduce((i, { cantidad }) => i + cantidad, 0);
    //Definimos el precio final al igual que el paso anterior solo que en este caso multiplicamos la cantidad por el precio de cada producto del carrito
    const totalPrices = Object.values(carrito).reduce((i, { cantidad, price }) => i + cantidad * price, 0);
    //Inserta el total del producto
    $("#total").append(`<th scope="row" colspan="2">Total productos</th>
        <td></td>
        <td>${totalProductos}</td>
        <td>
            <button class="btn btn-danger btn-sm" id="vaciar-carrito">
                vaciar todo
            </button>
        </td>
        <td class="font-weight-bold">$ <span>${totalPrices}</span></td>`);

    //Inserta el botón pagar
    $("#payment").append(`<th scope="row" colspan="2"></th>
        <td></td>
        <td></td>
        <td></td>
        <td class="font-weight-bold"><button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#paymentModal" id="vaciar-carrito">
        Pagar
    </button> </td>`);

    //Evento que toma cuando el usuario hace click en el boton
    $("#vaciar-carrito").click(() => {
        //Vacia el carrito e inicia la función insertarCarrito para que identifique que no existen objs y los elimine el html
        carrito = {};
        insertarCarrito();
        //Alerta indicando que se eliminaron todos los productos del carrito
        $('.remove-all').slideDown(700, function() {
            $('.remove-all').fadeOut(700);
        });
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
        $('.hide').slideDown(700, function() {
            $('.hide').fadeOut(700);
        });
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
        $('.remove').slideDown(700, function() {
            $('.remove').fadeOut(700);
        });
    }

    e.stopPropagation();
}

//Función que filtra las cards agregando o quitando display none
function searchBtn(input, selected) {

    document.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {
            document.querySelectorAll(selected).forEach(element =>
                //Para que sea Case sensitive le agregue el toLowerCase en ambos casos
                element.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ?
                element.classList.remove("d-none") :
                element.classList.add("d-none")
            );
        }
    })

}