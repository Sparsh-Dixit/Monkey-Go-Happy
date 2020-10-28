var PLAY = 1;
var END = 0;

var gameState = PLAY;

var monkey , monkey_running ,monkey_collide ;

var banana ,bananaImage, obstacle, obstacleImage ;

var ground , invisibleground ;

var foodGroup, obstacleGroup ;

var score = 0;

var gameover , gameoverImage ;



function preload(){
  
  monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkey_collide = loadImage("sprite_1.png");
  gameoverImage = loadImage("game-over-glitch-design-vector-260nw-606711203.webp")
 
}



function setup()

{
 
 createCanvas(600,350) ;
  
 obstacleGroup = new Group() ;
 foodGroup = new Group() ;
  
 ground = createSprite(400,350,1000,50) ;
  
 

  
 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;
  
 monkey = createSprite(150,300);
 monkey.addAnimation('moving',monkey_running);
 monkey.scale = 0.1 ;
  
 gameover = createSprite(300,175);
 gameover.addImage("over",gameoverImage)
 gameover.scale=1.3
 gameover.visible=false
  
}



function draw() {
  background('white');
  
  textSize(20);
  stroke("black");
  text("Bananas Collected : "+ score, 200,50);
  
  if (gameState === PLAY){
   
    if(keyDown("space")&& monkey.y >= 100) {
  monkey.velocityY = -12;}
  
  monkey.velocityY = monkey.velocityY + 0.8
  ground.velocityX = -10 ;
    
  if(monkey.isTouching(foodGroup)){
  score = score + 1;
  foodGroup.destroyEach();}
    
  if (monkey.isTouching(obstacleGroup)){
    gameState = END}
  }
  

 else if (gameState === END)

{
  
  gameover.visible=true
  
  ground.velocityX=0 ;
  obstacleGroup.velocityX=0;
  foodGroup.velocityX=0;
  
  obstacleGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
     
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  monkey.velocityY=0;
  
  monkey.changeAnimation("stop", monkey_collide);
  
}
 
  
  monkey.collide(ground);
  monkey.collide(obstacleGroup);
  
  
  
  if (ground.x > 0){
      ground.x = ground.width/2;}
  
  
  Spawnfood()
  Spawnobstacles();
  drawSprites()
  
}



function Spawnobstacles(){
  
  if (frameCount % 150 === 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -6 ;
    
    obstacle.lifetime = 300 ;
  
  obstacleGroup.add(obstacle);}

}



function Spawnfood(){
  
  if (frameCount % 60 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(120,270));
    food.addImage(bananaImage);
    food.scale = 0.08;
    food.velocityX = -5 ;
    
    food.lifetime = 300 ;
  
  foodGroup.add(food);}
  


}





































