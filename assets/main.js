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
