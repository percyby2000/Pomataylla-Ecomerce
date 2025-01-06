
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummary = document.getElementById('cart-summary');
    const itemsCount = document.getElementById('items-count');

    // Mostrar resumen del carrito
    function displayCartSummary() {
        let total = 0;
        itemsCount.textContent = cart.length;

        cartSummary.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <li class="list-group-item d-flex justify-content-between">
                    <div>
                        <h6 class="my-0">${item.name}</h6>
                        <small class="text-muted">Cantidad: ${item.quantity}</small>
                    </div>
                    <span class="text-muted">S/. ${(item.price * item.quantity).toFixed(2)}</span>
                </li>
            `;
        }).join('') + `
            <li class="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>S/. ${total.toFixed(2)}</strong>
            </li>
        `;
    }

    // Preview de imagen
    const voucherInput = document.getElementById('voucherImage');
    const imagePreview = document.getElementById('imagePreview');

    voucherInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `<img src="${e.target.result}" class="img-fluid" style="max-height: 200px;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar envío del formulario
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            customerName: document.getElementById('customerName').value,
            customerLastName: document.getElementById('customerLastName').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            needsShipping: document.getElementById('needsShipping').checked,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            timestamp: new Date()
        };

        try {
            // Aquí puedes agregar la lógica para enviar a Firebase
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Generar comprobante
            generateReceipt(formData);
            
            // Limpiar carrito
            localStorage.setItem('cart', JSON.stringify([]));
            
            // Redirigir a página de éxito
            alert('¡Pago procesado con éxito! Se ha generado su comprobante.');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Error al procesar el pago. Por favor, intente nuevamente.');
        }
    });

    function generateReceipt(formData) {
        const receipt = document.createElement('div');
        receipt.innerHTML = `
            <div style="padding: 20px;">
                <h2>Comprobante de Pago - POMATAYLLA</h2>
                <p>Cliente: ${formData.customerName} ${formData.customerLastName}</p>
                <p>Teléfono: ${formData.phone}</p>
                <p>Dirección: ${formData.location}</p>
                <p>Fecha: ${formData.timestamp.toLocaleString()}</p>
                <h3>Productos:</h3>
                <ul>
                    ${formData.items.map(item => `
                        <li>${item.name} - Cantidad: ${item.quantity} - S/. ${item.price}</li>
                    `).join('')}
                </ul>
                <h3>Total: S/. ${formData.total}</h3>
            </div>
        `;

        html2pdf().from(receipt).save(`comprobante_${Date.now()}.pdf`);
    }

    // Mostrar resumen inicial
    displayCartSummary();
});