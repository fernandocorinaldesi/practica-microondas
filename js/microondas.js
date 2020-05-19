window.onload = () => {
  const botonesinferiores = document.querySelectorAll(".bi");
  const botonessuperiores = document.querySelectorAll(".bs");
  const botonesencendido = document.querySelectorAll(".be");
  const botonencender = document.getElementById("encender");
  const botonstart = document.getElementById("start");
  const botonredondo = document.querySelector(".boton-redondo");
  const visorcontenido = document.querySelector(".visor-contenido");
  const visorcontenidoup = document.querySelector(".visor-contenido-up");
  const visorcontenidodown = document.querySelector(".visor-contenido-down");
  const botonprog = document.getElementById("prog");
  const vidrio = document.querySelector(".microondas-frente");

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
 
Main();
  
  function Main() {

    botonprog.addEventListener("click", () => {
      if (microondas.encendido & !microondas.programacion.enprogreso
      & !microondas.programacion.iniciado) {
        enProgreso();
      } else {
        alert("Esta apagado o en progreso");
      }
    });
    botonstart.addEventListener("click", () => {
      if (
        microondas.programacion.enprogreso &
        !microondas.programacion.iniciado
      ) {
        iniciarProgram();
      } else {
        alert("El microondas esta apagado o debe programarlo");
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
  }
  function removeListener(){
    botonesinferiores.forEach((btn) =>
    btn.removeEventListener("click", action)
  );
  }

  function prender() {
    microondas.encendido = true;
    visorcontenido.innerHTML = "Encendido";
    visorcontenidoup.innerHTML = "Bienvenido";
    visorcontenidodown.innerHTML = "Modo : normal";
  }

  function apagar() {
    if (microondas.programacion.iniciado) {
      stopTimer();
      
    }
    clearScreen()
    setdefault(microondas);
  }
  function clearScreen(){
    visorcontenidoup.innerHTML = "";
    visorcontenido.innerHTML = "";
    visorcontenidodown.innerHTML = "";
  }

  function enProgreso() {
    botonesinferiores.forEach((btn) => btn.addEventListener("click", action));
    microondas.programacion.enprogreso = true;
    visorcontenido.innerHTML = "____";
    visorcontenidoup.innerHTML = "Ingresar tiempo";
    visorcontenidodown.innerHTML = "Modo : en programación";
  }
  function action(event) {
    stringtime += event.target.getAttribute("dato-entrada");
    visorcontenido.innerHTML = stringtime;
    if (stringtime.length == 2) {
      stringtime = stringtime + ":00";
      console.log(typeof stringtime);
      visorcontenido.innerHTML = stringtime;
    }
    if (stringtime.length == 5) {
      mininput = parseInt(stringtime[0] + stringtime[1]);
    }
    if (stringtime.length == 6) {
      stringtime = "";
      visorcontenido.innerHTML = "____";
    }
  }

  function iniciarProgram() {
    microondas.programacion.iniciado=true;
    microondas.programacion.enprogreso = false;
    visorcontenidoup.innerHTML="";
    removeListener();
    startTimer();
  }

  function startTimer() {
    
    visorcontenidoup.classList.add("spinning-loader"); 
    let timer = mininput * 60;
    let display = "";
    let active = 400;
    handler = setInterval(function () {
      let minutes = parseInt(timer / 60, 10);
      let seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display = minutes + ":" + seconds;

      visorcontenido.innerHTML = display;
      visorcontenidodown.innerHTML = "Modo : en cocción";
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
  function setdefault(microondas) {
    microondas.encendido = false;
    microondas.programacion["iniciado"] = false;
    microondas.programacion["apagado"] = true;
    microondas.programacion["en-progreso"] = false;
  }
  function stopTimer() {
    clearInterval(handler);
    removeListener();
    visorcontenidoup.classList.remove("spinning-loader");
    visorcontenidoup.innerHTML = "Cocción finalizada";
    visorcontenidodown.innerHTML = "Modo : normal";
    microondas.programacion.iniciado = false;
    document.getElementById("fondo").style.background = "white";
  }

};