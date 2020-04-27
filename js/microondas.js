
const botonesinferiores = document.querySelectorAll(".bi");
const botonessuperiores = document.querySelectorAll(".bs");
const botonesencendido = document.querySelectorAll(".be");
const botonencender = document.getElementById("encender");
const botonapagar = document.getElementById("apagar");
const botonredondo = document.querySelector(".boton-redondo");
const visorcontenido = document.querySelector(".visor-contenido");
let estado = false;
let vidrio = document.querySelector(".microondas-central");

botonesinferiores.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (estado) {
            visorcontenido.innerHTML += btn.getAttribute("dato-entrada");
            if (visorcontenido.childNodes[0].nodeValue.length == 5) {
                visorcontenido.innerHTML = "";
            }
        }

    });
});

botonencender.addEventListener('click', () => {
    botonesinferiores.forEach(btn => {
        btn.classList.toggle("botones-borderstyle");
    });
    botonessuperiores.forEach(btn => {
        btn.classList.toggle("botones-borderstyle");
    });
    botonesencendido.forEach(btn => {
        btn.classList.toggle("botones-borderstyle");
    });
    botonredondo.classList.toggle("boton-rotar-borderstyle");

    if(!estado){
        visorcontenido.innerHTML = "0000";
        estado = true;
    }
    else{
        visorcontenido.innerHTML = "";
        estado = false;
    }
 
});
vidrio.addEventListener("click", ()=>{
    vidrio.classList.toggle("abrir-vidrio");
});
botonredondo.addEventListener("click", ()=>{
    botonredondo.classList.toggle("boton-rotar");
});


