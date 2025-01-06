class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.modal = null;
        this.init();
    }

    init() {
        // Inicializar el modal de Bootstrap
        this.modal = new bootstrap.Modal(document.getElementById('cartModal'), {
            keyboard: true,
            backdrop: true
        });

        // Inicializar eventos
        this.initializeEvents();
        this.updateTotal();
        this.updateUI();
    }

    initializeEvents() {
        // Evento para el botón de comprar
        document.addEventListener('click', (e) => {
            const buyButton = e.target.closest('.buy-btn');
            if (buyButton) {
                const productId = buyButton.dataset.productId;
                const products = JSON.parse(localStorage.getItem('products')) || [];
                const product = products.find(p => p.id === productId);
                
                if (product && product.stock > 0) {
                    this.addItem(product);
                    const toast = new bootstrap.Toast(document.getElementById('addedToCartToast'));
                    toast.show();
                }
            }
        });

        // Eventos del carrito
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                if (!cartItem) return;

                const productId = cartItem.dataset.id;

                if (e.target.classList.contains('increase-quantity')) {
                    const input = cartItem.querySelector('.quantity-input');
                    this.updateQuantity(productId, parseInt(input.value) + 1);
                } else if (e.target.classList.contains('decrease-quantity')) {
                    const input = cartItem.querySelector('.quantity-input');
                    this.updateQuantity(productId, parseInt(input.value) - 1);
                } else if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                    this.removeItem(productId);
                }
            });

            cartItems.addEventListener('change', (e) => {
                if (e.target.classList.contains('quantity-input')) {
                    const cartItem = e.target.closest('.cart-item');
                    this.updateQuantity(cartItem.dataset.id, parseInt(e.target.value));
                }
            });
        }

        // Evento para mostrar el carrito
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                this.updateUI();
                this.modal.show();
            });
        }

        // Evento para el botón de pago
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    alert('El carrito está vacío');
                    return;
                }
                this.checkout();
            });
        }

        // Evento para cerrar el modal
        const modalElement = document.getElementById('cartModal');
        if (modalElement) {
            modalElement.addEventListener('hidden.bs.modal', () => {
                // Limpiar cualquier estado pendiente si es necesario
                this.updateUI();
            });
        }
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.updateTotal();
        this.saveCart();
        this.updateUI();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
        this.updateUI();
    }

    updateQuantity(productId, quantity) {
        quantity = Math.max(0, parseInt(quantity));
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.updateTotal();
                this.saveCart();
                this.updateUI();
            }
        }
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateUI() {
        // Actualizar contador del carrito
        const cartCounter = document.getElementById('cart-counter');
        const itemCount = this.items.reduce((total, item) => total + item.quantity, 0);
        
        if (cartCounter) {
            cartCounter.textContent = itemCount;
            cartCounter.style.display = itemCount > 0 ? 'inline-block' : 'none';
        }

        // Actualizar lista de items
        const cartItemsList = document.getElementById('cart-items');
        if (cartItemsList) {
            if (this.items.length === 0) {
                cartItemsList.innerHTML = '<p class="text-center p-3">El carrito está vacío</p>';
            } else {
                cartItemsList.innerHTML = this.items.map(item => `
                    <div class="cart-item p-3" data-id="${item.id}">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid me-3" style="width: 80px; height: 80px; object-fit: cover;">
                            <div class="flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <p class="mb-1">Precio: $${item.price.toFixed(2)}</p>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-sm btn-outline-secondary decrease-quantity">-</button>
                                    <input type="number" value="${item.quantity}" min="1" 
                                           class="form-control form-control-sm mx-2 quantity-input" 
                                           style="width: 60px;">
                                    <button class="btn btn-sm btn-outline-secondary increase-quantity">+</button>
                                </div>
                            </div>
                            <div class="ms-auto text-end">
                                <p class="mb-1">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                                <button class="btn btn-sm btn-danger remove-item">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Actualizar total
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    async checkout() {
        if (this.items.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        window.location.href = 'pago.html';
    }
}

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.shoppingCart = new ShoppingCart();
});