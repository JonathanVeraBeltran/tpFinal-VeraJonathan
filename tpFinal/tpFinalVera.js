const preguntaCorrecta = [];
const preguntaIncorrecta = [];


const contenedorPreguntas = document.getElementById("contenedor")

const preguntasSimpsons = []
const URL = "./preguntas.json"

const cargarPreguntas = async () => {
    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se puede acceder a las preguntas")
            }
            return response.json()
        })
        .then(data => {
            preguntasSimpsons.push(...data)
            mostrarEnHTML()
        })
        .catch(error => {
            console.error("Error al cargar el fetch del json ", error)
        })
}

const mostrarEnHTML = () => {
    let PreguntaActualIndex = 0;
    const preguntaPregunta = document.getElementById('pregunta');
    const opcionesOpciones = document.getElementById('opciones');
    const resultadoResultado = document.getElementById('resultado');

    function mostrarPregunta() {
        const preguntaActual = preguntasSimpsons[PreguntaActualIndex];
        preguntaPregunta.textContent = preguntaActual.pregunta;

        opcionesOpciones.innerHTML = '';
        preguntaActual.opciones.forEach((opcion, index) => {
            const tipoDeOpcion = document.createElement('div');
            tipoDeOpcion.classList.add('opcion');
            tipoDeOpcion.textContent = opcion;
            tipoDeOpcion.addEventListener('click', () => verificador(opcion, preguntaActual.respuestaCorrecta));
            opcionesOpciones.appendChild(tipoDeOpcion);
        });
    }

    function verificador(respuestaSeleccionada, respuestaCorrecta) {
        if (respuestaSeleccionada === respuestaCorrecta) {
            resultadoResultado.textContent = Swal.fire({
                icon: 'success',
                title: '¡CORRECTO!',
                text: '¡Sigue así!',
                timer: 700,
                width: 300,
            });
        } else {
            resultadoResultado.textContent = (Swal.fire({
                icon: 'error',
                title: '¡INCORRECTO!',
                text: 'La respuesta correcta es: ' + respuestaCorrecta,
                timer: 1400,
                width: 300,
            }));
        }

        if (respuestaSeleccionada === respuestaCorrecta) {
            preguntaCorrecta.push(1);
        } else {
            preguntaIncorrecta.push(1);
        }

        setTimeout(() => {
            resultadoResultado.textContent = '';
            PreguntaActualIndex++;
            if (PreguntaActualIndex < preguntasSimpsons.length) {
                mostrarPregunta();
            } else {
                preguntaPregunta.textContent = ('¡Ha finalizado el juego!');
                opcionesOpciones.innerHTML = ('');
                console.log(preguntaCorrecta.length)
                console.log(preguntaIncorrecta.length)
                sessionStorage.setItem('ContadorCorrectas', preguntaCorrecta.length);
                sessionStorage.setItem('ContadorIncorrectas', preguntaIncorrecta.length);
            }
        }, 1000);
    }

    mostrarPregunta();
}

cargarPreguntas()


