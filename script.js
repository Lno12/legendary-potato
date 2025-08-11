const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circuloFijo = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radio: 50
};

let circuloMoviendose = {
  x: Math.random() * (canvas.width - 100) + 50,
  y: 0,
  radio: 30,
  velocidad: 5
};

let juegoTerminado = false;
let tiempoClick = 0;
let distancia = 0;

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circuloFijo.x, circuloFijo.y, circuloFijo.radio, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(circuloMoviendose.x, circuloMoviendose.y, circuloMoviendose.radio, 0, 2 * Math.PI);
  ctx.fillStyle = 'pink';
  ctx.fill();

  circuloMoviendose.y += circuloMoviendose.velocidad;

  if (circuloMoviendose.y > canvas.height) {
    circuloMoviendose.y = 0;
    circuloMoviendose.x = Math.random() * (canvas.width - 100) + 50;
  }

  if (juegoTerminado) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Precisión: ${distancia.toFixed(2)}%`, canvas.width / 2, canvas.height / 2);
  }
}

canvas.addEventListener('click', () => {
  if (!juegoTerminado) {
    juegoTerminado = true;
    tiempoClick = new Date().getTime();
    distancia = calcularDistancia();
    setTimeout(() => {
      juegoTerminado = false;
      circuloMoviendose.y = 0;
      circuloMoviendose.x = Math.random() * (canvas.width - 100) + 50;
    }, 2000);
  }
});

function calcularDistancia() {
  let distanciaReal = Math.abs(circuloFijo.y - circuloMoviendose.y);
  let distanciaMaxima = circuloFijo.radio + circuloMoviendose.radio;
  let precision = (1 - (distanciaReal / distanciaMaxima)) * 100;
  if (precision < 0) precision = 0;
  if (precision > 100) precision = 100;
  return precision;
}

setInterval(dibujar, 16);
