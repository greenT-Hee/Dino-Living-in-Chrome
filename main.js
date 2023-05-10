var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let melodyImg = new Image();
melodyImg.src = './images/mymelody.png';

var melody = {
  x: 10,
  y: 200,
  width: 80,
  height: 106,
  draw() {
    ctx.fillStyle = 'green';
    // ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(melodyImg, this.x, this.y - 20,this.width + 10,this.height + 20)
  }
}
melody.draw();

let cactusImg = new Image();
cactusImg.src = './images/cactus.png';

class Cactus {
  constructor () {
    this.x = 500;
    this.y = 276;
    this.width = 30;
    this.height = 30;
  }
  draw() {
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x,this.y,this.width,this.height)
    ctx.drawImage(cactusImg, this.x, this.y - 20,this.width + 10,this.height + 20)
  }
}

let timer = 0;
let jumpTimer = 0;
let cactusArr = [];
let jump = false;
let animation;
function 프레임마다실행 () {
  animation = requestAnimationFrame(프레임마다실행);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  timer++;

  //120초마다 장애물 생성
  if(timer % 240   === 0) {
    let cactus = new Cactus();
    cactusArr.push(cactus);
  }
  
  cactusArr.forEach((item, index, arr) => {
    // x좌표가 0미만이면 제거 
    if(item.x < 0) {
      arr.splice(index , 1);
    }
    item.x -= 3;
    isColl(melody, item)
    item.draw();
  })

  if(jump) {
    melody.y -= 3;
    jumpTimer ++;
  } else {
    if(melody.y < 200) {
      melody.y += 3;
    } 
  }

  if(jumpTimer > 40) {
    jump = false;
    jumpTimer = 0;
  }
  melody.draw();
}
프레임마다실행(); 


// 충돌 확인
function isColl (melody, cactus) {
  let x축차이 = cactus.x - (melody.x + melody.width);
  let y축차이 = cactus.y - (melody.y + melody.height);

  if(x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    alert('GAME OVER');
  }
  
}



document.addEventListener('keydown', function(e) {
  jump = true;
  if(e.code === 'Space') {
    jump = true;
  }
})