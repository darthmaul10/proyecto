const carrito = document.querySelector('#exampleModal');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];


cargarEventListener();

function cargarEventListener() {
	//cuando precionamos el boton agregar al carrito
	listaProductos.addEventListener('click', agregarCarrito);

	//eliminar articulo del carrito
	carrito.addEventListener('click', eliminarArticulo);

	//vaciar carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = [];

		limpiarHTMLCarrito();
	});

}

function agregarCarrito(e) {
	e.preventDefault();

	//si el presionado contine producto-p
	if (e.target.classList.contains('producto-p')) {

		const productoSeleccionado = e.target.parentElement.parentElement;


		leerDatosProductos(productoSeleccionado);

		alert('Producto Agregado al carrito')
	}
}

//eliminar el curso del carrito
function eliminarArticulo(e) {
	e.preventDefault();

	if (e.target.classList.contains('bi-trash')) {
		const articuloId = e.target.parentElement.getAttribute('data-id');

		//eliminar del arreglo de articulosCarrito por el data-id

		articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);

		carritoHTML();
	}
}


//lee a lo que le dimos click

function leerDatosProductos(producto) {



	const infoProducto = {
		imagen: producto.querySelector('img').src,
		nombre: producto.querySelector('h3').textContent,
		precio: producto.querySelector('.precio').textContent,
		id: producto.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	//revisa si un elemento ya existe en el carrito

	const existe = articulosCarrito.some(articulo => articulo.id === infoProducto.id)

	if (!existe) {
		//agregando producto al carrito
		articulosCarrito.push(infoProducto);
	} else {
		const articulos = articulosCarrito.map(articulo => {
			if (articulo.id === infoProducto.id) {
				articulo.cantidad++
				return articulo;
			} else {
				return articulo;
			}
		});
		articulosCarrito = [...articulos]
	}
	carritoHTML();
}

//mostrar el carrito de compras
function carritoHTML() {

	//limpiar html antes de recorrer el carrito
	limpiarHTMLCarrito()
	let total = 0;

	//recorre el carrito y genera el html
	articulosCarrito.forEach(articulo => {
    
		const {
			imagen,
			nombre,
			precio,
			id,
			cantidad
		} = articulo;
		const fila = document.createElement('tr');
		fila.innerHTML = `
    <td> <img src="${imagen}" alt="imagen producto" width="100" > </td>
    <td> ${nombre}</td>
    <td> ${precio}</td>
    <td> ${cantidad}</td>
    <td> <a href="#" data-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg></a></td>
    `;

		total += parseInt(precio) * parseInt(cantidad);
		//agrego el html del carrito al body de la table carrito

		contenedorCarrito.appendChild(fila);
	});

	//agregando el total
	let totalRow = document.createElement('tr');
	totalRow.innerHTML = `<td scope="row" > Total:  ${total}</td>`
	contenedorCarrito.appendChild(totalRow);

}

function limpiarHTMLCarrito() {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}

}