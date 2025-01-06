// Slider functionality
const slides = document.querySelectorAll('#hero-slider .slide');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds


function updateProductModal(product) {
    const modalTitle = document.getElementById('productModalLabel');
    const modalImage = document.querySelector('#productModal .modal-body img');
    const modalDescription = document.querySelector('#productModal .modal-body p');
    const modalPrice = document.querySelector('#productModal .modal-body h4');
    const modalAddToCart = document.querySelector('#productModal .modal-body button');

    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalDescription.textContent = 'Product description goes here.';
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const navLinks = document.querySelectorAll('.fullscreen-nav a');

    // Función para abrir/cerrar el menú de pantalla completa
    function toggleFullscreenMenu() {
        fullscreenMenu.classList.toggle('active');
        navbarToggler.classList.toggle('active');
    }

    // Event listener para el botón de menú
    navbarToggler.addEventListener('click', toggleFullscreenMenu);

    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', toggleFullscreenMenu);
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    const cartIcons = document.querySelectorAll('.cart-icon');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Carrito clickeado');
        });
    });
});

renderCategories();