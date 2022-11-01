let playerState = 'idle';
const dropdown = document.getElementById('animations');

dropdown.addEventListener('change', (e) => {
  playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// Proporções da imagem - (6876x5230)

// 12 === Numero de colunas
// (6876 / 12) === 573;
// 10 === Numero de linhas
// (5230 / 10) === 523;

// Proporções da sprite => local onde vai ser cortado
const spriteWidth = 575 
const spriteHeight = 523;

let gameFrame = 0;

const staggerFrames = 5;
const spriteAnimations = {};
const animationsStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

animationsStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }

  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteAnimations[playerState].loc[position].x;
  let frameY = spriteAnimations[playerState].loc[position].y;
  
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

// ctx.drawImage(playerImage, sx, sy, sw, sh, px, py, dw, dh);
// sx => Posição do eixo x referente ao corte da imagem
// sy => Posição do eixo y referente ao corte da imagem
// sw => Largura do corte da imagem
// sh => Altura do corte da imagem
// px => Posição do eixo x onde a imagem cortada vai ficar
// py => Posição do eixo y onde a imagem cortada vai ficar
// dw => Largura da imagem cortada
// dh => Altura da imagem cortada