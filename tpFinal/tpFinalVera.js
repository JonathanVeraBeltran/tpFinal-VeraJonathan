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
                title: 'Excelente!',
                text: 'Sigue así',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uCUzG93LWKpoLoOthyfPxYmcpAWiO9HbxQ&usqp=CAU',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                timer: 800,
            })
        } else {
            resultadoResultado.textContent = Swal.fire({
                title: 'INCORRECTO',
                text: 'La respuesta correcta es: ' + respuestaCorrecta,
                imageUrl: 'https://i1.sndcdn.com/artworks-000384609492-ffxuso-t500x500.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                timer: 1400,
            })
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
                puntuacion = preguntaCorrecta.length;
                text: switch (puntuacion) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            '¿Quiénes son los Simpsons? No tenés idea de quiénes son!!!');
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            '"Algunos personajes me son familiares" No sos un fan pero alguna vez los viste');
                        break;
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            '"Algo los conozco" Los viste, pero no los conoces a fondo');
                        break;
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            '"Sé lo principal de la serie" Tenés algo de conocimiento de la familia mas famosa del mundo');
                        break;
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            'Fan de los Simpsons! Realmente conocés a la familia Simpsons y sus aventuras');
                        break;
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            'Super mega fan de los Simpsons! Conocés a fondo a la familia Simpsons y sus aventuras');
                        break;
                    default:
                        Swal.fire('Respuestas correctas: ' + preguntaCorrecta.length + ' / ' + preguntaIncorrecta.length,
                            'Puntuación no válida, mmmmmm...no válida');
                        break;
                };
                sessionStorage.setItem('ContadorCorrectas', preguntaCorrecta.length);
                sessionStorage.setItem('ContadorIncorrectas', preguntaIncorrecta.length);
            }
        }, 1000);
    }

    mostrarPregunta();
}

cargarPreguntas()


