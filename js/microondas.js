//---variables globales---///
var handler;
var mininput = 0;
var stringtime = "";

var microondas = {
  encendido: false,
  programacion: {
    iniciado: false,
    enprogreso: false,
    apagado: true,
  },
};

window.onload = () => {
  //---configuración de eventos---//
  const botonesinferiores = document.querySelectorAll(".bi");
  const botonessuperiores = document.querySelectorAll(".bs");
  const botonesencendido = document.querySelectorAll(".be");
  const botonencender = document.getElementById("encender");
  const botonstart = document.getElementById("start");
  const botonredondo = document.querySelector(".boton-redondo");
  const botonprog = document.getElementById("prog");
  const vidrio = document.querySelector(".microondas-frente");

  botonprog.addEventListener("click", () => {
    if (!microondas.encendido) {
      modal(
        "El microondas esta apagado. Primero debe prenderlo para poder programarlo"
      );
    } else if (microondas.programacion.enprogreso) {
      modal("El microondas esta siendo programado");
    } else if (microondas.programacion.iniciado) {
      modal(
        "No puede programar el microonda mientras una programación este corriendo"
      );
    } else {
      enProgreso();
    }
  });

  botonstart.addEventListener("click", () => {
    if (!microondas.encendido) {
      modal(
        "El microondas esta apagado. Para iniciar una programación primero debe prenderlo y luego programarlo"
      );
    } else if (microondas.programacion.iniciado) {
      modal("La programación esta corriendo");
    } else if (!microondas.programacion.enprogreso) {
      modal(
        "Primero debe programar el microondas para poder iniciar una programación"
      );
    } else {
      iniciarProgram();
    }
  });

  botonencender.addEventListener("click", () => {
    botonesinferiores.forEach((btn) => {
      btn.classList.toggle("botones-borderstyle");
    });
    botonessuperiores.forEach((btn) => {
      btn.classList.toggle("botones-borderstyle");
    });
    botonesencendido.forEach((btn) => {
      btn.classList.toggle("botones-borderstyle");
    });
    botonredondo.classList.toggle("boton-rotar-borderstyle");

    if (!microondas.encendido) {
      prender();
    } else {
      removeListener();
      apagar();
    }
  });
  vidrio.addEventListener("click", () => {
    vidrio.classList.toggle("abrir-vidrio");
  });
  botonredondo.addEventListener("click", () => {
    botonredondo.classList.toggle("boton-rotar");
  });
};


//---funciones---//

function removeListener() {
  document.querySelectorAll(".bi").forEach((btn) => btn.removeEventListener("click", action));
}

function prender() {
  microondas.encendido = true;
  setVisor("(^◡^)");
  setVisorUp("Bienvenido");
  setVisorDown("Modo : normal");
}

function apagar() {
  if (microondas.programacion.iniciado) {
    stopTimer();
  }
  clearScreen();
  setdefault();
}

function clearScreen() {
  setVisor("");
  setVisorDown("");
  setVisorUp("");
}

function enProgreso() {
  document.querySelectorAll(".bi").forEach((btn) => btn.addEventListener("click", action));
  microondas.programacion.enprogreso = true;
  setVisor("____");
  setVisorUp("Ingresar tiempo");
  setVisorDown("Modo : en programación");
}

function action(event) {
  stringtime += event.target.getAttribute("dato-entrada");
  setVisor(stringtime);
  if (stringtime.length == 2) {
    stringtime = stringtime + ":00";
    console.log(typeof stringtime);
    setVisor(stringtime);
  }
  if (stringtime.length == 5) {
    mininput = parseInt(stringtime[0] + stringtime[1]);
  }
  if (stringtime.length == 6) {
    stringtime = "";
    setVisor("____");
  }
}

function iniciarProgram() {
  microondas.programacion.iniciado = true;
  microondas.programacion.enprogreso = false;
  setVisorUp("");
  removeListener();
  startTimer();
}

function setVisorUp(data){
  document.querySelector(".visor-contenido-up").innerHTML =data;
}
function setVisor(data){
  document.querySelector(".visor-contenido").innerHTML =data;
}
function setVisorDown(data){
  document.querySelector(".visor-contenido-down").innerHTML =data;
}


function startTimer() {
  document.querySelector(".visor-contenido-up").classList.add("spinning-loader");
  let timer = mininput * 60;
  let display = "";
  let active = 400;

  handler = setInterval(function () {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display = minutes + ":" + seconds;

    setVisor(display);
    setVisorDown("Modo : en cocción");
    for (let i = 0; i < 12; i++) {
      document.getElementById(
        "fondo"
      ).style.background = `rgba(255,${active},0,1)`;
      active--;
    }
    if (--timer < 0) {
      stopTimer();
    }
  }, 1000);
}

function setdefault() {
  microondas.encendido = false;
  microondas.programacion.iniciado = false;
  microondas.programacion.apagado = true;
  microondas.programacion.enprogreso = false;
}

function stopTimer() {
  clearInterval(handler);
  removeListener();
  document.querySelector(".visor-contenido-up").classList.remove("spinning-loader");
  setVisorUp("Cocción finalizada");
  setVisorDown("Modo : normal");
  microondas.programacion.iniciado = false;
  document.getElementById("fondo").style.background = "white";
}

function modal(text) {
  let p = document.getElementById("modaltext");
  let modalpop = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  p.innerHTML = text;

  modalpop.style.display = "block";
  span.onclick = function () {
    modalpop.style.display = "none";
  };
}