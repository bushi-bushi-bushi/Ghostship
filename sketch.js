let duration = 30;
let state = 'start';
let startTime;
let WIDTH =640
let HEIGHT=480
let y=0
let target ={
  x:WIDTH/2,
  y:HEIGHT/2
}
let score = 0;
let ghost;
let spawnEvery = 85;

function spawnGhost() {
  ghost = { x: random(50, width - 50), y: random(50, height - 50) };
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

function setup() {
  // screen(width, length)
  createCanvas(640, 400);
  spawnGhost();
  startTime = millis();
}

function update(){

}

function drawGhost(x, y) {
  noStroke();
  fill(0, 128, 0);
  ellipse(x, y, 60, 60);

  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);

  noStroke();
  fill(0, 128, 0);
  ellipse(x, y+30, 25, 50);
  
  noStroke();
  fill(0, 128, 0);
  ellipse(x+20, y+30, 25, 50);

  noStroke();
  fill(0, 128, 0);
  ellipse(x-20, y+30, 25, 50);
  
  noStroke();
  fill(0, 128, 0);
  ellipse(x, y-30, 55, 50);
}

function draw() {
  update()
  // choosing background colour using rgb valus as parameter
  // draw a sky
  background(25, 25, 112);
  

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Defeat Cthulhu!', width / 2, height /2-20);
    text('Click to start', width / 2, height /2+20);
    return;
  }

    if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }
  
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
  
  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);
  
  fill(255);
  textSize(16);
  text('Score: ' + score, 70, 10);
  
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);

  
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}