function actualizarBotonAuth() {
    const authButton = document.getElementById('authButton');
    const authLink = document.getElementById('authLink');
    
    if (!authButton) return; // Si no existe el botón, salir
    
    const estaAutenticado = sessionStorage.getItem('estaAutenticado') === 'true';
    
    if (estaAutenticado) {
        const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
        
        // Cambiar apariencia del botón
        authButton.textContent = 'Cerrar Sesión';
        authButton.classList.add('btn-logout');
        authLink.href = '#';
        
        // Evento de cerrar sesión
        authButton.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    } else {
        // Usuario no autenticado
        authButton.textContent = 'Iniciar Sesión';
        authButton.classList.remove('btn-logout');
        authLink.href = 'pages/login.html'; // Ajusta la ruta según la página
    }
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        sessionStorage.removeItem('estaAutenticado');
        sessionStorage.removeItem('usuarioActivo');
        alert('Sesión cerrada exitosamente');
        window.location.reload();
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarBotonAuth);