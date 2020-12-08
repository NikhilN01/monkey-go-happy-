var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, cloudsGroup;
var backgroundImg,cloudImg,sun,sunImg;
var gameOver,gameOverImg,restart,restartImg;
var invisibleGround;
var score = 0

function preload(){
  
  
 monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImg=loadImage("jungle.jpg");
  cloudImg=loadImage("cloud.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  sunImg=loadImage("sun.png");
  
  
 
}



function setup() {
 createCanvas(400,400); 

  monkey=createSprite(100,320,20,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
 
  
  invisibleGround=createSprite(100,322,500,10);
  invisibleGround.visible=false;
  
  sun=createSprite(350,30,10,10);
  sun.addImage(sunImg);
  sun.scale=0.1;
  
  gameOver = createSprite(200,150,50, 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,200,50,50);
  restart.addImage(restartImg);
  restart.scale=0.1;
   
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  cloudsGroup=createGroup();
  
  score=0;
  
  monkey.setCollider("circle",0,0,300)
 // monkey.debug=true;
  
  
}


function draw() {
 background(backgroundImg);
  
  stroke("black");
  textSize(20);  
  fill("black");
  text("Survival Time: "+score,110,100);
  
  console.log(monkey.y)
  if(gameState===PLAY){
    
    
    gameOver.visible=false;
    restart.visible=false;
    
   score=score + Math.round(frameCount/200); 
    
    invisibleGround.velocityX=-(3 + score/100);

    monkey.velocityY = monkey.velocityY + 0.8;
    
    invisibleGround.velocityX = -(6 + 3*score/100);

  if(invisibleGround.x<0){
   invisibleGround.x=invisibleGround.width/2; 
  }
    
    if(keyDown("space")||keyDown("UP_ARROW")&&monkey.y>242){
   monkey.velocityY=-15; 
  }
    
   
    monkey.velocityY=monkey.velocityY+0.3;
    
    spawnClouds();
    obstacles();
    food();
   
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
   
  }
  
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
   }  
  
}else if(gameState===END){
  
 
  
  gameOver.visible=true;
  restart.visible=true;
  
 invisibleGround.velocityX=0;
 monkey.velocityY=0; 
  
 FoodGroup.setVelocityXEach(0);
 obstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  
  if(mousePressedOver(restart)){
   reset(); 
  }
}
  
  monkey.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  
 score=0;
 FoodGroup.destroyEach();
 obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameState=PLAY;
  frameCount=0;
  
  
} 

function food(){
 if(frameCount%80===0){
   banana=createSprite(390,300,50,50);
   banana.y=Math.round(random(200,250));
   banana.addImage(bananaImage);
   banana.scale=0.05;
   banana.velocityX=-(3 + score/300);
   banana.lifetime=100;
   
   monkey.depth=banana.depth;
   monkey.depth=monkey.depth+1;
   
   
   FoodGroup.add(banana);
   
 }
}

function obstacles(){
 
 if(frameCount%200===0){
  obstacle=createSprite(370,300,20,20);
  obstacle.addImage("stone",obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-(3 + score/100);
  obstacle.lifetime=100;
   
   monkey.depth=obstacle.depth;
   
   
   obstacleGroup.add(obstacle);
   
   obstacle.setCollider("circle",0,0,200)
  // obstacle.debug=true;
   
   
 } 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(50,150));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    cloud.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}



