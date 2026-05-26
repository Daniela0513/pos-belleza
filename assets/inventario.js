// =============================
//  BASE DE DATOS (LOCAL)
// =============================
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Guardar en localStorage
function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// =============================
//  RENDER TABLA
// =============================
function renderTabla() {
  const tbody = document.querySelector(".inventory-table tbody");
  tbody.innerHTML = "";

  productos.forEach((p, index) => {
    let estado = "Disponible";
    let color = "green";

    if (p.stock < 10) {
      estado = "Crítico";
      color = "red";
    } else if (p.stock <= 25) {
      estado = "Bajo";
      color = "orange";
    }

    const fila = `
      <tr>
        <td>${p.sku}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${p.marca}</td>
        <td>$${p.precio}</td>
        <td style="color:${color}">${p.stock}</td>
        <td style="color:${color}">${estado}</td>
        <td>
          <button class="btn-edit" data-index="${index}">Editar</button>
          <button class="btn-delete" data-index="${index}">Eliminar</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += fila;
  });
}

// Cargar tabla al iniciar
renderTabla();

// =============================
// 🔎 BUSCADOR
// =============================
document.querySelector(".search-input").addEventListener("input", function () {
  const texto = this.value.toLowerCase();

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto),
  );

  renderFiltrados(filtrados);
});

// =============================
// 🔽 FILTROS
// =============================

// Categoría
document
  .querySelector(".filter-categoria")
  .addEventListener("change", function () {
    const categoria = this.value;

    if (categoria === "Todas") {
      renderTabla();
      return;
    }

    const filtrados = productos.filter((p) => p.categoria === categoria);

    renderFiltrados(filtrados);
  });

// Estado
document
  .querySelector(".filter-estado")
  .addEventListener("change", function () {
    const estado = this.value;

    const filtrados = productos.filter((p) => {
      if (estado === "Todos") return true;
      if (estado === "Crítico") return p.stock < 10;
      if (estado === "Bajo") return p.stock >= 10 && p.stock <= 25;
      if (estado === "Disponible") return p.stock > 25;
    });

    renderFiltrados(filtrados);
  });

// Render filtrados
function renderFiltrados(lista) {
  const tbody = document.querySelector(".inventory-table tbody");
  tbody.innerHTML = "";

  lista.forEach((p) => {
    let estado = "Disponible";
    let color = "green";

    if (p.stock < 10) {
      estado = "Crítico";
      color = "red";
    } else if (p.stock <= 25) {
      estado = "Bajo";
      color = "orange";
    }

    const fila = `
      <tr>
        <td>${p.sku}</td>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>${p.marca}</td>
        <td>$${p.precio}</td>
        <td style="color:${color}">${p.stock}</td>
        <td style="color:${color}">${estado}</td>
        <td>
          <button class="btn-edit">Editar</button>
          <button class="btn-delete">Eliminar</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += fila;
  });
}

// =============================
//  EDITAR /  ELIMINAR
// =============================
document
  .querySelector(".inventory-table tbody")
  .addEventListener("click", function (e) {
    //  ELIMINAR
    if (e.target.classList.contains("btn-delete")) {
      const index = e.target.dataset.index;

      if (confirm("¿Eliminar este producto?")) {
        productos.splice(index, 1);
        guardarProductos();
        renderTabla();
      }
    }

    //  EDITAR
    if (e.target.classList.contains("btn-edit")) {
      const index = e.target.dataset.index;
      const p = productos[index];

      const nuevoNombre = prompt("Nombre:", p.nombre);
      const nuevoPrecio = prompt("Precio:", p.precio);
      const nuevoStock = prompt("Stock:", p.stock);

      if (nuevoNombre && nuevoPrecio && nuevoStock) {
        p.nombre = nuevoNombre;
        p.precio = parseInt(nuevoPrecio);
        p.stock = parseInt(nuevoStock);

        guardarProductos();
        renderTabla();
      }
    }
  });

// =============================
// MODAL
// =============================
const modal = document.getElementById("modalProducto");
const btnAdd = document.querySelector(".btn-add");
const btnCancelar = document.getElementById("btnCancelar");

// abrir
btnAdd.addEventListener("click", () => {
  modal.style.display = "flex";
});

// cerrar
btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
});

// =============================
//AGREGAR PRODUCTO
// =============================
document
  .getElementById("formProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const producto = {
      nombre: document.getElementById("nombre").value,
      sku: document.getElementById("sku").value,
      marca: document.getElementById("marca").value,
      categoria: document.getElementById("categoria").value,
      stock: parseInt(document.getElementById("stock").value),
      precio: parseInt(document.getElementById("precio").value),
    };

    productos.push(producto);

    guardarProductos();
    renderTabla();

    modal.style.display = "none";
    this.reset();
  });

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "../login.html";
}
