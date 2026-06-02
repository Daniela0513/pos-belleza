function buscarOrden(){

    let input =
    document.getElementById("buscar");

    let filtro =
    input.value.toUpperCase();

    let tabla =
    document.getElementById("tablaOrdenes");

    let tr =
    tabla.getElementsByTagName("tr");

    for(let i = 1; i < tr.length; i++){

        let proveedor =
        tr[i].getElementsByTagName("td")[1];

        let producto =
        tr[i].getElementsByTagName("td")[2];

        if(proveedor && producto){

            let texto =
            proveedor.textContent +
            producto.textContent;

            tr[i].style.display =
            texto.toUpperCase().indexOf(filtro) > -1
            ? ""
            : "none";
        }
    }
}