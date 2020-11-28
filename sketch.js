var banana
var banana_image
var obstacles
var ObstacleGroup,obstacle, foodGroup
var monkey, monkey_image
var background_image, ground
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  banana_image=loadImage("banana.png")
  monkey_image= loadAnimation("Monkey_01.png",  "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png",  "Monkey_07.png","Monkey_08.png","Monkey_09.png",  "Monkey_10.png" ) 
  background_image = loadImage("jungle.jpg")
  obstacles= loadImage("stone.png")
  }
function setup() {
  createCanvas(400, 400);
  
  invisible_ground= createSprite(200,390,400,10);
  invisible_ground.visible= false;
  ground= createSprite(0,0,400,400);
  ground.addImage("ground", background_image);
  ground.scale= 1;
  ground.x= ground.width/2;
 
  monkey= createSprite(200,300,40,50);
  monkey.addAnimation("monkey",monkey_image); 
  monkey.scale=0.2;
  monkey.x= 70;
  obstacleGroup= createGroup();
  foodGroup= createGroup();
}

function draw() {
  background("white");
 drawSprites();
  fill("yellow");
  text("Score="+ score,300,50)
if(gameState===PLAY){
   if(keyDown("space")  &&  monkey.y>=286.5){
    monkey.velocityY = -15 ;}
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisible_ground); 
  food();
  Obstacles();
  if(monkey.isTouching(foodGroup)){
    score= score+2;
    foodGroup.destroyEach();
  }       
  switch(score){
    case 10: monkey.scale= 0.22;
       break;
    case 20: monkey.scale= 0.24;
       break;
    case 30: monkey.scale= 0.26;
       break;
    case 40: monkey.scale= 0.28;
       break;
       default: break;
  }
if(obstacleGroup.isTouching(monkey)){
  monkey.scale=0.2;
}
  if(obstacleGroup.isTouching(monkey)){
    score=0;
  }
}
}
if(gameState===END)
  if(obstacleGroup.isTouching(monkey)){
    gameState=PLAY;
  }
  

function food(){
if(World.frameCount%80===0){
banana= createSprite(400,175,20,20);
banana.velocityX=-3;
banana.addImage("Banana",banana_image);
banana.scale=0.05;
banana.y= random(120,200);
banana.lifetime= 33.4; 
foodGroup.add(banana);
 
}
}
function Obstacles() {
  if(World.frameCount % 300 === 0) {
    obstacle = createSprite(400,370,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("stone", obstacles)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 70;
    obstacleGroup.add(obstacle);
  }
}