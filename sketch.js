var backImage,backgr;
var player,player2, player3,player_running,player_jumping,player_dead;
var ground,ground_img,invisible_ground;
var PLAY = 1, END = 0, gameState = PLAY;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var gameOver;
var score = 0;
var monkeyState = "live";
var gameover, gameover_img;
var hp0,hp1,hp2,hp0img,hp1img,hp2img;
var monkey_background,monkey_Jump,monkey_dead,monkey_dead_sfx;
var banana1sfx,banana2sfx,banana3sfx,banana4sfx,banana5sfx,banana6sfx;
var rand = 0;
var musicState = "jump";
var deadstate = "finish Him",lastlife_sfx;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running =      loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_jumping = loadImage("Monkey_Jump.png");
  player_dead = loadImage("Monkey_dead.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  gameover_img = loadImage("Khel_Khatam.png");
  hp2img = loadImage("hp2.png");
  hp1img = loadImage("hp1.png");
  hp0img = loadImage("hp0.png");
  monkey_background = loadSound("Monkey_background.mp3");
  monkey_Jump = loadSound("Monkey_jump.mp3");
  banana1sfx = loadSound("banana1.mp3");
  banana2sfx = loadSound("banana2.mp3");
  banana3sfx = loadSound("banana3.mp3");
  banana4sfx = loadSound("banana4.mp3");
  banana5sfx = loadSound("banana5.mp3");
  banana6sfx = loadSound("banana6.mp3");
  monkey_dead = loadSound("Monkey_dead.mp3");
  monkey_dead_sfx = loadSound("monkey_dead_bg.mp3");
  lastlife_sfx = loadSound("lastlife.mp3")
}

