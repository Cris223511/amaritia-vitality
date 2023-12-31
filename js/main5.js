/*--------------------------------------------------------------
# Lenguajes (lateral)
--------------------------------------------------------------*/

window.addEventListener("load", () => {
  let language2 = document.querySelector(".language2");
  let ul = document.querySelector(".ul");
  let li = document.querySelectorAll(".li");

  language2.addEventListener("click", function () {
    if (getComputedStyle(ul).display === "none") {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  });

  li.forEach(function (item) {
    item.addEventListener("click", function () {
      ul.style.display = "none";
    });
  });
});

/*--------------------------------------------------------------
# Preloader
--------------------------------------------------------------*/

let imagen = document.querySelector('.preloader .imagen');
let preloader = document.querySelector(".preloader");

document.body.style.overflow = "hidden";

imagen.classList.add('aparecer');
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("desaparecer");
    preloader.addEventListener("animationend", () => {
      preloader.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }, 2000);
});

/*--------------------------------------------------------------
# Ir arriba
--------------------------------------------------------------*/

let backtotop = document.querySelector(".back-to-top");

if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active2");
    } else {
      backtotop.classList.remove("active2");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  window.addEventListener("scroll", toggleBacktotop);
}

/*--------------------------------------------------------------
# Navegador lateral
--------------------------------------------------------------*/

var toggle = document.querySelector(".toggle");
var menu = document.getElementById("menu");
var sidebar = document.querySelector(".navegador_lateral");

toggle.addEventListener("click", function () {
  sidebar.classList.toggle("active3");
  if (sidebar.classList.contains("active3")) {
    document.body.style.overflow = "hidden";
  } else {
    setTimeout(function () {
      document.body.style.overflow = "auto";
    }, 300);
  }
});

menu.addEventListener("click", function () {
  toggle.click();
});

/*--------------------------------------------------------------
# Navegador principal
--------------------------------------------------------------*/

// identificar la posición del scroll

// const window2 = document.defaultView;

// window2.addEventListener("scroll", () => {
//   const scrollPositionY = window.scrollY;
//   console.log(`Posición del scroll Y: ${scrollPositionY}px`);
// });

const btnInicio = document.querySelector('.navegador .botones a[href="#"]');
const btnNoi = document.querySelector('.navegador .botones a[href="#noi"]');
const btnGalleria = document.querySelector('.navegador .botones a[href="#galleria"]');
const btnTestimonios = document.querySelector('.navegador .botones a[href="#testimonianze"]');
const btnPreguntas = document.querySelector('.navegador .botones a[href="#preguntas"]');
const btnContattaci = document.querySelector('.navegador .botones a[href="#contattaci"]');

const botones = [
  { btn: btnInicio, pos: [0, 400] },
  { btn: btnNoi, pos: [400, 2690] },
  { btn: btnTestimonios, pos: [2690, 3400] },
  { btn: btnPreguntas, pos: [3400, 4400] },
  { btn: btnGalleria, pos: [4400, 6200] },
  { btn: btnContattaci, pos: [6200, Infinity] },
];

let btnActivo = btnInicio;

function setBtnActivo(btn) {
  btnActivo.classList.remove('activo');
  btn.classList.add('activo');
  btnActivo = btn;
}

botones.forEach(({ btn, pos }) => {
  btn.addEventListener('click', function () {
    setBtnActivo(btn);
  });
});

window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;

  const { btn: btnActual } = botones.find(({ pos }) => scrollPosition >= pos[0] && scrollPosition < pos[1]);

  if (btnActual !== btnActivo) {
    setBtnActivo(btnActual);
  }
});

/*--------------------------------------------------------------
# Cookies
--------------------------------------------------------------*/

const cookies = document.querySelector(".cookies");
const cancelarCookies = document.querySelector(".btn1");
const aceptarCookies = document.querySelector(".btn2");

window.addEventListener("load", function () {
  if (
    localStorage.getItem("cookiesAccepted") == null ||
    localStorage.getItem("cookiesAccepted") == "false"
  ) {
    localStorage.setItem("cookiesAccepted", false);
    setTimeout(function () {
      cookies.classList.add("active");
    }, 4000);
  } else {
    cookies.style.display = "none";
  }
});

cancelarCookies.addEventListener("click", function () {
  cookies.style.display = "none";
});

aceptarCookies.addEventListener("click", function () {
  setCookie("miCookie", "miValor", 7);
  cookies.style.display = "none";
  localStorage.setItem("cookiesAccepted", true);
});

