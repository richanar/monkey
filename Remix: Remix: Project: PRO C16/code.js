var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","4d02f4f3-c5b8-4c94-ac70-2f76e94ed3d2"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"4Map_Q3DmTPV6X6F2IvtC6UHqbPvElqb","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"rVjhodICUW2eNxwQ0_DWZ_gnDwQvi6.4","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"xBYA7XJhCgbHhSp39euyAgSaV__haRxM","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"4d02f4f3-c5b8-4c94-ac70-2f76e94ed3d2":{"name":"Jungle","sourceUrl":"assets/v3/animations/IzDdJHN6foOYMEuHTKfTeB8tvVEc5q_nJEyBGaxAmEE/4d02f4f3-c5b8-4c94-ac70-2f76e94ed3d2.png","frameSize":{"x":1003,"y":771},"frameCount":1,"looping":true,"frameDelay":4,"version":"wyGvM2OE5fTIVTvBZrhdBx54eFs4mgf5","loadedFromSource":true,"saved":true,"sourceSize":{"x":1003,"y":771},"rootRelativePath":"assets/v3/animations/IzDdJHN6foOYMEuHTKfTeB8tvVEc5q_nJEyBGaxAmEE/4d02f4f3-c5b8-4c94-ac70-2f76e94ed3d2.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var background1= createSprite(50,50,50,50);
background1.setAnimation("Jungle");
background1.velocityX = -4;


var player=createSprite(100,240,20,50);
player.setAnimation("monkey");
player.scale=0.1;


var ObstaclesGroup = createGroup();
var BananaGroup = createGroup();




var survivalTime=0;
function draw() {
  
  background(255);
  
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")){
      player.velocityY = -12 ;
      
    }
  
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    createEdgeSprites();
    player.collide(edges);
    spawnBananas();
    spawnObstacle();
    drawSprites();
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(World.frameCount/frameRate());
    text("Survival Time: "+ survivalTime,100,50);
}
function spawnObstacle() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,345,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    obstacle.setAnimation("Stone");
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    var bananas = createSprite(400,320,40,10);
    bananas.y = randomNumber(120,200);
    bananas.setAnimation("Banana");
    bananas.scale = 0.05;
    bananas.velocityX = -3;
    
     //assign lifetime to the variable
    bananas.lifetime = 134;
    
    //adjust the depth
    bananas.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    BananaGroup.add(bananas);
  }
  
}



  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
