// Seleccionar el formulario
const form = document.getElementById("loginForm");

// Simulación de usuarios
const usuarios = [
  {
    email: "admin@afrodita.com",
    password: "123456",
    rol: "admin",
  },
  {
    email: "empleado@afrodita.com",
    password: "123456",
    rol: "empleado",
  },
];

// Evento submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // evita recargar la página

  // Obtener datos del formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validación básica
  if (email === "" || password === "") {
    alert("Por favor completa todos los campos");
    return;
  }

  // Buscar usuario
  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password,
  );

  if (usuario) {
    // Login exitoso
    alert("Bienvenida a Afrodita, " + usuario.rol);

    // Guardar sesión simple
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redirigir según rol
    if (usuario.rol === "admin") {
      window.location.href = "pages/dashboard.html";
    } else {
      window.location.href = "pages/dashboard.html";
    }
  } else {
    // Login fallido
    alert("Correo o contraseña incorrectos");
  }
});
