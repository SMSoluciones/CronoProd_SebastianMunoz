// Identificador

// Storage Ingreso
let nombre = sessionStorage.getItem("nombreDeUsuario");
let apellido = sessionStorage.getItem("apellidoDeUsuario");
let legajo = sessionStorage.getItem("legajoDeUsuario");

const usuarioIngresado = document.querySelector(".usuarioIngresado");

if (nombre === null || apellido === null || legajo === null) {
  usuarioIngresado.innerHTML = `¡Bienvenido invitado!`;
} else {
  usuarioIngresado.innerHTML = `¡Bienvenido ${nombre} ${apellido}!`;
}

// Storage Producto

let modelos = JSON.parse(localStorage.getItem("unidadesCargadas"));
let numAsignacion = JSON.parse(localStorage.getItem("numeroAsignado"));

// >>>> CRONOMETRO

// VARIABLES

// DOM Tiempo
let marcaHora = 0;
let marcaMinutos = 0;
let marcaSegundos = 0;
let marcaCeSegundos = 0;
let grabado;

let contenedorTiempo = "";

// RECOLECCION

// Reloj
let recHoras = document.querySelector(".horas");
let recMinutos = document.querySelector(".minutos");
let recSegundos = document.querySelector(".segundos");
let recCeSegundos = document.querySelector(".cesegundos");

// Botones Reloj
let btnIniciar = document.querySelector(".iniciar");
let btnParar = document.querySelector(".parar");
let btnGrabar = document.querySelector(".grabar");
let btnReset = document.querySelector(".reset");

// Contenedor
let contenedorGrabaciones = document.querySelector(".contenedor__grabaciones");
let btnLimpiarGrab = document.querySelector(".limpiar__grabacion");

// FUNCIONES

let cronometro = {
  contadorCronometro() {
    if (marcaCeSegundos < 99) {
      // DOM Centésimas de Segundos
      marcaCeSegundos++;
      marcaCeSegundos = (marcaCeSegundos < 10 ? "0" : "") + marcaCeSegundos;
      recCeSegundos.innerHTML = marcaCeSegundos;
    }

    if (marcaCeSegundos == 99) {
      // DOM Segundos
      marcaCeSegundos = 0;
    }

    if (marcaCeSegundos == 0) {
      marcaSegundos++;
      marcaSegundos = (marcaSegundos < 10 ? "0" : "") + marcaSegundos;
      recSegundos.innerHTML = marcaSegundos;
    }

    if (marcaSegundos == 59) {
      // DOM Minutos
      marcaSegundos = 0;
    }

    if (marcaSegundos == 0 && marcaCeSegundos == 0) {
      marcaMinutos++;
      marcaMinutos = (marcaMinutos < 10 ? "0" : "") + marcaMinutos;
      recMinutos.innerHTML = marcaMinutos;
    }

    if (marcaMinutos == 59) {
      // DOM Horas
      marcaMinutos = 0;
    }
    if (marcaCeSegundos == 0 && marcaSegundos == 0 && marcaMinutos == 0) {
      marcaHora++;
      marcaHora == (marcaHora < 10 ? "0" : "") + marcaHora;
      recHoras.innerHTML = marcaHora;
    }
  },

  // COMANDOS

  iniciar() {
    contenedorTiempo = setInterval(this.contadorCronometro, 10);
  },

  parar() {
    let detener = clearInterval(contenedorTiempo);
  },

  limpiar() {
    clearInterval(contenedorTiempo);

    recHoras.innerHTML = "00";
    marcaHora = 0;

    recMinutos.innerHTML = "00";
    marcaMinutos = 0;

    recSegundos.innerHTML = "00";
    marcaSegundos = 0;

    recCeSegundos.innerHTML = "00";
    marcaCeSegundos = 0;
  },

  grabar() {
    grabado = `
    <div>
      ${marcaHora} : ${marcaMinutos} : ${marcaSegundos} : ${marcaCeSegundos}
    </div>`;

    contenedorGrabaciones.innerHTML = grabado;
  },

  limpiarGrab() {
    contenedorGrabaciones.innerHTML = "00 : 00 : 00 : 00";
  },
};

// Asignacion.
let asignar = (e) => {
  e.innerHTML = `${grabado}`;
};

// ACTIVADORES

btnIniciar.onclick = () => {
  cronometro.iniciar();
  btnIniciar.disabled = true;
  btnGrabar.disabled = false;
};

btnParar.onclick = () => {
  cronometro.parar();
  btnIniciar.disabled = false;
};

btnGrabar.onclick = () => {
  cronometro.grabar();
};

btnReset.onclick = () => {
  cronometro.limpiar();
  btnIniciar.disabled = false;
  btnGrabar.disabled = true;
};

btnLimpiarGrab.onclick = () => {
  cronometro.limpiarGrab();
};

// BOX DE IMAGEN
let boxImagenes = document.querySelector(".proceso_actual");
boxImagenes.innerHTML = `
<div class="informacion"><h3>${modelos.modelo}</h3> <h3>${modelos.chasis}</h3> <h3>ASIGNACION ACTUAL: ${numAsignacion}</h3></div>
<img src="${modelos.proceso[0]}"/>`;

// AREAS PARA ASIGNACION DOM
// Contenedores Areas.

