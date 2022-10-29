const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

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

  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
   
      i--;
    }
  }
}

const animate = () => {
  clearCanvas();
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  handleParticles();
  hue+=0.5;
  requestAnimationFrame(animate);

  console.log({ hue })
}

animate();