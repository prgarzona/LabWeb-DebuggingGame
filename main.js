import './style.css'

// 1. En una variable llamada holes, guardar todos los elementos de tipo .hole
const scoreBoard = document.querySelector('.score-value');
const bugs = document.querySelectorAll('.bug');

let lastHole;
let timeUp = false;
let score = 0;
let holes = document.querySelectorAll('.hole');

// Retorna un tiempo aleatorio entre un rango definido
function tiempoRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Retorna un aleatoriamente un elemento de tipo .hole
// de una lista de agujeros enviada como parámetros
function agujeroRandom(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (lastHole === hole) {
    return agujeroRandom(holes);
  }

  lastHole = hole;
  return hole
}


// Hace que un nuevo bug salte desde un agujero
function saltar() {
  const time = tiempoRandom(500, 3000);
  const hole = agujeroRandom(holes);

  // 2. Agregar la clase 'up' al elemento 'hole' para que el bug aparezca
  // Se agrega la clase up dentro de hole
  hole.classList.add('up')
  setTimeout(() => {
    // 3. Eliminar la clase 'up' para que el bug desaparezca
    //La clase se eliminara de todo hole.
    hole.classList.remove('up')
    // Hace que un nuevo bug salte desde un agujero si el tiempo no ha terminado
    if (!timeUp) {
      saltar()
    }
    // alerta para indicar que el tiempo llego a su limite
    else {
      alert('Se Acabo!!')
    }
  }, time)
}

// Maneja el evento de click en un bug
function golpear(event) {
  console.log('boing!!')
  if (!event.isTrusted) return; // Alguien intentó hacer trampa

  score++;
  scoreBoard.textContent = score;
}

function iniciarJuego() {
  scoreBoard.textContent = 0;
  timeUp = false;

  saltar();

  setTimeout(() => timeUp = true, 10 * 1000);
}


// 4. Agregar el evento 'click' al todos los elementos 'bug'
//se deja incluido para que seleccione todos los elementos bug, y se le asigne la funcion golpear
const keys = document.querySelectorAll('.bug')
keys.forEach(key => {
  key.addEventListener('click', golpear)
})

// 5. Hacer un bind del evento click del boton iniciar juego
// para que inicie el juego a travez del boton
document.getElementById('start').addEventListener('click', iniciarJuego);