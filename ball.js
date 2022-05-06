class Ball {
     constructor(x, y) {
       var options = {
         isStatic: true,
         density: 0.05
       };
       this.r = 10;
       this.body = Bodies.circle(x, y, this.r, options);
       World.add(world, this.body);
     }
   
     remove(index) {
       Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
   
       setTimeout(() => {
         Matter.World.remove(world, this.body);
         delete balls[index];
       }, 1000);
     }
   
     shoot() {
       Matter.Body.setStatic(this.body, false);
       Matter.Body.setVelocity(this.body, {x: 3, y: -0.3});
     }
   
     display() {
       var angle = this.body.angle;
       var pos = this.body.position;
   
       push();
       fill("lightgreen")
       translate(pos.x, pos.y);
       rotate(angle);
       ellipseMode(CENTER);
       ellipse( 0, 0, this.r);
       pop();

     }
   }
   