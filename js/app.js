let formularioEscojerModelo = document.getElementById('formularioEscojerModelo');

formularioEscojerModelo.addEventListener('submit', function (e) {
    e.preventDefault();

    let datoRadioButton = new FormData(formularioEscojerModelo).get('grupoTipoModelo');


    if (datoRadioButton === "1") {
        window.location.href = "esquinanoroeste.html";
    } else if (datoRadioButton === "2") {

    } else if (datoRadioButton === "3") {

    }

});