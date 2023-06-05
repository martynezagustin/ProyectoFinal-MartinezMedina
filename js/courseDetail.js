//Se referencia al curso en el localStorage
const cursoReferencia = JSON.parse(localStorage.getItem('cursoSeleccionado'));
const contenedorCurso = document.getElementById('detalle-producto')

//creación del curso en función del click
function invocarCurso() {
    setTimeout(() => {;
        try {
        contenedorCurso.style.display = 'flex'
        const div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('flex-column')
        div.classList.add('p-3')
        div.innerHTML = `<div class="d-flex">
    <img src="${cursoReferencia.img}" class="w-25 course-img-detail mb-4 mt-4">
    </div>
    <h2>${cursoReferencia.nombre}</h2>
    <h3 class="text-start">${cursoReferencia.duracion}</h3>
    <h2 class="text-start mt-3">DESCRIPCIÓN</h2>
    <p>${cursoReferencia.descripcionLarga}</p>`
        contenedorCurso.appendChild(div)
    } catch (error) {
        contenedorCurso.style.display = 'flex'
        const div = document.createElement('div')
        div.classList.add('d-flex')
        div.classList.add('flex-column')
        div.classList.add('p-3')
        div.style.backgroundColor = "red"
        div.innerHTML = `<h2>Ocurrió el siguiente error: ${error}. Inténtalo en otro momento.</h2>`
        contenedorCurso.appendChild(div)
    }
},1000)
}

invocarCurso()