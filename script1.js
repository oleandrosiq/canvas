const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: null,
  y: null
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// const drawCircle = (radius) => {
//   ctx.fillStyle = 'blue';
//   ctx.beginPath();
//   ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
//   ctx.fill();
// }

canvas.addEventListener('click', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }
}

const start = () => {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

start();

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

const animate = () => {
  clearCanvas();
  handleParticles();
  requestAnimationFrame(animate);
}

animate();