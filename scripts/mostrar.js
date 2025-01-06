document.addEventListener('DOMContentLoaded', function() {
    // Obtener el contenedor de la lista de productos
    const productList = document.getElementById('product-list');
    
    // Recuperar productos almacenados en el localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Función para agregar productos al carrito
    function addToCart(product) {
        // Recuperar carrito existente o crear uno nuevo
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Verificar si el producto ya existe en el carrito
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            // Si el producto existe, aumentar la cantidad
            cart[existingProductIndex].quantity += 1;
        } else {
            // Si el producto es nuevo, agregarlo con cantidad 1
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mostrar una alerta de confirmación
        alert('¡Producto agregado al carrito!');
        
        // Actualizar contador del carrito
        actualizarContadorCarrito();
    }
    
    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const contadorCarrito = document.getElementById('cart-counter');
        
        if (contadorCarrito) {
            // Calcular cantidad total de productos
            const cantidadTotal = cart.reduce((total, producto) => total + producto.quantity, 0);
            contadorCarrito.textContent = cantidadTotal;
            contadorCarrito.style.display = cantidadTotal > 0 ? 'inline-block' : 'none';
        }
    }
    
    // Si no hay productos
    if (storedProducts.length === 0) {
        productList.innerHTML = '<p class="text-center">No hay productos subidos aún.</p>';
        return;
    }
    
    // Renderizar productos con botón de compra
    productList.innerHTML = storedProducts.map(product => `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text text-muted">Categoría: ${product.category}</p>
                    <p class="card-text fw-bold">Precio: S/.${product.price.toFixed(2)}</p>
                    <button 
                        class="btn btn-primary mt-auto buy-btn" 
                        data-product-id="${product.id}"
                    >
                        <i class="fas fa-cart-plus me-2"></i>Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
   
});
