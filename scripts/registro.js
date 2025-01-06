import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

document.getElementById('registro').addEventListener('click', (e) => {
    const email = document.getElementById('emailreg').value;
    const password = document.getElementById('passwordreg').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            alert("Usuario creado");
            sendEmailVerification(cred.user).then(() => {
                alert('Se ha enviado un correo de verificación');
            });
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert('El correo ya está en uso');
            } else if (errorCode === 'auth/invalid-email') {
                alert('El correo no es válido');
            } else if (errorCode === 'auth/weak-password') {
                alert('La contraseña debe tener al menos 6 caracteres');
            }
        });
});