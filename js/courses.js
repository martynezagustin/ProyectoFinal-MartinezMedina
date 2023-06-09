
const cursosGlobal = []

//Consumo de la API de courses JSON
fetch("../js/courses.json")
.then(response => response.json())
.then(data => {
    //invocación de data cursos
    const cursos = data["cursos"]

    const rowProgramacion = document.querySelector('.programacion')
    const rowMarketingAndEmpresas = document.querySelector('.marketing')

    localStorage.setItem('CursosList', JSON.stringify(data))

    const cursosProgram = cursos.filter((curso) => curso.categoria === 'Programación')
    const cursosMarketingAndEmpresas = cursos.filter((curso) => curso.categoria === 'Marketing y Empresas')
    
    
    //crea cursos en marketing y empresas por cada uno en categoría 'Programación'
    cursosProgram.forEach((curso) => {

        cursosGlobal.push(curso)

        const cursoDiv = document.createElement('div')
        cursoDiv.classList.add('card')
        cursoDiv.classList.add('ancho-card')
        cursoDiv.innerHTML = `<img src=${curso.img} alt="curso-desarrollo-web">
        <div class="card-body">
        <h5 class="card-title">${curso.nombre}</h5>
        <p class="card-duration"><b>Duración: <i>${curso.duracion}</i></b></p>
        <p class="card-text">${curso.descripcion}</p>
        <button class="btn btn-add btn-secondary" id="${curso.id}">AÑADIR A MI PLAN</button>
        <a href="./course_detail.html" class="btn btn-view-course mt-2 btn-secondary" id="${curso.referenceHTML}">VER CURSO</a>
        </div>`
    
        rowProgramacion.appendChild(cursoDiv)
    })
    
    //crea cursos en marketing y empresas por cada uno en categoría 'Marketing y Empresas'
    cursosMarketingAndEmpresas.forEach((curso) => {

        cursosGlobal.push(curso)

        const cursoDiv = document.createElement('div')
        cursoDiv.classList.add('card')
        cursoDiv.classList.add('ancho-card')
        cursoDiv.innerHTML = `<img src="${curso.img}" class="card-img-top"
                    alt="curso-desarrollo-web">
                    <div class="card-body">
                    <h5 class="card-title">${curso.nombre}</h5>
                    <p class="card-duration"><b>Duración: <i>${curso.duracion}</i></b></p>
                    <p class="card-text">${curso.descripcion}</p>
                    <button class="btn btn-add btn-secondary" id="${curso.id}">AÑADIR A MI PLAN</button>
                    <a href="./course_detail.html" class="btn btn-view-course mt-2 btn-secondary" id="${curso.referenceHTML}">VER CURSO</a>
                    </div>`
    
        rowMarketingAndEmpresas.appendChild(cursoDiv)
    })
    
    //el botón de ver curso
    const btnVerCurso = document.querySelectorAll('.btn-view-course')
    
    //funcionalidad de DOM que guarda el curso seleccionado para generarlo en otra pág
    btnVerCurso.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const referenciaHTML = e.target.id
            const curso = cursos.find((c) => c.referenceHTML === referenciaHTML)
            localStorage.setItem('cursoSeleccionado', JSON.stringify(curso))
            window.location.href = 'course_detail.html'
        })
    })

    cargarEvento()
})
.catch(error => {
    Swal.fire(
        'Los cursos no pueden cargar porque ocurrió el siguiente error: ' + error,
        '',
        'error'
      )
})