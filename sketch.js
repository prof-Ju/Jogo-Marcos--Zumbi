const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world
var player
var chao

var balls = [];
var grupoZumbis = [];

function preload(){

}
function setup(){
    createCanvas(800,400)
    engine = Engine.create();
    world = engine.world;


    player = createSprite(30,340,15,30)
    player.shapeColor = "red"
    chao = createSprite(400,390,800,50)
    chao.visible = false;
    ground = Bodies.rectangle(400,395,800,20,{ isStatic: true });
    World.add(world, ground);

    

    
}
function draw(){
    background("");

   
    
    player.collide(chao)
    if(keyDown("d")){
        player.x+=2
    }
    if(keyDown("a")){
        player.x-=2
    }
    if(keyDown("w")){
        player.velocityY = -10
    }
    player.velocityY+=0.8

    
  for (var i = 0; i < balls.length; i++) {
    showBalls(balls[i], i);
    collisionWithZumbi(i);
  }
  doZumbis();
  showZumbis();

    // push();
    fill("brown");
    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,800,20);
   // pop();


   Engine.update(engine);
  drawSprites()

}


function doZumbis() {
    if ( grupoZumbis.length < 30 && frameCount % 10 ==0) {

        var position = Math.round(random(100,380));
        var zumbi = new Zumbi(200,360, 10, 30, position);

        grupoZumbis.push(zumbi);
    } 
  }

function showZumbis(){
    for (var i = 0; i < grupoZumbis.length; i=i +2) {
        
        if (grupoZumbis[i]) {
          Matter.Body.setVelocity(grupoZumbis[i].body, {
            x: 0.3,
            y: 0
          });
  
          grupoZumbis[i].display();
        } else {
            grupoZumbis[i];
        }

    }
    for (var i = 1; i < grupoZumbis.length; i=i +2) {
        if (grupoZumbis[i]) {
          Matter.Body.setVelocity(grupoZumbis[i].body, {
            x: -0.3,
            y: 0
          });
  
          grupoZumbis[i].display();
        } else {
            grupoZumbis[i];
        }

    }
}

function collisionWithZumbi(index) {
  for (var i = 0; i < grupoZumbis.length; i++) {
    if (balls[index] !== undefined && grupoZumbis[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, grupoZumbis[i].body);

      if (collision.collided) {
        grupoZumbis[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var ball = new Ball(player.x, player.y);
    balls.push(ball);
  }
}

function showBalls(ball, index) {
  if (ball) {
    ball.display();
   
  }
}


function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].shoot();
  }
}