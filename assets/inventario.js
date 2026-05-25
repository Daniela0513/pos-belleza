const filas = document.querySelectorAll(".inventory-table tbody tr");

// 🔎 BUSCADOR
document.querySelector(".search-input").addEventListener("input", function () {
  const texto = this.value.toLowerCase();

  filas.forEach((fila) => {
    const nombre = fila.cells[1].innerText.toLowerCase();

    fila.style.display = nombre.includes(texto) ? "" : "none";
  });
});

// 🔽 FILTRO CATEGORÍA
document
  .querySelector(".filter-categoria")
  .addEventListener("change", function () {
    const categoria = this.value;

    filas.forEach((fila) => {
      const cat = fila.cells[2].innerText;

      if (categoria === "Todas" || cat === categoria) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  });

// ⚠️ FILTRO ESTADO
document
  .querySelector(".filter-estado")
  .addEventListener("change", function () {
    const estado = this.value;

    filas.forEach((fila) => {
      const est = fila.cells[6].innerText;

      if (estado === "Todos" || est === estado) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  });

// ❌ ELIMINAR PRODUCTO
document.querySelectorAll(".btn-delete").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const confirmar = confirm("¿Eliminar este producto?");

    if (confirmar) {
      btn.closest("tr").remove();
    }
  });
});

// ✏️ EDITAR PRODUCTO
document.querySelectorAll(".btn-edit").forEach((btn) => {
  btn.addEventListener("click", () => {
    const fila = btn.closest("tr");

    let nombre = fila.cells[1].innerText;
    let precio = fila.cells[4].innerText.replace("$", "").replace(",", "");
    let stock = fila.cells[5].innerText;

    const nuevoNombre = prompt("Editar nombre:", nombre);
    const nuevoPrecio = prompt("Editar precio:", precio);
    const nuevoStock = prompt("Editar stock:", stock);

    if (nuevoNombre && nuevoPrecio && nuevoStock) {
      fila.cells[1].innerText = nuevoNombre;
      fila.cells[4].innerText = "$" + nuevoPrecio;
      fila.cells[5].innerText = nuevoStock;

      actualizarEstado(fila);
    }
  });
});

// 🔄 ACTUALIZAR ESTADO SEGÚN STOCK
function actualizarEstado(fila) {
  const stock = parseInt(fila.cells[5].innerText);
  const estadoCell = fila.cells[6];

  if (stock < 10) {
    estadoCell.innerText = "Crítico";
    estadoCell.style.color = "red";
  } else if (stock <= 25) {
    estadoCell.innerText = "Bajo";
    estadoCell.style.color = "orange";
  } else {
    estadoCell.innerText = "Disponible";
    estadoCell.style.color = "green";
  }
}
