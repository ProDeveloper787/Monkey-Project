
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
     bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
monkey = createSprite(50,350,50,50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,390,800,20);
  ground.x = ground.width/2;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}


function draw() {
background("white");
  
  text("Score: " +score,300,50);
  
  score = score+Math.round(getFrameRate()/60);
  
  if(keyDown("space")) {
    monkey.velocityY = -8;
  }
  
  monkey.velocityY = monkey.velocityY+1;
  
  ground.velocityX = -5;
  
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    monkey.velocityY = 0;
    ground.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  spawnFood();
  
  spawnObstacles();
  
  monkey.collide(ground);

  drawSprites();
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 60 === 0) {
    var food = createSprite(400,320,40,10);
    food.y = Math.round(random(280,320));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 130;
    
    //adjust the depth
    food.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each food to the group
    FoodGroup.add(food);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}



