<!DOCTYPE HTML>
<html> 
    <head> 
        <title>LemonGaming</title> 
        <meta charset="utf-8"> 
        <style> 
           body {
             margin: 0;
             overflow: hidden;
             }
           .myCanvas {
             position: absolute;
             left:25%;
             
             }
        </style>
    </head> 
    <body>
        <canvas class="myCanvas">
           <p>Add suitable fallback here.</p>
        </canvas>
        <script>
           var canvas = document.querySelector('.myCanvas');
           var height = canvas.height = window.innerHeight;
           var width = canvas.width = height*0.75;
           var ctx = canvas.getContext('2d');
           var score = 0;
           var x;
           var cubecolors=[
             'rgb(80, 80, 255)',
             'rgb(153, 12, 235)',
             'rgb(23, 227, 4)',
             'rgb(242, 19, 138)'
           ];
           var cubes = [];
           ctx.font = "1em serif";
           function random(min, max) {
              return Math.floor(Math.random() * (max - min) ) + min;
           }
           function dist(x1, x2, y1, y2) {
              return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
           }
           function displayscore() {
               score+=cubes[0].speed;
               ctx.fillStyle = 'rgba(0, 0, 0, 1)';
               ctx.fillText('Score:', width/12, height/12);
               ctx.fillText(Math.round(score), width/12, (height/12)+20);
           }
           function Cube(x, y, col) {
              this.x=x;
              this.y=y;
              this.col=col;
              this.size= 20;
              this.speed= 3;
           }
           Cube.prototype.display = function() {
              ctx.fillStyle = this.col;
              ctx.fillRect(this.x, this.y, this.size, this.size);
           };
           Cube.prototype.update = function() {
              this.y+=this.speed;
              if(this.speed<6.5) {
              this.speed+=0.001;
              }
           };
           Cube.prototype.broadPhase = function() {
              //return 
           }
           function Ball() {
              this.x = width/2;
              this.y = height*0.9;
              this.radius = 12.5;
              this.out = false;
           }
           Ball.prototype.display = function() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
              ctx.fillStyle ='rgba(255, 0, 0, 1)';
              ctx.fill();
              ctx.closePath();
           };
           var player = new Ball();
           for(var i=0; i<25; i++) {
              var col = Math.floor(Math.random()*4);
              var x= Math.floor(random(0, (width-20)));
              var y= Math.floor(random(-1250, 300));
              cubes.push(new Cube(x, y, cubecolors[col]));
           }
           function updateBall(event) {
              x = event.clientX - canvas.offsetLeft;
             if(x > 12 && x < (canvas.width-12)) {
                player.x = x;
             }
           }
           canvas.addEventListener('mousemove', updateBall);
           function draw() {
              ctx.fillStyle = 'rgba(230, 230, 230, 1)';
              ctx.fillRect(0, 0, width, height);
              for(var i = 0; i<cubes.length; i++) {
                 cubes[i].display();
                 cubes[i].update();  
                 if(cubes[i].y>height+cubes[0].size) {
                    cubes[i].y = -1250;
                    cubes[i].x = Math.floor(random(0, (width-20)));
                 }
              }
              player.display();
              displayscore();
              requestAnimationFrame(draw);
           }
           draw();
        </script>

    </body>
</html>
