const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register--btn');
const loginBtn = document.querySelector('.login--btn');
const formRegistro = document.getElementById('formRegistro');
const formLogin = document.getElementById('formLogin');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

/* registro */
formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores de los inputs
    const usuario = document.getElementById('usuario').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value

    // Crear objeto con los datos del usuario
    const nuevoUsuario = {
        id: Date.now(), // ID único usando timestamp
        usuario: usuario,
        correo: correo,
        contrasena: contrasena, // En producción, NUNCA guardes contraseñas sin encriptar
        fechaRegistro: new Date().toISOString()
    };

    // Guardar en sessionStorage
    sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    sessionStorage.setItem('estaAutenticado', 'true');

    // Mostrar mensaje de éxito
    alert('¡Registro exitoso!');

    formRegistro.reset();
});

/* login */
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores ingresados
    const usuarioIngresado = document.getElementById('usuarioLogin').value.trim();
    const contrasenaIngresada = document.getElementById('contrasenaLogin').value;
    
    // Obtener el usuario guardado en sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario');
    
    // Verificar si existe un usuario registrado
    if (!usuarioGuardado) {
        alert('No hay ningún usuario registrado. Por favor regístrate primero.');
        return;
    }

    // Convertir el string a objeto
    const usuario = JSON.parse(usuarioGuardado);
    
    // Verificar las credenciales
    if (usuario.usuario === usuarioIngresado && usuario.contrasena === contrasenaIngresada) {
        // Login exitoso
        sessionStorage.setItem('estaAutenticado', 'true');
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        
        alert(`¡Bienvenido de nuevo ${usuario.usuario}!`);
        window.location.href = '../index.html';
    } else {
        // Credenciales incorrectas
        alert('Usuario o contraseña incorrectos');
        document.getElementById('contrasenaLogin').value = ''; // Limpiar contraseña
    }
});