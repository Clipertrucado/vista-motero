document.getElementById('form_registro_club').addEventListener('submit', registerClub);

function registerClub(event) {
    event.preventDefault();

    const nombreClub = document.getElementById('nombre_club').value;
    const coloresClub = document.getElementById('colores_club').value;
    const emailClub = document.getElementById('mail_club').value;
    const passwordClub = document.getElementById('contraseña_club').value;
    const confirmPassword = document.getElementById('confirmar_contraseña').value;

    if (passwordClub !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const data = {
        nombreClub: nombreClub,
        coloresClub: coloresClub,
        mailClub: emailClub,
        contrasenyaClub: passwordClub
    };
    
    fetch('http://localhost:8080/apiMoteros/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert("Club registrado exitosamente"); // Mensaje exitoso
            document.getElementById('form_registro_club').reset();
            console.log(data);
           
        }
    })
    .catch(error => console.error('Error:', error));
}

// Asegúrate de añadir el listener al formulario de registro de usuarios
document.getElementById('form_registro_usuario').addEventListener('submit', registerUsuario);

function registerUsuario(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre_usuario').value;
    const apellidosUsuario = document.getElementById('apellidos_usuario').value;
    const fechaNacimientoUsuario = document.getElementById('fecha_nacimiento_usuario').value;
    const mailUsuario = document.getElementById('email_usuario').value;
    const telefonoUsuario = document.getElementById('telefono_usuario').value;
    const nicknameUsuario = document.getElementById('nick_usuario').value;
    const dniUsuario = document.getElementById('dni_usuario').value;
    const contrasenyaUsuario = document.getElementById('contraseña_usuario').value;
    const confirmPassword = document.getElementById('confirmar_contraseña_usuario').value;

    if (contrasenyaUsuario !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const data = {
        nombreUsuario: nombreUsuario,
        apellidosUsuario: apellidosUsuario,
        fechaNacimientoUsuario: fechaNacimientoUsuario,
        mailUsuario: mailUsuario,
        nicknameUsuario: nicknameUsuario,
        telefonoUsuario: telefonoUsuario,
        dniUsuario: dniUsuario,
        contrasenyaUsuario: contrasenyaUsuario
    };

    fetch('http://localhost:8080/apiMoteros/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert("Usuario registrado exitosamente"); // Mensaje exitoso
            document.getElementById('form_registro_usuario').reset();
            console.log(data);
           
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('form_login').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('mail_login').value;
    const password = document.getElementById('contraseña_login').value;

    const data = {
        mail: email,
        contrasenya: password
    };

    loginClub(data).catch(error => {
        console.error('Error en loginClub:', error);
        // Intentar loginUser solo si falla loginClub
        loginUser(data).catch(err => {
            console.error('Error en loginUser:', err);
            alert('No se pudo iniciar sesión: ' + err.message);
        });
    });
});

async function loginClub(data) {
    console.log('Intentando loginClub con:', data);
    const response = await fetch('http://localhost:8080/apiMoteros/api/clubs/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    const result = await response.json();

    if (result.error) {
        throw new Error(result.error);
    }

    alert("Inicio de sesión exitoso (Club)");
    window.location.href = "delete.html"; // Redirigir al usuario
}

async function loginUser(data) {
    console.log('Intentando loginUser con:', data);
    const response = await fetch('http://localhost:8080/apiMoteros/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    const result = await response.json();

    if (result.error) {
        throw new Error(result.error);
    }

    alert("Inicio de sesión exitoso (Usuario)");
    window.location.href = "delete.html"; // Redirigir al usuario
}


// Función para eliminar un club
function deleteClub() {
    const emailClub = document.getElementById('mail_club').value;

    const data = {
        mail_club: emailClub
    };

    fetch('http://localhost:3000/api/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error); // Error al eliminar
        } else {
            alert(data.message); // Club eliminado exitosamente
            // Aquí puedes limpiar los campos o actualizar la interfaz
        }
    })
    .catch(error => console.error('Error:', error));
}