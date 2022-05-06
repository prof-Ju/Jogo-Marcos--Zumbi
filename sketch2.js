var player
var chao
var grupoZumbis, tiroGroup;

var barreiraDir, barreiraEsq;
var pente = 30
var invisblecheck

function preload(){

}
function setup(){
     createCanvas(800,400)

     player = createSprite(35,340,15,30)
     player.shapeColor = "red"


     chao = createSprite(400,380,800,50)

     grupoZumbis = new Group();
     tiroGroup = new Group();

     barreiraDir = createSprite(0,380, 10,280)
     barreiraDir.visible = false;
     barreiraEsq = createSprite(798,380, 10,280)
     barreiraEsq.visible = false;


    
}

function draw(){
    background("black")
    drawSprites();

    text("Munição: " + pente,player.x, 150  )

    player.collide(chao)
    if(keyDown("d")){
        player.x+=2
    }
    if(keyDown("a")){
        player.x-=2
    }
    if(keyDown("w") && player.y >= 335){
        player.velocityY = -10
    }
    player.velocityY+=0.8
   
    zumbi();

    grupoZumbis.bounceOff(barreiraDir);
    grupoZumbis.bounceOff(barreiraEsq);
    tiroGroup.bounceOff(grupoZumbis,destroyinimigos);

    camera.x = player.x;
   
    if(keyDown("space")){
     pente -= 1;
     tiro();
    }
}
function zumbi(){
     if(grupoZumbis.length <= 30 && frameCount % 10 ==0){
          
               var zumbi = createSprite(400,343,10,25)
               grupoZumbis.add(zumbi);
               zumbi.shapeColor = "green"
               zumbi.x=Math.round(random(200,800))
               var speeds = [1,-1,2,-2,3,-3]
               var seletor = random(speeds)
               zumbi.velocityX = seletor
     }
}

function destroyinimigos(tiro,zumbi){
    tiro.remove();
     zumbi.remove();
   }

function tiro(){
     if(pente > 0){

          var tiro  = createSprite(200,200,10,10);
          tiro.shapeColor = "red";
          tiro.x = player.x;
          tiro.y = player.y;
          tiroGroup.add(tiro);
          tiro.velocityX = 3
     }

     else{
          pente = 0;
     }
    
}