function setCookie(name, value, expirationDays) {
  const expirationMs = expirationDays * 24 * 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + expirationMs).toUTCString();
  const cookieValue = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate}; path=/`;

  document.cookie = cookieValue;
  localStorage.setItem(name, value);
}

/*--------------------------------------------------------------
# Testimonials (Swiper Library)
--------------------------------------------------------------*/

new Swiper(".testimonianze-slider", {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

/*--------------------------------------------------------------
# Sección preguntas frecuentes
--------------------------------------------------------------*/

const preguntas = document.querySelectorAll('.preguntas');
let animating = false;

preguntas.forEach((pregunta) => {
  const tituloPregunta = pregunta.querySelector('.titulo-pregunta');
  const respuesta = pregunta.querySelector('.respuesta');
  respuesta.style.visibility = "hidden";

  tituloPregunta.addEventListener('click', () => {
    if (animating) return;
    animating = true;

    pregunta.classList.toggle('activa');
    const alturaRealRespuesta = respuesta.scrollHeight;

    if (!respuesta.style.maxHeight) {
      respuesta.style.maxHeight = alturaRealRespuesta + 'px';
      respuesta.style.visibility = "visible";
      animating = false;
    } else {
      respuesta.style.maxHeight = null;
      respuesta.addEventListener('transitionend', () => {
        respuesta.style.visibility = "hidden";
        animating = false;
      }, { once: true });
    }

    preguntas.forEach((elemento) => {
      if (pregunta !== elemento) {
        elemento.classList.remove('activa');
        if (elemento.querySelector('.respuesta').style.maxHeight) {
          animating = true;
          elemento.querySelector('.respuesta').addEventListener('transitionend', () => {
            elemento.querySelector('.respuesta').style.visibility = "hidden";
            animating = false;
          }, { once: true });
        }
        elemento.querySelector('.respuesta').style.maxHeight = null;
      }
    });
  });
});

/*--------------------------------------------------------------
# Galleria (GLightbox)
--------------------------------------------------------------*/

const galelryLightbox = GLightbox({
  selector: ".galleria-lightbox",
});

const contenedorGaleria = document.querySelector('.gallery-container');
const botonVerMas = document.querySelector('.boton_ver_mas');
const botonVerMenos = document.querySelector('.boton_ver_menos');

const IMAGENES_POR_PAGINA = 3;

let paginaActual = 1;

const TOTAL_PAGINAS = Math.ceil(contenedorGaleria.children.length / IMAGENES_POR_PAGINA);

function mostrarPagina(pagina) {
  const indiceInicio = (pagina - 1) * IMAGENES_POR_PAGINA;
  const indiceFin = indiceInicio + IMAGENES_POR_PAGINA;
  for (let i = indiceInicio; i < indiceFin && i < contenedorGaleria.children.length; i++) {
    contenedorGaleria.children[i].classList.remove('d-none');
  }
}

function ocultarPagina(pagina) {
  const indiceInicio = (pagina - 1) * IMAGENES_POR_PAGINA;
  const indiceFin = indiceInicio + IMAGENES_POR_PAGINA;
  for (let i = indiceInicio; i < indiceFin && i < contenedorGaleria.children.length; i++) {
    contenedorGaleria.children[i].classList.add('d-none');
  }
}

function actualizarBotones() {
  if (paginaActual === 1) {
    botonVerMas.classList.remove('d-none');
    botonVerMenos.classList.add('d-none');
  } else if (paginaActual === TOTAL_PAGINAS) {
    botonVerMas.classList.add('d-none');
    botonVerMenos.classList.remove('d-none');
  } else {
    botonVerMas.classList.remove('d-none');
    botonVerMenos.classList.remove('d-none');
  }
}

mostrarPagina(paginaActual);
actualizarBotones();

botonVerMas.addEventListener('click', () => {
  paginaActual++;
  mostrarPagina(paginaActual);
  actualizarBotones();
  if (paginaActual === TOTAL_PAGINAS) {
    botonVerMas.classList.add('d-none');
  }
});

botonVerMenos.addEventListener('click', () => {
  ocultarPagina(paginaActual);
  paginaActual--;
  mostrarPagina(paginaActual);
  actualizarBotones();
  if (paginaActual === 1) {
    botonVerMenos.classList.add('d-none');
  }
  botonVerMas.classList.remove('d-none');
});

/*--------------------------------------------------------------
# Sección contacto (lógica del formulario)
--------------------------------------------------------------*/

const formEs = document.querySelector("#form-es");
const formEn = document.querySelector("#form-en");
const buttonMailto = document.querySelector("#emailto");

if (formEs != null)
  formEs.addEventListener("submit", handleSubmitEs)
if (formEn != null)
  formEn.addEventListener("submit", handleSubmitEn)

function handleSubmitEs(event) {
  event.preventDefault();
  const formData = new FormData(this);
  // console.log(formData.get("name"));
  buttonMailto.setAttribute("href", `mailto:amaritiavit_ventas@gmail.com?subject=${formData.get("subject")}&body=Hola Amaritia Vitality, mi nombre es ${formData.get("name")} y mi número de teléfono es: ${formData.get("cellphone")}. ${formData.get("message")}`)
  buttonMailto.click();
  window.location.href = "index.html";
}

function handleSubmitEn(event) {
  event.preventDefault();
  const formData = new FormData(this);
  // console.log(formData.get("name"));
  buttonMailto.setAttribute("href", `mailto:amaritiavit_ventas@gmail.com?subject=${formData.get("subject")}&body=Hello Amaritia Vitality, my name is ${formData.get("name")} and my phone number is: ${formData.get("cellphone")}. ${formData.get("message")}`)
  buttonMailto.click();
  window.location.href = "index.html";
}

/*--------------------------------------------------------------
# Contador
--------------------------------------------------------------*/

new PureCounter();