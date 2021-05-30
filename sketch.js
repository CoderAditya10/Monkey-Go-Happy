var monkey , monkey_running;
var gameover;
var bg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score = 0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png",
  "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  gameover = loadAnimation("tenor (2).gif");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("Arcade.jpg")
 
}

function setup() {
  createCanvas(850,500);

  jungle = createSprite(350,250,1000,400);
  jungle.addImage(bg);
  jungle.scale = 1.1;
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;

  //creating monkey
  monkey = createSprite(65,400,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("gameOver", gameover);
  monkey.scale = 0.1;

  ground = createSprite(800,460,1800,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;

  //invisibleground = createSprite(1000,660,1800,10);
  
   //Create banana and obstacles group
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
}


function draw() {
background(200);
//background.velocityX = 4;
//background.x = background.width/2;
  
if (jungle.x < 115){
  jungle.x = jungle.width/2;
}

   if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
  if(keyDown("UP_ARROW")&& monkey.y >= 250) {
    monkey.velocityY = -13;
  }
  monkey.velocityY = monkey.velocityY +0.8; 
  
  monkey.collide(ground);
  
  //spawn obstacles on the ground
    spawnObstacles();
  
  //spawn the clouds
    spawnBanana();
  
  if(bananaGroup.isTouching(monkey)) {
    bananaGroup[0].destroy();
    score = score+2;
    monkey.scale += +0.05;
    
  }

  if(obstaclesGroup.isTouching(monkey)) {
    monkey.changeAnimation("gameOver", gameover);
    monkey.x = 425;
    monkey.y = 300;
    monkey.scale = 3.8;
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    obstaclesGroup.velocityX = 0;
    bananaGroup.velocityX = 0;
    ground.velocityX = 0;

    //monkey.collide(invisibleground);
  }
  
  drawSprites();
  
   stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 200,65);
}
function spawnObstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(850,425,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  
  if (frameCount % 120 === 0) {
    var banana = createSprite(900,120,40,10);
    banana.y = Math.round(random(120,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    
    bananaGroup.add(banana);
  }
}