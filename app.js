// let formulario = document.getElementById('formulario');
// let respuesta = document.getElementById('mostrarMensaje');
//
// formulario.addEventListener('submit', function (e) {
//     e.preventDefault();
//     // console.log("Me diste un click");
//     let dato = new FormData(formulario).get('grupo1');
//
//     if (dato === "1") {
//         respuesta.innerHTML = "<p>Me la pelas</p>";
//     } else if (dato === "2") {
//         respuesta.innerHTML = "<p>Me la pelas con dos</p>";
//     }
// });

let sendButton = document.getElementById('enviarBoton');
let addListInputs = document.getElementById('addList');
// let setElement = document.getElementById('setElement');

function showValuesInputs(e){
    let item = addListInputs.querySelectorAll('tr');
    let item1 = [...item[0].querySelectorAll('td')];

    console.log(item1[3].querySelector('input').value);
    // let elems = item.map( el => el === '' ? '':`<li>${el.value}</li>`);

    // setElement.innerHTML = elems.reduce( (a,b) => a + b );
    // setElement.setAttribute("class", "Hola perro");
}

sendButton.addEventListener('click', showValuesInputs);