function setup() {
  createCanvas(500, 400);

//creating background sprite and giving a velocity
//to create a illusion of the the ground is moving 
  backgr = createSprite(250,50,20,20);
  backgr.addImage("b4ckground", backImage);
  backgr.scale = 1.4;
  backgr.x = backgr.width /2;
  backgr.velocityX = -4;

//creating player sprite and assigning it monkey image
  player = createSprite(100,300,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.10;

//creating player2 sprite and assigning it monkey jumping image
  player2 = createSprite(100,300,20,50);
  player2.scale = 0.10;
  player2.visible = false;

//creating player3 sprite and assigning it monkey dying image
  player3 = createSprite(100,300,20,50);
  player3.scale = 0.10;
  player3.visible = false;
  
//creating a invisible ground which makes the monkey to walk on it   
  invisible_ground = createSprite(250,350,500,10);

//creating game over sprite and assigning it text image  
  gameover = createSprite(250,200,1,1);
  gameover.addImage("Ata mugidide",gameover_img);
  gameover.visible = false;

//creating hp2 sprite and assigning it 🐒 X 2 image
  hp2 = createSprite(235,90,1,1);
  hp2.addImage("life*2", hp2img);
  hp2.scale = 0.4;
  
//creating hp1 sprite and assigning it 🐒 X 1 image
  hp1 = createSprite(235,90,1,1);
  hp1.addImage("life*1", hp1img);
  hp1.visible = false;
  hp1.scale = 0.4;
  
//creating hp0 sprite and assigning it 🐒 X 0 image  
  hp0 = createSprite(235,90,1,1);
  hp0.addImage("life*0", hp0img);
  hp0.visible = false;
  hp0.scale = 0.4;
  
// playing a background music repeatedly
  monkey_background.loop();
  
// creating food and obstacle groups  
  FoodGroup = new Group();
  obstaclesGroup = new Group();  
}

function draw() {
  
//setting background colour to black  
  background(0);
  
//making the invisible ground sprite truly invisible 
  invisible_ground.visible = false;

// customing text
  stroke("yellow");
  textSize(20);
  fill("yellow");

// writing a if loop based on gamestate variable
if (gameState === PLAY){  

//making the monkey to jump when space is pressed and also changing its animation while jumping  
    if(keyDown("space") && player.y >= 200){
      player.visible = false;
      player2.visible = true;
      player2.addImage("jump", player_jumping);
      player.velocityY = -12 ;
      player2.velocityY = -12 ;
    }
  
//plays a sound when the monkey jumps  
  if(keyDown("space") && musicState === "jump"){
      monkey_Jump.play();
      musicState = "crouch";
  }

//changes the animation to the intial after a jump is completed 
  if(keyWentUp("space")) {
      musicState = "jump";
      player.visible = true;
      player2.visible = false;
  }
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    player2.velocityY = player2.velocityY + 0.8;

//makes the ground to be looped
  if (backgr.x < 0){
    backgr.x = backgr.width/2;
  }
  
//displays the score  
  text("Score : "+ score, 200, 50);
  
//called the function to spwan bananas  
  spawnFoods();
  
//plays a music while eating the banana  
    if (player.isTouching(FoodGroup)) {
    bananaplayer();
    FoodGroup.destroyEach();
    //gives 2 points of each and every bananas ate
    score = score+2;
    fill("white");
    }
  
//increases the size of the monkey when the number divided by 5 give remainder zero excluding no.5
  
switch(score){
    case 10 : player.scale = 0.13;
              player2.scale = 0.13;
              player3.scale = 0.13;
             break;
    case 20 : player.scale = 0.16;
              player2.scale = 0.16;
              player3.scale = 0.16;
             break;
    case 30 : player.scale = 0.19;
              player2.scale = 0.19;
              player3.scale = 0.19;
             break;
    case 40 : player.scale = 0.22;
              player2.scale = 0.22;
              player3.scale = 0.22;
             break;
    case 50 : player.scale = 0.25;
              player2.scale = 0.25;
              player3.scale = 0.25;
             break;
    case 60 : player.scale = 0.28;
              player2.scale = 0.28;
              player3.scale = 0.28;
            break;
    default:  break;
}

//called the function to spawn stones
  
  spawnObstacles();
 
// reduces the life, size of the monkey and scores when the monkey gets hit by a stone
  if(obstaclesGroup.isTouching(player)){
    player.scale = 0.10;
    player.x = 210;
    player2.scale = 0.10;
    player2.x = 210;
    player3.scale = 0.10;
    player3.x = 210;
    score = score-4;
    hp2.visible = false;
    hp1.visible = true;
    lastlife_sfx.play();
    monkeyState = "knock";
  }

// changes the game to end state and plays a music
      if(obstaclesGroup.isTouching(player) && player.scale === 0.10 && monkeyState === "knock"){
        lastlife_sfx.stop();
        score = score+4;
        hp2.visible = false;
        hp1.visible = false;
        monkey_background.stop();
        monkey_dead.play(); 
        gameState = END;
    }
  }

//changes the monkey's animation to dead animation
  if(gameState === END) {
    hp0.visible = true;    
    player.visible = false;
    player3.addImage("dead", player_dead);
    player3.visible = true;
    
    //set velcity of each game object to 0
    player.velocityY = player.velocityY + 0.8;
    player2.velocityY = player2.velocityY + 0.8;
    backgr.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
        
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    gameover.visible = true;
  }

//keeps on playing the game over music infinitely   
  if(hp0.visible === true && deadstate === "finish Him") {
    monkey_dead_sfx.loop();
    deadstate = "Finished";
  }
 
//makes the player to walk on the ground
  player.collide(invisible_ground);
  player2.collide(invisible_ground);

//draws all the spite which have been written till now
  drawSprites();

//displays scores  
  text("Score : "+ score, 200, 50);

}

//creating a function to spawn bananas
function spawnFoods()
{
//generates bananas after every 140 frames
  if (frameCount % 140 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,200));
    banana.addImage("banana",bananaImage);

    //scaling & then giving the banana a certain velocity
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    // adding banana to the food group
    FoodGroup.add(banana);
  }
}

//creating a function to spawn stones
function spawnObstacles()
{  
//generates stones after every 80 frames  
if(frameCount % 80 === 0) {
//creating stone and setting a collider radius to get good gameplay experience
   var obstacle = createSprite(600,320,10,40);
   obstacle.setCollider("circle",1,10,150);
   obstacle.velocityX = -6;
   obstacle.addImage("stone",obstacle_img);
   obstacle.y = random(280,380);
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.18;
    obstacle.lifetime = 300;
        
    //adding stones to the obstacle group
    obstaclesGroup.add(obstacle);
  }
}

//function which plays randomly short sounds when the monkey eats the banana
function bananaplayer(){
    var rand = Math.round(random(1,6));
    switch(rand)
    {
      case 1:banana1sfx.play();
              break;
      case 2:banana2sfx.play();
              break;
      case 3:banana3sfx.play();
              break;              
      case 4:banana4sfx.play();
              break;       
      case 5:banana5sfx.play();
              break;
      case 6:banana6sfx.play();
              break;
              default:break
    }
}