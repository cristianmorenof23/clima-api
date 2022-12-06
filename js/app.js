const container = document.querySelector('.container') 
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})



function buscarClima(e) {
    e.preventDefault()

    // Validar los datos
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    
    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')
        return
    }
    // Consultar la API
    consultarAPI(ciudad, pais)

}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.border-red-400')

    if(!alerta ){
            
        // Crear una alerta
        const alerta = document.createElement('div')

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'py-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
        alerta.innerHTML = `
        <stron class="font-bold">Error!</stron>
        <span class="block">${mensaje}</span_>
        `;

        container.appendChild(alerta)

        // Se elimine la alerta despues de unos segundos
        setTimeout(() => {
            alerta.remove()
        }, 2000);

    }
}

function consultarAPI (ciudad, pais) {

    const appId = '876e615849830f7d287912bb2738364e'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner(); // Muestra un spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            limpiarHTML(); //Limpiar el html previo

            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
                return
            }

            // Imprime la respuesta en el html
            mostrarClima(datos)
        })
}

function mostrarClima (datos) {
    const { name, main: { temp, temp_max, temp_min }} = datos

    const centigrados = kelvinACentigrados(temp)
    const max = kelvinACentigrados(temp_max)
    const min = kelvinACentigrados(temp_min)

    const nombreCiudad = document.createElement('p')
    nombreCiudad.textContent = `Clima en ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p')
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl')

    const tempmax = document.createElement('p')
    tempmax.innerHTML = `Max: ${max} &#8451; `
    tempmax.classList.add('text-xl')

    const tempmin = document.createElement('p')
    tempmin.innerHTML = `Min: ${min} &#8451; `
    tempmin.classList.add('text-xl')


    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempmax)
    resultadoDiv.appendChild(tempmin)


    resultado.appendChild(resultadoDiv)


}

function kelvinACentigrados (grados){
    return parseInt(grados - 273.15)
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner (){
    limpiarHTML()
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-cube-grid')

    divSpinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(divSpinner)
}