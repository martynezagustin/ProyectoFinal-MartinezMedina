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
            text: "Agregaste el " + cursoToAdd.nombre + " a tu plan de formación! 🚀",
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
            <button class="btn btn-remove btn-secondary" data-id=${curso.id} id="curso-${curso.id}">ELIMINAR</button>
            <button class="btn btn-information btn-secondary" data-id=${curso.id} id="info-${curso.id}">VER INFO</button>
            </div>`
            containerFormacion.append(div)
            const btnRemove = document.querySelectorAll('.btn-remove')
            //llamar a la función de remover curso
            btnRemove.forEach((boton) => {
                boton.addEventListener("click", removeCurso)
            })
            //funcionalidad en el carrito para la info
            const btnInfo = document.querySelectorAll('.btn-information')
            btnInfo.forEach((boton) => {
                boton.addEventListener("click", (e) => {
                    const cursoSelected = coursesCart.find((c) => c.id === parseInt(e.target.dataset.id))
                    Swal.fire(
                        cursoSelected.nombre,
                        cursoSelected.descripcionLarga,
                        'info'
                      )
                })
            })
        })
    }
}


//remueve el curso
function removeCurso(e) {
    const cursoARemover = coursesCart.find((curso) => curso.id === parseInt(e.target.dataset.id))
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

//si queremos vaciar, y está en 0, tira el siguiente error
botonVaciar.addEventListener("click", () => {
    if(coursesCart.length === 0){
        Swal.fire(
            'No podes vaciar, porque no tenés ningún curso añadido.',
            '',
            'error'
          )
    } else{
        coursesCart.splice(0, coursesCart.length)
        localStorage.setItem('Cursos', JSON.stringify(coursesCart))
        renderizarCarrito()
    }
})


renderizarCarrito()