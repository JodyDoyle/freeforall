function createSwingAnimation(image, h, w)
{
    let ssheet = new PIXI.BaseTexture.from(image);
    let aSheet = {};

    aSheet["regularSprite"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, h))
    ];

    aSheet["swing"] = [];

    let i = 0;
    if(w>h)
    {
      while (i <= w)
      {
        aSheet["swing"].push(new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, i, h)));
        i++;
      }
    }
    else
    {
      while (i <= h)
      {
        aSheet["swing"].push(new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, i)));
        i++;
      }
    }
    

    return aSheet;
}
let frameCount = 0;
let swingArcSheet;
let swingArc;
let dirInfo;

function swing(e)
{
  if(inventory[0].name = 'dagger' && sprites.indexOf(swingArc) == -1)
  {
    dirInfo = whichArc(e);
    swingArcSheet = createSwingAnimation(dirInfo.pic, dirInfo.h, dirInfo.w);

    swingArc = new PIXI.AnimatedSprite(swingArcSheet.swing);
    swingArc.anchor.set(0.5);
    swingArc.animationSpeed = 4;
    swingArc.loop= false;
    swingArc.x = rein.x + dirInfo.xOffset;
    swingArc.y = rein.y + dirInfo.yOffset;
    swingArc.team = rein.team;
    swingArc.sheet = swingArc;
    swingArc.onComplete = function() {
      let n = sprites.indexOf(swingArc);
      sprites.splice(n,1);
      frameCount = 0;
      mainScreen.removeChild(swingArc);
    };
    swingArc.onFrameChange = function() {
      checkDaggerCollision(swingArc);
      frameCount += 0.84;
      swingArc.x = rein.x + dirInfo.xOffset;
      swingArc.y = rein.y + dirInfo.yOffset;
      if(dirInfo.w>dirInfo.h)
        swingArc.x += frameCount;
      else
        swingArc.y += frameCount;
      // W
      if(keys["87"] && rein.up) {
        swingArc.y -= playerSpeed;
      }
      // A
      if(keys["65"] && rein.left) {
        swingArc.x -= playerSpeed;
      }
      // S
      if(keys["83"] && rein.down) {
        swingArc.y += playerSpeed;
      }
      // D
      if(keys["68"] && rein.right) {
        swingArc.x += playerSpeed;
      }

      
    };
    sprites.push(swingArc);
    console.log(swingArc);

    mainScreen.addChild(swingArc);
    swingArc.play();
  }
}

function whichArc(e)
{
  // x goes up as you travel right
  // y goes up as you travel down
  let dirInfoo = {};
  let downn = false;
  let rightt = false;
  let cursorX = e.clientX;
  let cursorY = e.clientY;
  let playerX = rein.getGlobalPosition().x;
  let playerY = rein.getGlobalPosition().y;
  
  let realX = cursorX - playerX;
  let realY = cursorY - playerY;

  //console.log("realX = " + realX);
  //console.log("realY = " + realY);

  if (realX > 0)
    rightt = true;
  else
    realX *= -1;

  if (realY > 0)
    downn = true;
  else
    realY *= -1;
  
  if (realX >= realY)
  {
    if(rightt)
    {
      dirInfoo.pic = "images/swingArcRight96x48.png";
      dirInfoo.xOffset = 42
      dirInfoo.yOffset = -48
      dirInfoo.h = 96
      dirInfoo.w = 48
    }
    else
    {
      dirInfoo.pic = "images/swingArcLeft96x48.png";
      dirInfoo.xOffset = -42
      dirInfoo.yOffset = -48
      dirInfoo.h = 96
      dirInfoo.w = 48
    }
  }
  else
  {
    if (downn)
    {
      dirInfoo.pic = "images/swingArcDown48x96.png";
      dirInfoo.xOffset = -48
      dirInfoo.yOffset = 42
      dirInfoo.h = 48
      dirInfoo.w = 96
    }
    else
    {
      dirInfoo.pic = "images/swingArcUp48x96.png";
      dirInfoo.xOffset = -48
      dirInfoo.yOffset = -42
      dirInfoo.h = 48
      dirInfoo.w = 96
    }
  }

  return dirInfoo;
}