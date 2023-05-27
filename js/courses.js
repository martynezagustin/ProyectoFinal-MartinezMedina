//selección de las filas de las categorías

//selecciona los cursos por categoría
fetch("./courses.json")
.then(response => response.json)
.then(data => {
    const rowProgramacion = document.querySelector('.programacion')
    const rowMarketingAndEmpresas = document.querySelector('.marketing')
    console.log(data);
    JSON.parse(localStorage.setItem('Cursos', JSON.stringify(data)))
    let cursosProgram = data.filter((curso) => curso.categoria === 'Programación')
    let cursosMarketingAndEmpresas = data.filter((curso) => curso.categoria === 'Marketing y Empresas')
    // let cursosPlanFormacionJSON = (idCurso, curso) => {localStorage.setItem(idCurso, curso)}
    
    
    //crea cursos en marketing y empresas por cada uno en categoría 'Programación'
    cursosProgram.forEach((curso) => {
        const cursoDiv = document.createElement('div')
        cursoDiv.classList.add('card')
        cursoDiv.classList.add('ancho-card')
        cursoDiv.innerHTML = `<img src=${curso.img} alt="curso-desarrollo-web">
        <div class="card-body">
        <h5 class="card-title">${curso.nombre}</h5>
        <p class="card-duration"><b>Duración: <i>${curso.duracion}</i></b></p>
        <p class="card-text">${curso.descripcion}</p>
        <a href="#" class="btn btn-add btn-secondary" id="${curso.id}">AÑADIR A MI PLAN</a>
        <a href="./course_detail.html" class="btn btn-view-course mt-2 btn-secondary" id="${curso.referenceHTML}">VER CURSO</a>
        </div>`
    
        rowProgramacion.appendChild(cursoDiv)
    })
    
    //crea cursos en marketing y empresas por cada uno en categoría 'Marketing y Empresas'
    cursosMarketingAndEmpresas.forEach((curso) => {
        const cursoDiv = document.createElement('div')
        cursoDiv.classList.add('card')
        cursoDiv.classList.add('ancho-card')
        cursoDiv.innerHTML = `<img src="${curso.img}" class="card-img-top"
                    alt="curso-desarrollo-web">
                    <div class="card-body">
                    <h5 class="card-title">${curso.nombre}</h5>
                    <p class="card-duration"><b>Duración: <i>${curso.duracion}</i></b></p>
                    <p class="card-text">${curso.descripcion}</p>
                    <a href="#" class="btn btn-add btn-secondary" id="${curso.id}">AÑADIR A MI PLAN</a>
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
})