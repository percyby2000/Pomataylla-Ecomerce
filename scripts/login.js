import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyA_4e3f2ohamO6o5reti96tXum4qiBP1jY",
    authDomain: "pomataylla-ecomerce.firebaseapp.com",
    projectId: "pomataylla-ecomerce",
    storageBucket: "pomataylla-ecomerce.firebasestorage.app",
    messagingSenderId: "323143470562",
    appId: "1:323143470562:web:a4fcc1074e0592b5693dbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login').addEventListener('click', (e) => {
    const email = document.getElementById('emaillog').value;
    const password = document.getElementById('passwordlog').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            alert("Usuario logueado");
            console.log(cred.user);
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                alert('Credenciales inválidas');
            } else if (errorCode === 'auth/invalid-email') {
                alert('El correo no es válido');
            } else {
                alert('Error al iniciar sesión: ' + error.message);
            }
        });
});

document.getElementById('cerrar').addEventListener('click', (e) => {
    signOut(auth).then(() => {
        alert('Sesión cerrada');
    }).catch((error) => {
        alert('Error al cerrar sesión');
    });
});

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('Usuario Activo');
        if (user.emailVerified) {
            window.location.href = 'https://pomataylla.vercel.app/subirProducto.html';
        } else {
            signOut(auth);
        }
    } else {
        console.log('Usuario Inactivo');
    }
});
