var monkey,ground,ground1,invisibleGround,banana,stone;
var stoneGroup,bananaGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart;
var life1,life2,life3;
var count =0;
var high = 0;

function preload() {

monkey1 = loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png","monkey8.png","monkey9.png","monkey10.png");
  banana1 = loadImage("banana.png");
  ground1 = loadImage("grass.jpg");
  stone1 = loadImage("stone.png");
  gameOver1 = loadImage("gameover.jpg");
  restart1 = loadImage("play again.png");
  life = loadImage("life.png");
}


function setup() {
  
  createCanvas(400, 400);

  monkey = createSprite(50,360,20,20);
  monkey.addAnimation("monkey",monkey1);
  monkey.frameDelay = 3;
  monkey.scale = 0.13;

  ground = createSprite(200,385,400,30);
  //ground.addAnimation("grass",ground1);
  ground.shapeColor = "Green";
  ground.scale = 1.5;
  ground.velocityX = -2;  
  
  ground1 = createSprite(200,385,400,30);
  //ground1.addAnimation("grass1",ground1);
  ground1.shapeColor = "Green";
  ground1.scale = 1.5;  
  
  invisibleGround = createSprite(200,374,400,20);
  invisibleGround.visible = false;
  
  life1 = createSprite(25,20,20,20);
  life1.addAnimation("life1",life);
  life1.scale = 0.6;
  
  life2 = createSprite(60,20,20,20);
  life2.addAnimation("life2",life);
  life2.scale = 0.6;
  
  life3 = createSprite(96,20,20,20);
  life3.addAnimation("life3",life);
  life3.scale = 0.6;
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  gameOver = createSprite(200,160,20,20);
  gameOver.addAnimation("gameOver",gameOver1);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(200,300,20,20)
  restart.addImage("restart",restart1);
  restart.scale = 1;  
  restart.visible = false;  
  
}


function draw() {
  background(185,247,255);

  monkey.collide(invisibleGround);
  
  if(gameState === PLAY) {
  
   if (ground.x < 0){
    ground.x = ground.width/2;
    } 
  
  if(keyDown("space") && monkey.y >= 324) {
  monkey.velocityY = -12;  
  }
   
  monkey.velocityY = monkey.velocityY + 0.8;
       
  spawnBananas();
  spawnStones(); 
    
   if(bananaGroup.isTouching(monkey)){
   score = score + 1;  
     bananaGroup.destroyEach();
     
    switch(score) {
    
      /*case 10: monkey.scale = 0.14;
        break;
      case 20: monkey.scale = 0.15;  
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.17;
        break;*/
        
  }  
   } 
     
  if(stoneGroup.isTouching(monkey)) {
    
    count = count+1;
    stoneGroup.destroyEach();
    if(count == 1){
       life3.visible =false;
     }
     
    else if(count == 2){
       life2.visible =false;
     }
    
    else if(count== 3){
       life1.visible =false;
  
      gameState = END;
     }
    
    
  }     
}
  
  else if(gameState === END) {
  ground.velocityX = 0;
  stoneGroup.setVelocityXEach(0);
  stoneGroup.setLifetimeEach(-1);
    
  bananaGroup.setVelocityXEach(0);
  bananaGroup.setLifetimeEach(-1);
    
  monkey.velocityY = 0;  
  monkey.visible = false;
    
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
    
  gameOver.visible = true;
  restart.visible = true;  
  background("black");  
  }
    
  if(mousePressedOver(restart)) {
  reset();  
  }
  
drawSprites();

  fill("Black");
  textSize(20);
  text("Score : " + score,300,30);
  
  fill("black");
  text("High Score : " + high,255,60);

}


function spawnBananas() {
  if(frameCount % 70 === 0) {
    banana = createSprite(400,300,10,40);
    banana.velocityX = -6;
    banana.y = random(200,300);
    banana.addAnimation("banana",banana1);
    banana.scale = 0.03;
    banana.lifetime = 80;

    bananaGroup.add(banana);
  }
}

function spawnStones() {
  if(frameCount % 200 === 0) {
    stone = createSprite(400,340,10,40);
    stone.velocityX = -6;
    var rand = random(0);
    stone.addAnimation("stone",stone1);
    stone.scale = 0.7 + rand;
    stone.setCollider("circle",0,0,40)
    stone.lifetime = 70;

    stoneGroup.add(stone);
  }
}

function reset() {
  
  if(count > high) {
  high = count;
  }  
  
  gameState = PLAY;
  score = 0;
  life1.visible = true;
  life2.visible = true;
  life3.visible = true;
  monkey.visible = true;
  gameOver.visible = false;
  restart.visible = false;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();

}




