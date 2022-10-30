const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

const mouse = {
  x: 200,
  y: 200
}

const positionCircle = {
  x: 200,
  y: 200,
}

const positionSecondCircle = {
  x: 600,
  y: 200,
}

const radiusCircle = 10

class DrawCircle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  drawStroke() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }
}

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let lineActive = false;

const onTarget = (mouse, circle) => {
  if ((mouse.y <= circle.y && mouse.y >= circle.y - ((circle.radius ?? 10) + 10) - 1 
  || mouse.y >= circle.y && mouse.y <= circle.y + ((circle.radius ?? 10) + 10) - 1) && (mouse.x <= circle.x && mouse.x >= circle.x - ((circle.radius ?? 10) + 10) - 1 
  || mouse.x >= circle.x && mouse.x <= circle.x + ((circle.radius ?? 10) + 10) -1
  )) {
    return true;
  } else {
    return false;
  }
}

const handleMouseUp = (e) => {
  lineActive = false;

  mouse.x = e.x;
  mouse.y = e.y;

  if (onTarget(mouse, secondCircle)) {
    lineActive = false;
    canvas.removeEventListener('mouseup', handleMouseUp);
    
    clearCanvas();
    secondCircle.drawStroke();

    primaryCircle.draw();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.lineTo(secondCircle.x, secondCircle.y);
    ctx.stroke();
  } else {
    clearCanvas();
    primaryCircle.draw();
    secondCircle.draw();
  }
}

const handleMouseDown = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  if (onTarget(mouse, positionCircle)) {
    lineActive = true;
    canvas.addEventListener('mouseup', handleMouseUp);
  } else {
    canvas.removeEventListener('mouseup', handleMouseUp);
  }
}

canvas.addEventListener('mousedown', handleMouseDown);

canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  primaryCircle.draw();
  secondCircle.draw();

  if (lineActive) {
    clearCanvas();
    secondCircle.draw();
    primaryCircle.draw();

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }
});

const primaryCircle = new DrawCircle(positionCircle.x, positionCircle.y, 10, 'blue');
const secondCircle = new DrawCircle(positionSecondCircle.x, positionSecondCircle.y, 10, 'blue');

primaryCircle.draw();
secondCircle.draw();