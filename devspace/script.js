<!DOCTYPE HTML>
<html> 
    <head> 
        <title>LemonGaming</title> 
        <meta charset="utf-8"> 
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&amp;display=swap" rel="stylesheet">
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
           var time = 0;
           var canvas = document.querySelector('.myCanvas');
           var height = canvas.height = window.innerHeight;
           var width = canvas.width = height*9/16;
           var ctx = canvas.getContext('2d');
           var score = 0;
           var x;
           var speed = 3;
           var cubecolors=[
             'rgb(80, 80, 255)',
             'rgb(153, 12, 235)',
             'rgb(23, 227, 4)',
             'rgb(242, 19, 138)'
           ];
           var cubes = [];
           ctx.font = "1em Nunito";
           function random(min, max) {
              return Math.floor(Math.random() * (max - min) ) + min;
           }
           function dist(x1, y1, x2, y2) {
              return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
           }
           function displayscore() {
               score+=speed;
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
              this.y+=speed;
              if(speed<6.5) {
              speed+=0.001;
              }
           };
           function Ball() {
              this.x = width/2;
              this.y = height*0.9;
              this.radius = 12.5;
              this.out = false;
           }
           Ball.prototype.display = function() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
              ctx.fillStyle ='rgba(255, 0, 0, ' + time/100 + ')';
              ctx.fill();
              ctx.closePath();
           };
           var player = new Ball();
           Cube.prototype.detectCollision = function() {
              if(dist(this.x, this.y, player.x, player.y)<13 || dist(this.x+this.size, this.y, player.x, player.y)<13 || dist(this.x, this.y+this.size, player.x, player.y)<13 || dist(this.x+this.size, this.y+this.size, player.x, player.y)<13) {
                 player.out = true;
              }
           }
           for(var i=0; i<25; i++) {
              var col = Math.floor(Math.random()*4);
              var x= Math.floor(random(0, (width-20)));
              var y= Math.floor(random(-2.5*height, height));
              cubes.push(new Cube(x, y, cubecolors[col]));
           }
           function updateBall(event) {
              x = event.clientX - canvas.offsetLeft;
             if(x > 12 && x < (canvas.width-12)) {
                player.x = x;
             }
           }
           function endScreen() {
              ctx.fillStyle = 'rgba(230, 230, 230, 0.75)';
              ctx.fillRect(0, 0, width, height);
              ctx.textAlign = 'center';
              ctx.textFont = '200px Nunito'
              ctx.fillStyle = 'rgba(255, 0, 0, 1)';
              ctx.fillText('Out', width/2, height/10);
              ctx.fillText('Score: ' + Math.floor(score), width/2, height/10 + 20);
              ctx.fillText('Click to Restart', width/2, height/10 + 80);
           }
           canvas.addEventListener('mousemove', updateBall);
           function resetGame() {
                   player.out = false;
                    requestAnimationFrame(draw);
                    time = 0;
                    score = 0;
                    cubes = [];
                    speed = 3;
                    for(var i=0; i<25; i++) {
                    var col = Math.floor(Math.random()*4);
                    var x= Math.floor(random(0, (width-20)));
                    var y= Math.floor(random(-2.5*height, height));
                    cubes.push(new Cube(x, y, cubecolors[col]));
                    canvas.removeEventListener('click', resetGame);
                    }
           }
           function draw() {
              ctx.fillStyle = 'rgba(230, 230, 230, 1)';
              ctx.fillRect(0, 0, width, height);
              time++;
              for(var i = 0; i<cubes.length; i++) {
                 cubes[i].display();
                 
                 cubes[i].update(); 
                 if(time>100) {
                 cubes[i].detectCollision();
                 }
                 if(cubes[i].y>height+cubes[0].size) {
                    cubes[i].y = -2.5*height;
                    cubes[i].x = Math.floor(random(0, (width-20)));
                 }
              }
              player.display();
              if(!player.out){
                 requestAnimationFrame(draw);
                 displayscore();
              }
              else {
                 endScreen(); 
                 cancelAnimationFrame(draw);
                 canvas.addEventListener('click', resetGame);               
              }
                    
            };
                 
              
           
           draw();
        </script>

    </body>
</html>
