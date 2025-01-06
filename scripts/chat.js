document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    let isTyping = false;

    const responses = {
        default: "Lo siento, no entiendo tu pregunta. ¿Podrías reformularla? 🤔",
        greeting: [
            "¡Hola! ¿En qué puedo ayudarte hoy? 😊",
            "¡Bienvenido a Pomataylla! ¿Cómo puedo asistirte? 👋",
            "¡Saludos! Estoy aquí para ayudarte 🌟"
        ],
        products: "En Textiles Pomataylla ofrecemos mantas, tapices, prendas de vestir y accesorios hechos con técnicas ancestrales y fibras naturales como lana de oveja y alpaca. ¿Te interesa algo en particular?",
        price: "Nuestros precios varían según el producto. Por ejemplo, los tapices empiezan en S/.50. ¿Hay algún artículo que te interese saber más detalles?",
        shipping: "Realizamos envíos a todo el Perú. El tiempo de entrega es de 3-5 días hábiles para destinos nacionales. Para envíos internacionales, por favor consulta con nosotros.",
        payment: "Aceptamos Yape, Plin, transferencia bancaria y pagos con tarjeta de crédito. También ofrecemos pago contra entrega en algunas localidades.",
        history: "Textiles Pomataylla fusiona tradición con innovación. Desde Ayacucho, promovemos el arte textil preservando técnicas ancestrales y empoderando a los artesanos locales.",
        mission: "Nuestra misión es preservar y difundir el arte textil ayacuchano, apoyando a las comunidades locales y ofreciendo productos de alta calidad que reflejan la riqueza cultural de nuestra región.",
        sustainability: "Promovemos prácticas sostenibles en la producción textil, utilizando fibras naturales y colaborando con artesanos bajo principios de comercio justo.",
        customization: "Ofrecemos personalización en algunos de nuestros productos. Puedes elegir colores, diseños y tamaños según tus preferencias.",
        contact: "Puedes contactarnos a través de WhatsApp, teléfono o correo electrónico. Estamos aquí para ayudarte con cualquier consulta.",
    };

    const keywords = {
        greeting: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos'],
        products: ['productos', 'artesanías', 'artesania', 'tienen', 'venden', 'tapices', 'mantas', 'textiles'],
        price: ['precio', 'costo', 'cuánto', 'cuanto', 'vale'],
        shipping: ['envío', 'envio', 'entrega', 'shipping', 'delivery'],
        payment: ['pago', 'pagar', 'yape', 'plin', 'transferencia', 'tarjeta'],
        history: ['historia', 'origen', 'quiénes son', 'quienes son'],
        mission: ['misión', 'valores', 'visión'],
        sustainability: ['sostenibilidad', 'ecológico', 'ambiental'],
        customization: ['personalización', 'personalizar', 'personalizado'],
        contact: ['contacto', 'whatsapp', 'teléfono', 'email', 'correo']
    };

    function showTypingIndicator() {
        if (!isTyping) {
            isTyping = true;
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
            isTyping = false;
        }
    }

    function getResponse(message) {
        message = message.toLowerCase();
        for (let category in keywords) {
            if (keywords[category].some(keyword => message.includes(keyword))) {
                if (category === 'greeting') {
                    return responses[category][Math.floor(Math.random() * responses[category].length)];
                }
                return responses[category];
            }
        }
        return responses.default;
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatButton.addEventListener('click', () => {
        chatContainer.style.display = 'block';
        chatButton.style.display = 'none';
        userInput.focus();
    });

    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        chatButton.style.display = 'flex';
    });

    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            showTypingIndicator();

            setTimeout(() => {
                hideTypingIndicator();
                const botResponse = getResponse(message);
                addMessage(botResponse);
            }, 1500);
        }
    }

    sendMessage.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });


});