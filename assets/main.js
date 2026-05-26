// Obtener usuario guardado
const usuario = JSON.parse(localStorage.getItem("usuario"));

// Si NO hay usuario → devolver al login
if (!usuario) {
  window.location.href = "../login.html";
}

// Mostrar usuario en pantalla
const rolElemento = document.querySelector(".topbar .left");

if (rolElemento) {
  rolElemento.innerText = "Rol: " + usuario.rol;
}

// Opcional: saludo
console.log("Usuario logueado:", usuario.email);

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "../login.html";
}

function actualizarHora() {
  const ahora = new Date();

  const fecha = ahora.toLocaleDateString("es-CO");
  const hora = ahora.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  document.getElementById("fecha-hora").innerText = `${fecha} ${hora}`;
}

// Ejecutar inmediatamente
actualizarHora();

// Actualizar cada segundo
setInterval(actualizarHora, 1000);
