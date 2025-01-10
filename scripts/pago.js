document.addEventListener('DOMContentLoaded', function() {
    // Recuperar carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const yapeQR = document.getElementById('yape-qr');
    const confirmButton = document.getElementById('confirm-payment');

    // Mostrar items del carrito
    function displayCartItems() {
        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="summary-item">
                    <div class="product-details">
                        <span class="product-name">${item.name}</span>
                        <br>
                        <small>Cantidad: ${item.quantity}</small>
                    </div>
                    <span>S/. ${itemTotal.toFixed(2)}</span>
                </div>
            `;
        }).join('');

        totalAmount.textContent = `S/. ${total.toFixed(2)}`;
    }

    // Manejar selección de método de pago
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remover clase active de todos los métodos
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Agregar clase active al método seleccionado
            this.classList.add('active');
            
            // Mostrar/ocultar sección de QR para Yape
            if (this.dataset.method === 'yape') {
                yapeQR.classList.add('active');
            } else {
                yapeQR.classList.remove('active');
            }
        });
    });

    // Manejar confirmación de pago
    confirmButton.addEventListener('click', function() {
        const selectedMethod = document.querySelector('.payment-method.active');
        
        if (!selectedMethod) {
            alert('Por favor selecciona un método de pago');
            return;
        }

        const paymentMethod = selectedMethod.dataset.method;
        
        if (paymentMethod === 'paypal') {
            // Redirigir a PayPal
            alert('Redirigiendo a PayPal...');
            // window.location.href = 'URL_DE_PAYPAL';
        } else if (paymentMethod === 'yape') {
            // Procesar pago con Yape
            alert('Por favor realiza el pago usando el código QR de Yape y guarda tu comprobante');
        }
    });

    // Mostrar items iniciales
    displayCartItems();
});
