//El botón agregar inicia la función addproduct
document.getElementById('cart').addEventListener('submit', addproduct);
//Esta función toma el nombre y el valor ingresado en el formulario y los guarda en el localStorage
function addproduct(x) {
    x.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;

    let producto = {
        nombre,
        precio
    }

    if (localStorage.getItem('productos') === null) {

        let productos = [];
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    } else {
        let productos = JSON.parse(localStorage.getItem('productos'))
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
    read();
    document.getElementById('cart').reset();

}
//La función read lee los "productos" y los inserta en el html
function read() {

    let productos = JSON.parse(localStorage.getItem('productos'));

    document.getElementById('tbody').innerHTML = "";
    //Agrego un condicional if para que cuando se ejecute solo si no está vacio para evitar errores en consola
    if (productos != null) {
        for (let i = 0; i < productos.length; i++) {

            let nombre = productos[i].nombre;
            let precio = productos[i].precio;

            document.getElementById('tbody').innerHTML +=
                `
        <tr>
            <td>${nombre}</td>
            <td>${precio}</td>
        </tr>
            `
        }
    }
}

//Limpia el localStorage y vuelve a ejecutar la función read para limpiar el html
const btnClear = document.getElementById('vaciar-carrito');
btnClear.addEventListener('click', () => {
    localStorage.clear();
    read();
})