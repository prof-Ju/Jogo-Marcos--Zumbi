class Zumbi {
     constructor(x, y, width, height, zumbiPos) {
          var options = {
               density: 1
          }

       this.body = Bodies.rectangle(x, y, width, height);
       this.width = width;
       this.height = height;
   
       this.zumbiPosition = zumbiPos;
   
       World.add(world, this.body);
     }
   
     remove(index) {

       setTimeout(() => {
         Matter.World.remove(world, grupoZumbis[index].body);
         delete grupoZumbis[index];
       }, 1000);
     }
   
     display() {
       var angle = this.body.angle;
       var pos = this.body.position;
      
       push();
       translate(pos.x, pos.y);
       rotate(angle);  
       rectMode(CENTER);
       fill("green");
       rect( this.zumbiPosition, 0, this.width, this.height);
       pop();
     }

     setVelocity(){
          var speeds = [2,-2,3,-3,4,-4]
           var velo = random(speeds);
     }
   }
   