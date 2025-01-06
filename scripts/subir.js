// Previsualización de imagen
document.getElementById('productImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
});

// Generar ID único
function generateUniqueId() {
    return 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Subir producto y guardar en localStorage
document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener todos los valores del formulario
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const category = document.getElementById('productCategory').value;
    const imageFile = document.getElementById('imagePreview').src;

    // Validaciones
    if (!imageFile) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    if (stock < 0) {
        alert("El stock no puede ser negativo.");
        return;
    }

    // Crear nuevo producto con ID único y stock
    const newProduct = {
        id: generateUniqueId(),
        name,
        description,
        price,
        stock,
        category,
        image: imageFile,
        createdAt: new Date().toISOString()
    };

    // Recuperar productos existentes o crear array vacío
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Añadir nuevo producto
    products.push(newProduct);
    
    // Guardar en localStorage
    try {
        localStorage.setItem('products', JSON.stringify(products));
        alert('Producto subido exitosamente');
        
        // Limpiar el formulario
        document.getElementById('productForm').reset();
        document.getElementById('imagePreview').style.display = 'none';
        
        // Redirigir a la página de productos
        window.location.href = "productos.html";
    } catch (error) {
        // Manejar error de localStorage lleno
        alert('Error al guardar el producto. El almacenamiento local puede estar lleno.');
        console.error('Error al guardar en localStorage:', error);
    }
});

// Validar entrada de stock para no permitir números negativos
document.getElementById('productStock').addEventListener('input', function(e) {
    if (this.value < 0) {
        this.value = 0;
    }
});

// Validar entrada de precio para no permitir números negativos
document.getElementById('productPrice').addEventListener('input', function(e) {
    if (this.value < 0) {
        this.value = 0;
    }
});