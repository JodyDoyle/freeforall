
function usePotion(e)
{
  /*let cursorX = e.clientX;
  let cursorY = e.clientY;
  let playerX = rein.getGlobalPosition().x;
  let playerY = rein.getGlobalPosition().y;
  let realX = cursorX - playerX;
  let realY = cursorY - playerY;
  let actualX = realX + rein.x;
  let actualY = realY + rein.y; */
  let actualX = e.clientX - rein.getGlobalPosition().x + rein.x;
  let actualY = e.clientY - rein.getGlobalPosition().y + rein.y;

  //console.log("The position of rein is X: " + rein.x + " Y: " + rein.y);
  //console.log("The global position of rein is X: " + rein.getGlobalPosition().x + " Y: " + rein.getGlobalPosition().y);
  //console.log("The cursor position is X: " + e.clientX + " Y: " + e.clientY);
  //console.log("The real cursor position is X: " + realX + " Y: " + realY);

  let target = createSpriteByPixel("images/target.png", actualX, actualY, "background");

  // Make a sprite of a target where the player clicked 
  //and then have the potion move towards that target
  // Then chen for damage or whatever
  // Then get rid of the target and potion sprites

}