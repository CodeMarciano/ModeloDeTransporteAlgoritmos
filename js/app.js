let formularioEscojerModelo = document.getElementById('formularioEscojerModelo');

formularioEscojerModelo.addEventListener('submit', function (e) {
    e.preventDefault();

    let datoRadioButton = new FormData(formularioEscojerModelo).get('grupoTipoModelo');


    if (datoRadioButton === "1") {
        window.location.href = "esquinanoroeste.html";
    } else if (datoRadioButton === "2") {
        window.location.href = "aproximacionvoguel.html"
    } else if (datoRadioButton === "3") {
        window.location.href = "minimocosto.html";

    }

});