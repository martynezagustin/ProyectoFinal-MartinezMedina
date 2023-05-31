const containerFormacion = document.getElementById('containerFormacion')
const counterCourses = document.getElementById('count-course')
const botonVaciar = document.getElementById('vaciar-carrito')

let coursesCart = JSON.parse(localStorage.getItem('Cursos')) || []
//funcionalidad de botones de ADD

const cargarEvento = () => {
    const buttonAdd = document.querySelectorAll('.btn-add')
    buttonAdd.forEach((agregar) => {
        agregar.addEventListener("click", (e) => {
            agregarAlPlan(e.target.id)
        })
    
    })
}

//agrega al carrito de formación
function agregarAlPlan(id) {
    let cursoToAdd = cursosGlobal.find(curso => curso.id === parseInt(id))
    const cursoExistente = coursesCart.some(curso => curso.id === parseInt(id))
    if (cursoExistente) {
        Toastify({
            text: "No podés agregar el mismo curso 2 veces.",
            duration: 2000,
            style: {
                background: "red",
            },
            close: true,
        }).showToast();
    } else {
        coursesCart.push(cursoToAdd);

        Toastify({
            text: "Perfecto! Agregaste " + cursoToAdd.nombre + " a tu plan de formación! 🚀",
            duration: 1800,
            style: {
                background: "linear-gradient(to right, rgb(52,52,52), rgb(12, 12, 12))",
            }
        }).showToast();

        localStorage.setItem("Cursos", JSON.stringify(coursesCart))
        renderizarCarrito()
    }
}
//actualiza el carrito
function renderizarCarrito() {
    containerFormacion.innerHTML = ""
    counterCourses.innerHTML = `<b>(` + coursesCart.length + `)</b>` || []
    if (coursesCart.length === 0) {
        containerFormacion.innerHTML = `<p>Aún no agregaste ningún curso</p>`
    } else {
        coursesCart.forEach((curso) => {
            const div = document.createElement('div')
            div.classList.add('card')
            div.classList.add('ancho-card')
            div.classList.add('mt-4')
            div.innerHTML = `<div class="card-body">
            <h5 class="card-title">${curso.nombre}</h5>
            <p class="card-duration"><b>Duración: <i>${curso.duracion}</i></b></p>
            <p class="card-text">${curso.descripcion}</p>
            <button onclick=removeCurso(${curso.id}) class="btn btn-add btn-secondary" id="${curso.id}">ELIMINAR</button>
            </div>`
            containerFormacion.append(div)
        })
    }
}
//remueve el curso
function removeCurso(id) {
    const cursoARemover = coursesCart.find((curso) => curso.id === id)
    const index = coursesCart.indexOf(cursoARemover)
    Swal.fire({
        title: '¿Desea remover el siguiente curso? ' +  cursoARemover.nombre,
        text: "Deberá volverlo a agregar en todo caso...",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deseo borrarlo',
        cancelButtonText: 'No, no quiero'
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
          Swal.fire(
            'Ha eliminado el curso de su Plan de Formación',
            'Acción realizada con éxito'
          )
          coursesCart.splice(index, 1)
          localStorage.setItem("Cursos", JSON.stringify(coursesCart))
          renderizarCarrito()
        } else{
            Swal.fire(
                'Puede seguir disfrutando de su curso entonces 😊',
              )
        }
      })
}

botonVaciar.addEventListener("click", () => {
    if(coursesCart.length === 0){
        alert("No podés vaciar, porque no tenés ningún curso añadido")
    } else{
        coursesCart.splice(0, coursesCart.length)
        localStorage.setItem('Cursos', JSON.stringify(coursesCart))
        renderizarCarrito()
    }
})


renderizarCarrito()