const selecMecanica = document.querySelector(".selec_mecanica");
const selecEstructura = document.querySelector(".selec_estructura");
const selecChaperia = document.querySelector(".selec_chaperia");
const selecTerminacion = document.querySelector(".selec_terminacion");
const selecPintura = document.querySelector(".selec_pintura");

// Contenedor Botones.

const btnMecanica = document.querySelector(".asignar__Mecanica");
const btnEstructura = document.querySelector(".asignar__estructura");
const btnChaperia = document.querySelector(".asignar__chaperia");
const btnTerminacion = document.querySelector(".asignar__terminacion");
const btnPintura = document.querySelector(".asignar__pintura");

const btnCompletar = document.querySelector(".boton_completar");

btnCompletar.style.backgroundColor = "gray";

// Funciones de guardado.

// Bloqueo General
const bloqueo = () => {
  btnEstructura.disabled = true;
  btnChaperia.disabled = true;
  btnTerminacion.disabled = true;
  btnPintura.disabled = true;
  btnCompletar.disabled = true;
};

bloqueo();

btnMecanica.addEventListener("click", () => {
  Swal.fire({
    title: "¿Desea confirmar guardado?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Guardado", "", "success");
      asignar(selecMecanica);
      btnMecanica.disabled = true;
      btnMecanica.style.backgroundColor = "gray";
      btnMecanica.innerHTML = "ASIGNADO";
      btnEstructura.disabled = false;
      btnEstructura.style.backgroundColor = "green";
      btnEstructura.innerHTML = "ASIGNAR";
      boxImagenes.innerHTML = `
      <div class="informacion"><h3>${modelos.modelo}</h3> <h3>${modelos.chasis}</h3> <h3>ASIGNACION ACTUAL: ${numAsignacion}</h3></div>
      <img src="${modelos.proceso[1]}"/>`;
    } else {
      Swal.fire("Los cambios no han sido guarados", "", "info");
    }
  });
});

btnEstructura.addEventListener("click", () => {
  Swal.fire({
    title: "¿Desea confirmar guardado?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Guardado", "", "success");
      asignar(selecEstructura);
      btnEstructura.disabled = true;
      btnEstructura.style.backgroundColor = "gray";
      btnEstructura.innerHTML = "ASIGNADO";
      btnChaperia.disabled = false;
      btnChaperia.style.backgroundColor = "green";
      btnChaperia.innerHTML = "ASIGNAR";
      boxImagenes.innerHTML = `
      <div class="informacion"><h3>${modelos.modelo}</h3> <h3>${modelos.chasis}</h3> <h3>ASIGNACION ACTUAL: ${numAsignacion}</h3></div>
      <img src="${modelos.proceso[2]}"/>`;
    } else {
      Swal.fire("Los cambios no han sido guarados", "", "info");
    }
  });
});

btnChaperia.addEventListener("click", () => {
  Swal.fire({
    title: "¿Desea confirmar guardado?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Guardado", "", "success");
      asignar(selecChaperia);
      btnChaperia.disabled = true;
      btnChaperia.style.backgroundColor = "gray";
      btnChaperia.innerHTML = "ASIGNADO";
      btnTerminacion.disabled = false;
      btnTerminacion.style.backgroundColor = "green";
      btnTerminacion.innerHTML = "ASIGNAR";
      boxImagenes.innerHTML = `
      <div class="informacion"><h3>${modelos.modelo}</h3> <h3>${modelos.chasis}</h3> <h3>ASIGNACION ACTUAL: ${numAsignacion}</h3></div>
      <img src="${modelos.proceso[3]}"/>`;
    } else {
      Swal.fire("Los cambios no han sido guarados", "", "info");
    }
  });
});

btnTerminacion.addEventListener("click", () => {
  Swal.fire({
    title: "¿Desea confirmar guardado?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Guardado", "", "success");
      asignar(selecTerminacion);
      btnTerminacion.disabled = true;
      btnTerminacion.style.backgroundColor = "gray";
      btnTerminacion.innerHTML = "ASIGNADO";
      btnPintura.disabled = false;
      btnPintura.style.backgroundColor = "green";
      btnPintura.innerHTML = "TERMINAR";
      boxImagenes.innerHTML = `
      <div class="informacion"><h3>${modelos.modelo}</h3> <h3>${modelos.chasis}</h3> <h3>ASIGNACION ACTUAL: ${numAsignacion}</h3></div>
      <img src="${modelos.proceso[4]}"/>`;
    } else {
      Swal.fire("Los cambios no han sido guarados", "", "info");
    }
  });
});

btnPintura.addEventListener("click", () => {
  Swal.fire({
    title: "¿Desea confirmar guardado?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Guardado", "", "success");
      asignar(selecPintura);
      btnPintura.disabled = true;
      btnPintura.style.backgroundColor = "gray";
      btnPintura.innerHTML = "ASIGNADO";
      btnCompletar.disabled = false;
      btnCompletar.style.backgroundColor = "#3a2ca5";
    } else {
      Swal.fire("Los cambios no han sido guarados", "", "info");
    }
  });
});

btnCompletar.addEventListener("click", () => {
  Swal.fire({
    title: `<h3>¡Unidad Terminada!</h3>
    Cargue una nueva unidad de produccion.`,
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff",
    backdrop: `
    rgba(0,0,123,0.4)
    url("../assets/img/tecnico.gif")
    left top
    no-repeat
  `,
  });
  const origen = "./index.html";
  setTimeout(() => {
    window.history.back();
  }, 2000);
});
