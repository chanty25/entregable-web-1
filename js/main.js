// Menú hamburguesa: abre y cierra la lista del nav en celular

// 1. Buscar los elementos en el HTML
let boton = document.getElementById("hamburguesa");
let menu = document.getElementById("item-nav");
let enlaces = document.querySelectorAll("#item-nav a");

// 2. Función que abre o cierra el menú
function abrirCerrarMenu() {
    if (menu.classList.contains("abierto")) {
        menu.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
    } else {
        menu.classList.add("abierto");
        boton.setAttribute("aria-expanded", "true");
    }
}

// 3. Función que cierra el menú
function cerrarMenu() {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
}

// 4. Cuando se hace clic en el botón, se abre o se cierra
boton.addEventListener("click", abrirCerrarMenu);

// 5. Cuando se hace clic en un enlace, el menú se cierra
for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", cerrarMenu);
}
