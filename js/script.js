// REGISTRO DE USUARIO
// > Formulario de Ingreso
let registroLogin = [];

const registroUsuarios = () => {
  localStorage.setItem("usuariosIngresados", JSON.stringify(registroLogin));
};

const botonInvitado = document.querySelector("#invitadoRec");

const usuarioIngresado = () => {
  ingreso.style.display = "none";

  // INGRESO INCORRECTO
  if (
    nombreDeUsuario == "" ||
    apellidoDeUsuario == "" ||
    legajoDeUsuario == ""
  ) {
    login.innerHTML = `<h2>¡Bienvenido Invitado!</h2>`;

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "question",
      title: "Ingreso como invitado",
    });

    // INGRESO CORRECTO
  } else {
    login.innerHTML = `<h2>¡Bienvenido al sistema ${nombreDeUsuario} ${apellidoDeUsuario} su legajo es ${legajoDeUsuario}!</h2>`;
    registroLogin.push(legajoDeUsuario);

    botonInvitado.style.display = "block";

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Ingreso Correcto",
    });
  }
  registroUsuarios();

  botonInvitado.addEventListener("click", () => {
    sessionStorage.removeItem("nombreDeUsuario");
    sessionStorage.removeItem("apellidoDeUsuario");
    sessionStorage.removeItem("legajoDeUsuario");
    window.location.reload();
  });
};

// Storage Ingreso
let nombreDeUsuario = sessionStorage.getItem("nombreDeUsuario");
let apellidoDeUsuario = sessionStorage.getItem("apellidoDeUsuario");
let legajoDeUsuario = sessionStorage.getItem("legajoDeUsuario");

//Referenciacion DOM
const formulario = document.getElementById("form");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const legajo = document.getElementById("legajo");
const ingreso = document.querySelector(".ingreso");
const login = document.getElementById("login");

// Click Submit

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  nombreDeUsuario = nombre.value;
  apellidoDeUsuario = apellido.value;
  legajoDeUsuario = legajo.value;

  sessionStorage.setItem("nombreDeUsuario", nombre.value);
  sessionStorage.setItem("apellidoDeUsuario", apellido.value);
  sessionStorage.setItem("legajoDeUsuario", legajo.value);

  usuarioIngresado();
});

!!nombreDeUsuario &&
  !!apellidoDeUsuario &&
  !!legajoDeUsuario &&
  usuarioIngresado();

// REGISTRO DE USUARIO > END

// Seleccion de Productos >
// SELECCION DE CONTENEDOR
const contenedorModelos = document.getElementById("modelo");
const chasisCargados = document.getElementById("chasisCargados");

// BOTONES
const botonContinuar = document.querySelector(".botonSeguir");
const volverSeleccion = document.querySelector(".volverElegir");
const asignarUnidad = document.querySelector("#asignacion");
const volverElegir = document.querySelector("#volverElegir");

const imagenProducto = document.querySelector("#imagenProductos");

// BOX DE CARGA UNIDAD Y ASIGNACION
const unidadCargada = [];
let numeroAsignacion = [];

// INSERTAR OPCIONES DE PRODUCTOS
const insertarProductos = () => {
  fetch("./js/productos.json")
    .then((respuesta) => respuesta.json())
    .then((resultados) => {
      for (const producto of resultados) {
        let contenedor = document.createElement("div");
        contenedor.className = "producto-modelos";
        contenedor.innerHTML = `
    <button><div class="descripcion-producto">
    <p> ${producto.modelo}</p>
    ${producto.chasis}
    </div></button>`;

        contenedor.onclick = () => {
          colocarModelo(producto);
          unidadCargada.push(producto);
        };

        contenedorModelos.append(contenedor);
      }
    });
};
insertarProductos();

// INSERCION EN BOX DE MODELO
const boxModelos = document.getElementById("eModelo");
const contenedorPlano = document.getElementById("imagen-producto");

const colocarModelo = (producto) => {
  const contenedor = document.createElement("div");
  contenedor.innerHTML = `
  <div id="ejemplo1" class="descripcion-producto">
  <p>${producto.modelo}</p>
  <p>${producto.chasis}</p>
  </div>`;

  boxModelos.append(contenedor);
  imagenProducto.innerHTML = `
  <img src="${producto.imagen}"/>`;

  // ESCONDER BOTONERA DE SELECCION DE PRODUCTO

  unidadCargada.length <= 1
    ? (contenedorModelos.style.display = "none") &&
      (botonContinuar.style.display = "flex") &&
      (volverSeleccion.style.display = "flex") &&
      (asignarUnidad.style.display = "flex")
    : (botonContinuar.style.display = "none");

  // CARGA DE UNIDAD
  botonContinuar.addEventListener("click", () => {
    Swal.fire("Producto cargado", " ", "success");
    localStorage.setItem("unidadesCargadas", JSON.stringify(producto));
    setTimeout(() => {
      window.location.href = "../pages/cronometro.html";
    }, 2000);
  });

  // VOLVER A ELEGIR
  volverElegir.onclick = () => {
    unidadCargada.shift();
    contenedorModelos.style.display = "block";
    contenedor.innerHTML = "";
    imagenProducto.innerHTML = `
    <img src="./assets/img/unidades.png" alt="" />`;
    localStorage.removeItem("unidadesCargadas");
  };
};

// ASIGNAR UNIDAD
asignarUnidad.addEventListener("click", () => {
  Swal.fire({
    title: "Ingresa la Asignacion",
    input: "text",
    inputLabel: "Año y numero (ej: 22-1200)",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "Debe escribir algo";
      } else {
        numeroAsignacion.push(value);
        localStorage.setItem(
          "numeroAsignado",
          JSON.stringify(numeroAsignacion)
        );
      }
    },
  });
});
