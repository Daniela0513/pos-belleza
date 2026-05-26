// Obtener productos guardados
const productos = JSON.parse(localStorage.getItem("productos")) || [];

// ===============================
// 🔹 CALCULOS
// ===============================

// Total productos
const totalProductos = productos.length;

// Stock bajo (<=25)
const stockBajo = productos.filter((p) => p.stock <= 25).length;

// Valor total inventario
//const valorTotal = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);

// Categorías únicas
const categorias = [...new Set(productos.map((p) => p.categoria))].length;

// ===============================
// 🔹 MOSTRAR EN EL HTML
// ===============================

// Seleccionar cards
const cards = document.querySelectorAll(".card h2");

// Asignar valores
if (cards.length >= 4) {
  cards[0].innerText = totalProductos;
  cards[1].innerText = stockBajo;
  //  cards[2].innerText = "$" + valorTotal.toLocaleString();
  cards[2].innerText = categorias;
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "../login.html";
}
