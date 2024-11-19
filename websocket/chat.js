// Conectar al servidor de Socket.IO
var socket = io.connect('http://localhost:8000', { forceNew: true });


socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

// Escuchar el evento 'messages' cuando se emiten desde el servidor
socket.on('messages', function (data) {
    console.log('Recibido mensaje de servidor:', data); // Verifica que los datos se reciban
    render(data);
});

function render(data) {
    // Renderizar los mensajes en HTML
    var html = data
        .map(function (elem, index) {
            return `<p><strong>${elem.author}</strong>: ${elem.text}</p>`;
        })
        .join(" ");

    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    console.log("add message");
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    // Emitir el evento 'new-message' al servidor con el mensaje
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = ''; //Resetear el campo del form
    return false; // Evita que el formulario se envíe
}
