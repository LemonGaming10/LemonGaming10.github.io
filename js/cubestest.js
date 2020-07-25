/*  Coded by Tharun.D @ LemonGaming on */
            
            //Initialising the canvas
            var canvas = document.querySelector('.myCanvas');
            var height = canvas.height = window.innerHeight;
            var width = canvas.width = height*9/16;
            var ctx = canvas.getContext('2d');
            
            //Some Global Variables
            var x;
            var y;
            var mouseClicked = false;
            var scene = 'home';
            var score = 0;
            var highScore;
            var speed = height/120;
            
            
            //Checking the user's storage for highscore
            if(localStorage.getItem('highScore')) {
               highScore = localStorage.getItem('highScore');
            }
            else {
               highScore = 0;
            }
            
            //Utility functions
            function updateCoordinates(event) {
                x = event.clientX - canvas.offsetLeft;
                y = event.clientY - canvas.offsetTop;
            }
            function updateMouseStatus() {
                mouseClicked = true;
            }
            function updateTouch(event) {
                x = event.touches[0].clientX - canvas.offsetLeft;
                y = event.touches[0].clientY - canvas.offsetTop;
            }
            function random(min, max) {
              return Math.floor(Math.random() * (max - min) ) + min;
           }
           function dist(x1, y1, x2, y2) {
              return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
           }
           function roundedRect(ctx, x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x, y + radius);
                ctx.lineTo(x, y + height - radius);
                ctx.arcTo(x, y + height, x + radius, y + height, radius);
                ctx.lineTo(x + width - radius, y + height);
                ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
                ctx.lineTo(x + width, y + radius);
                ctx.arcTo(x + width, y, x + width - radius, y, radius);
                ctx.lineTo(x + radius, y);
                ctx.arcTo(x, y, x, y + radius, radius);
                ctx.fill();
            }
            
            //Button Object and methods
            function Button(x, y, col, name, wid, radius) {
                this.x = x;
                this.y = y;
                this.col = col;
                this.name = name;
                this.focused = false;
                this.clicked = false;
                this.width = wid;
                this.radius = radius;
            }
            Button.prototype.display = function() {
                ctx.fillStyle = this.col;
                if(!this.focused) {
                    roundedRect(ctx, this.x, this.y, this.width*0.7, height*0.1, this.radius);                    
                }
                else {       
                    roundedRect(ctx, this.x-this.width*0.05, this.y, this.width*0.8, height*0.1, this.radius);
                    if(this.clicked) {
                       ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
                       roundedRect(ctx, this.x-this.width*0.05, this.y, this.width*0.8, height*0.1, this.radius);
                       scene = this.name;
                       
                    }
                }
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.font = width/15 + 'px Nunito';
                ctx.textAlign = 'center';
                ctx.fillText(this.name, this.x + this.width*0.35, this.y+height*0.06);
            };
            Button.prototype.update = function() {
                if(this.x<x && this.y<y && (this.x + this.width*0.7)>x && (this.y + height*0.1)>y) {
                    this.focused = true;
                }
                else {
                    this.focused = false;
                }
                if(mouseClicked) {
                    this.clicked = true;
                }
                else {
                    this.clicked = false;
                }
            };
            var buttons = [
                new Button(width*0.15, height*0.3, 'rgb(20, 255, 20)', 'Play', width, this.width*0.03),
                new Button(width*0.15, height*0.45, 'rgb(80, 80, 255)', 'Shop', width, this.width*0.03),
                new Button(width*0.15, height*0.6, 'rgb(153, 12, 235)', 'Challenges', width, this.width*0.03),
                new Button(width*0.15, height*0.75, 'rgb(242, 19, 138)', 'Credits', width, this.width*0.03),
                
            ];
            var endButtons = [
              new Button(width*0.1, height*3/4, 'rgb(153, 12, 235)', 'Home', width/2.5, width*0.09),
              new Button(width*0.6, height*3/4, 'rgb(20, 255, 20)', 'Retry', width/2.5, width*0.09)
              ];
            var homeButton = new Button(width*0.1, height*1/15, 'rgb(153, 12, 235)', 'Home', width/3.5, width*0.03);
            
            //Ball object and its methods O
            function Ball() {
              this.x = width/2;
              this.y = height*0.8;
              this.radius = width/32;
              this.out = false;
              this.col = 0;
              }
           Ball.prototype.display = function() {
              ctx.beginPath();
              ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
              ctx.fillStyle ='rgba(255, 0, 0, ' + this.col/100 + ')';
              ctx.fill();
              ctx.closePath();
           };
           Ball.prototype.update = function() {
              if(x > width/18 && x < (width*(17/18))) {
                player.x = x;
              }
              if(this.col < 101) {
                this.col++;
              }
           };
           var player = new Ball();
           
            // Cube object and its methods |_|
            function Cube(x, y, col) {
              this.x=x;
              this.y=y;
              this.col=col;
              this.size= width/18;
              }
            Cube.prototype.display = function() {
              ctx.fillStyle = this.col;
              ctx.fillRect(this.x, this.y, this.size, this.size);
           };
            Cube.prototype.update = function() {
              this.y+=speed;
           };
           Cube.prototype.detectCollision = function() {
              if(dist(this.x, this.y, player.x, player.y)<((player.radius)) || dist(this.x+this.size, this.y, player.x, player.y)<((player.radius)) || dist(this.x, this.y+this.size, player.x, player.y)<((player.radius)) || dist(this.x+this.size, this.y+this.size, player.x, player.y)<((player.radius))) {
                    if(player.col > 99) {
                      player.out = true;
                    }
              }
           };
           var cubecolors=[
              'rgb(80, 80, 255)',
              'rgb(153, 12, 235)',
              'rgb(23, 227, 4)',
              'rgb(242, 19, 138)'
            ];
            var cubes = [];
            for(var i=0; i<20; i++) {
              var col = Math.floor(Math.random()*4);
              var x= Math.floor(random(0, width*(17/18)));
              var y= Math.floor(random(-2.5*height, height));
              cubes.push(new Cube(x, y, cubecolors[col]));
           }
           
           //Other Graphics
            function drawBackground() {
                ctx.fillStyle = 'rgba(252, 252, 252)';
                ctx.fillRect(0, 0, width, height);
            }
            
            function displayLogo() {
                ctx.fillStyle = 'rgb(80, 80, 255)';
                ctx.font = width/8 + 'px Nunito';
                ctx.fillText('C', width*0.2 + width*0.1, height*0.15);
                ctx.font = width/10 + 'px Nunito';
                ctx.fillText('U', width*0.3 + width*0.1, height*0.145);
                ctx.font = width/12.5 + 'px Nunito';
                ctx.fillText('B', width*0.4 + width*0.1, height*0.14);
                ctx.font = width/15.625 + 'px Nunito';
                ctx.fillText('E', width*0.48 + width*0.1, height*0.135);
                ctx.font = width/19.53125 + 'px Nunito';
                ctx.fillText('S', width*0.55 + width*0.1, height*0.13);
                
                ctx.fillStyle = 'rgb(80, 80, 255)';
                ctx.font = width/8 + 'px Nunito';
                ctx.fillText('C', width*0.2 + width*0.095, height*0.15);
                ctx.font = width/10 + 'px Nunito';
                ctx.fillText('U', width*0.3 + width*0.095, height*0.145);
                ctx.font = width/12.5 + 'px Nunito';
                ctx.fillText('B', width*0.4 + width*0.095, height*0.14);
                ctx.font = width/15.625 + 'px Nunito';
                ctx.fillText('E', width*0.48 + width*0.095, height*0.135);
                ctx.font = width/19.53125 + 'px Nunito';
                ctx.fillText('S', width*0.55 + width*0.095, height*0.13);
            }
            
            //The Game Scenes...
            function drawHomeScene() {
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                ctx.fillRect(0, 0, width, height);
                for(var i = 0; i < cubes.length; i++) {
                   cubes[i].display();
                   cubes[i].update();
                   if(cubes[i].y>height+cubes[0].size) {
                      cubes[i].y = (-2.5*height+random(height/-100, height/100));
                      cubes[i].x = Math.floor(random(0, (width-(cubes[0].size))));
                   }
                }
                ctx.fillStyle = 'rgba(255, 255, 255, 0)';
                ctx.fillRect(0, 0, width, height);
                for(var i = 0; i<buttons.length; i++) {
                   buttons[i].display();
                   buttons[i].update();
                }
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillText('Only the Play btn works sorry', width/2, height*9.5/10);
                displayLogo();
            }
            function drawGameScene() {
                speed = height/0;
                drawBackground();
                if(!player.out) {
                   for(var i = 0; i < cubes.length; i++) {
                      cubes[i].display();
                      cubes[i].update();
                      cubes[i].detectCollision();
                      if(cubes[i].y>height+cubes[0].size) {
                         cubes[i].y = (-2.5*height+random(height/-100, height/100));
                         cubes[i].x = Math.floor(random(0, (width-(cubes[0].size))));
                      }
                   }
                    player.display();
                    player.update();
                    score++;
                    ctx.textAlign = 'right';
                    ctx.font = width/15 + 'px Nunito';
                    ctx.fillStyle = 'rgb(0, 0, 0)';
                    ctx.fillText(score, width*9/10, height/8);
                 }
                 else {
                    scene = 'out';
                    if(score > highScore) {
                       localStorage.setItem('highScore', score);
                    }
                    highScore =  localStorage.getItem('highScore'); 
                 }
            }
            var u1 = 0.01;
            var a = 0;
            function drawOutScene() {
               drawBackground();
               ctx.textAlign = 'center';
               ctx.font = width/10 + 'px Nunito';
               ctx.fillStyle = 'rgb(255, 0, 0)';
               ctx.fillText('OUT', width/2, height/8);
               ctx.fillStyle = 'rgb(0, 0, 0)';
               ctx.fillText(Math.floor(score*u1), width/2, height*2/8);
               ctx.fillText(highScore, width/2, height*5.5/8);
               ctx.fillText('HighScore', width/2, height*5/8);
               if(u1 < 1) {
                  u1+=0.01
               }
               ctx.beginPath();
               ctx.arc(width/2, height*4/9 + Math.sin(a)*width/8, width/10, 0, 2*Math.PI, true);
               ctx.fillStyle = 'rgb(255, 0, 0)';
               ctx.fill();
               ctx.closePath();
               a+=0.1;
               for(var i = 0; i < endButtons.length; i++) {
                   endButtons[i].display();
                   endButtons[i].update();
               }
            }
            
            function drawShopScene() {
               drawBackground();
               homeButton.display();
               homeButton.update();
            }
            //The function to run the game
            function runGame() {
                if(scene === 'home') {
                   drawHomeScene();                    
                }
                else if(scene === 'Play') {
                   drawGameScene();               
                }
                else if(scene === 'out') {
                   drawOutScene();
                }
                else if(scene === 'Shop') {
                   drawShopScene();
                }
                else if(scene === 'Challenges') {
                   scene = 'home';
                }
                else if(scene === 'Credits') {
                   scene = 'home';
                }
                else if(scene === 'Retry') {
                   scene = 'Play'
                   cubes = [];
                   for(var i=0; i<20; i++) {
                      var col = Math.floor(Math.random()*4);
                      var x= Math.floor(random(0, width*(17/18)));
                      var y= Math.floor(random(-2.5*height, height));
                      cubes.push(new Cube(x, y, cubecolors[col]));
                   }
                   player.out = false;
                   player.col = 0;
                   score = 0;
                }
                else if(scene === 'Home') {
                   cubes = [];
                   for(var i=0; i<20; i++) {
                      var col = Math.floor(Math.random()*4);
                      var x= Math.floor(random(0, width*(17/18)));
                      var y= Math.floor(random(-2.5*height, height));
                      cubes.push(new Cube(x, y, cubecolors[col]));
                   }
                   player.out = false;
                   player.col = 0;
                   score = 0;
                   scene = 'home';
                }
                mouseClicked = false;
                requestAnimationFrame(runGame);
            }
            
            //Adding the event listeners
            canvas.addEventListener('mousemove', updateCoordinates);
            canvas.addEventListener('touchmove', updateTouch);
            canvas.addEventListener('click', updateMouseStatus);
            
            //Runs the game
            runGame();
