const productos = [ 

    /* Gabinetes */

    {id: 1, nombre: "Corsair_4000d",precio: 250.00},
    {id: 2, nombre: "Corsair_2500d", precio: 300.00},
    {id: 3, nombre: "Corsair_Carbide", precio: 200.00},
    {id: 4, nombre: "Corsair_4000d_v2", precio: 190.00},

    /* Memorias */

    {id: 5, nombre: "adata_16gb", precio: 59.999},
    {id: 6, nombre: "adata_xpg_16gb", precio: 79.999},
    {id: 7, nombre: "adata_xpg-rgb_16gb", precio: 129.999},
    {id: 8, nombre: "kingston_fury_16gb", precio: 89.999},

    /* Monitores */

    {id: 9, nombre: "Viewsonic_27_qhd", precio: 199.999},
    {id: 10, nombre: "Lg_ultragear_27_fhd", precio: 229.999,},
    {id: 11, nombre: "Lg_ultraGear_32_qhd", precio: 259.999},
    {id: 12, nombre: "Samsung_odyssey_25fhd", precio: 189.999},

    /* Motherboard */

    {id: 13, nombre: "Asus_tuf", precio: 219.999},
    {id: 14, nombre: "Gigabyte_b840m", precio: 219.999},
    {id: 15, nombre: "Gigabyte_b850m", precio: 249.999},
    {id: 16, nombre: "Msi_z890", precio: 189.999},

    /* Placa de video */

    {id: 17, nombre: "Gigabyte_5060ti", precio: 419.999},
    {id: 18, nombre: "MSI_5090", precio: 729.999},
    {id: 19, nombre: "MSI_5050", precio: 329.999},
    {id: 20, nombre: "Gigabyte_RTX_5070", precio: 489.999},

    /* Teclado y Mouse */

    {id: 21, nombre: "NKB_68", precio: 119.999},
    {id: 22, nombre: "RedDragon_d1900", precio: 129.999},
    {id: 23, nombre: "Shenlong_4000x", precio: 159.999},
    {id: 24, nombre: "Logitech_G502", precio: 89.999}
]

let carrito = [];

content.append(agregar);

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => producto.id === idProducto);
    
    if (producto) {
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.id === idProducto);
        
        if (productoEnCarrito) {
            // Si ya existe, aumentar la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si no existe, agregarlo con cantidad 1
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }
        
        actualizarCarrito();
        guardarCarrito();
        mostrarNotificacion('Producto agregado al carrito');
    }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
    guardarCarrito();
}

// Función para actualizar cantidad
function actualizarCantidad(idProducto, nuevaCantidad) {
    const producto = carrito.find(item => item.id === idProducto);
    
    if (producto) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(idProducto);
        } else {
            producto.cantidad = nuevaCantidad;
            actualizarCarrito();
            guardarCarrito();
        }
    }
}

// Función para calcular el total
function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito-items');
    const totalElement = document.getElementById('carrito-total');
    const contadorElement = document.getElementById('carrito-contador');
    
    if (!carritoContainer) return;
    
    // Limpiar contenido
    carritoContainer.innerHTML = '';
    
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (contadorElement) {
        contadorElement.textContent = totalItems;
        contadorElement.style.display = totalItems > 0 ? 'block' : 'none';
    }
    
    // Mostrar productos en el carrito
    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrito-item';
            itemElement.innerHTML = `
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="carrito-item-precio">$${item.precio.toLocaleString('es-CO')}</p>
                </div>
                <div class="carrito-item-cantidad">
                    <button onclick="actualizarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="actualizarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                </div>
                <button class="carrito-item-eliminar" onclick="eliminarDelCarrito(${item.id})">
                    ✕
                </button>
            `;
            carritoContainer.appendChild(itemElement);
        });
    }
    
    // Actualizar total
    if (totalElement) {
        const total = calcularTotal();
        totalElement.textContent = `$${total.toLocaleString('es-CO')}`;
    }
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        actualizarCarrito();
        guardarCarrito();
    }
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 100);
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => notificacion.remove(), 300);
    }, 2000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito guardado
    cargarCarrito();
    
    // Agregar event listeners a los botones de agregar
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const idProducto = parseInt(boton.getAttribute('data-id'));
            agregarAlCarrito(idProducto);
        });
    });
    
    // Event listener para el botón de vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
});