// =====================================================
// 1. Menú hamburguesa (celular)
// =====================================================
let boton = document.getElementById("hamburguesa");
let menu = document.getElementById("item-nav");
let enlaces = document.querySelectorAll("#item-nav a");

function abrirCerrarMenu() {
    if (menu.classList.contains("abierto")) {
        cerrarMenu();
    } else {
        menu.classList.add("abierto");
        boton.setAttribute("aria-expanded", "true");
        boton.setAttribute("aria-label", "Cerrar menú");
    }
}

function cerrarMenu() {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
}

boton.addEventListener("click", abrirCerrarMenu);

// Al tocar un enlace, el menú se cierra para dejar ver la sección
for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", cerrarMenu);
}


// =====================================================
// 2. Carrusel automático
// =====================================================
let slider = document.getElementById("slider");
let slides = document.querySelectorAll(".slide");
let puntos = document.querySelectorAll(".punto");
let flechaAnterior = document.getElementById("slider-anterior");
let flechaSiguiente = document.getElementById("slider-siguiente");
let botonPausa = document.getElementById("slider-pausa");

let actual = 0;        // número de la foto que se está mostrando (empieza en 0)
let temporizador;      // aquí se guarda el intervalo que cambia las fotos
let pausado = false;   // true cuando la persona pausó el carrusel con el botón

// Muestra la foto número "n" y oculta la que estaba antes
function mostrarSlide(n) {
    slides[actual].classList.remove("activo");
    puntos[actual].classList.remove("activo");

    // Si se pasa de la última vuelve a la primera, y al revés
    if (n >= slides.length) {
        n = 0;
    }
    if (n < 0) {
        n = slides.length - 1;
    }

    actual = n;
    slides[actual].classList.add("activo");
    puntos[actual].classList.add("activo");
}

function siguienteSlide() {
    mostrarSlide(actual + 1);
}

// Cambia de foto sola cada 7 segundos (7000 milisegundos).
// Si la persona pausó el carrusel, no arranca.
function iniciarAutomatico() {
    clearInterval(temporizador);
    if (pausado) {
        return;
    }
    temporizador = setInterval(siguienteSlide, 7000);
}

function detenerAutomatico() {
    clearInterval(temporizador);
}

// Al usar las flechas o los puntos se reinicia el conteo,
// para que la foto no cambie justo después de elegirla
function irAlSiguiente() {
    mostrarSlide(actual + 1);
    iniciarAutomatico();
}

function irAlAnterior() {
    mostrarSlide(actual - 1);
    iniciarAutomatico();
}

flechaSiguiente.addEventListener("click", irAlSiguiente);
flechaAnterior.addEventListener("click", irAlAnterior);

// Cada punto lleva a su foto
for (let i = 0; i < puntos.length; i++) {
    puntos[i].addEventListener("click", function () {
        mostrarSlide(i);
        iniciarAutomatico();
    });
}

// Mientras el mouse está encima del carrusel, se pausa
slider.addEventListener("mouseenter", detenerAutomatico);
slider.addEventListener("mouseleave", iniciarAutomatico);

// Botón de pausa: detiene o reanuda el carrusel (sirve también en celular)
function pausarReanudar() {
    if (pausado) {
        pausado = false;
        botonPausa.classList.remove("pausado");
        botonPausa.setAttribute("aria-label", "Pausar el carrusel");
        iniciarAutomatico();
    } else {
        pausado = true;
        botonPausa.classList.add("pausado");
        botonPausa.setAttribute("aria-label", "Reanudar el carrusel");
        detenerAutomatico();
    }
}

botonPausa.addEventListener("click", pausarReanudar);

// Si la persona pidió menos animaciones en su sistema, el carrusel empieza pausado
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pausarReanudar();
}

iniciarAutomatico();


// =====================================================
// 3. Carrusel del plan de estudios
// =====================================================
let pista = document.getElementById("pensum-pista");
let tarjetas = document.querySelectorAll(".semestre");
let pensumAnterior = document.getElementById("pensum-anterior");
let pensumSiguiente = document.getElementById("pensum-siguiente");
let puntosPensum = document.querySelectorAll(".punto-pensum");

// Distancia entre una tarjeta y la siguiente (ancho de la tarjeta + espacio).
// Se calcula cada vez porque cambia según el tamaño de la pantalla.
function anchoPaso() {
    return tarjetas[1].offsetLeft - tarjetas[0].offsetLeft;
}

// Mueve la pista una tarjeta: dirección 1 = adelante, -1 = atrás
function moverPensum(direccion) {
    pista.scrollBy({ left: direccion * anchoPaso(), behavior: "smooth" });
}

function pensumAdelante() {
    moverPensum(1);
}

function pensumAtras() {
    moverPensum(-1);
}

pensumSiguiente.addEventListener("click", pensumAdelante);
pensumAnterior.addEventListener("click", pensumAtras);

// Marca los puntos de los semestres que se están viendo
function actualizarPuntosPensum() {
    // scrollLeft = cuánto se ha deslizado la pista hacia la derecha
    let primero = Math.round(pista.scrollLeft / anchoPaso());
    let visibles = Math.round(pista.clientWidth / anchoPaso());

    for (let i = 0; i < puntosPensum.length; i++) {
        if (i >= primero && i < primero + visibles) {
            puntosPensum[i].classList.add("activo");
        } else {
            puntosPensum[i].classList.remove("activo");
        }
    }
}

// Cada punto lleva a su semestre
for (let i = 0; i < puntosPensum.length; i++) {
    puntosPensum[i].addEventListener("click", function () {
        pista.scrollTo({ left: i * anchoPaso(), behavior: "smooth" });
    });
}

pista.addEventListener("scroll", actualizarPuntosPensum);
window.addEventListener("resize", actualizarPuntosPensum);
actualizarPuntosPensum();


// =====================================================
// 4. Botón "volver arriba"
// =====================================================
let volverArriba = document.getElementById("volver-arriba");

function revisarScroll() {
    // window.scrollY dice cuántos píxeles ha bajado la persona
    if (window.scrollY > 600) {
        volverArriba.classList.add("visible");
    } else {
        volverArriba.classList.remove("visible");
    }
}

window.addEventListener("scroll", revisarScroll);
