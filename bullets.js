// Fires a bullet in the direction of the cursor
function fireBullet(e)
{
    let cursorX = e.clientX;
    let cursorY = e.clientY;
    let playerX = rein.getGlobalPosition().x;
    let playerY = rein.getGlobalPosition().y;
    let realX = cursorX - playerX;
    let realY = cursorY - playerY;
    let comb = combination(realY, realX);
    let Xratio = realX / comb;
    let Yratio = realY / comb; 
    //let mouseData = e.data.global.x;
    //let localP = rein.getLocalBounds();
    //let localX = localP.x;
    //let globalX = rein.getGlobalPosition().x;

    //console.log("Xratio is: " + Xratio)
    //console.log("Yratio is: " + Yratio)
    //aconsole.log("cursorX is: " + cursorX)
    //console.log("cursorY is: " + cursorY)
    //console.log("playerX is: " + playerX)
    //console.log("playerY is: " + playerY)
    //console.log("realX is: " + realX)
    //console.log("realY is: " + realY)
    //console.log("comb is: " + comb)
    //console.log("localX is: " + localX)
    //console.log("globalX is: " + globalX)
    //console.log("mouseData is: " + mouseData)
    //console.log(mainScreen.width);
    //console.log(mainScreen.height);

    // You move right, x increases
    // You move down, y increases

    let bullet = createBullet(Xratio, Yratio);
    console.log("I am a cartoonnnnnn");
    
    bullets.push(bullet);
    console.log("The xDirection of the bullet is: " + bullets[0].xDirection);
    console.log("There are " + bullets.length + " bullets atm");
    
    bulletCount++;
    //let leng = bullets.length;
}

function display(event) {
    let X = event.clientX;
    console.log("The X coordinate of the cursor is " + X);
 }

function createBullet(x, y){
    console.log("The xDirection of the bullet should be: " + x);
    let bullet = new PIXI.Sprite.from("images/bullet.png");
    bullet.anchor.set(0.5);
    bullet.x = rein.x;
    bullet.y = rein.y;
    bullet.speed = bulletSpeed;
    bullet.team = playerTeam;
    bullet.xDirection = x;
    bullet.yDirection = y;
    //testArray.push("Rooster");
    mainScreen.addChild(bullet);
    //console.log("I am a cartoon");

    //console.log("The x pos is updating " + bullet.speed * bullet.xDirection + " every frame");
    //console.log("The y pos is updating " + bullet.speed * bullet.yDirection + " every frame");

    return bullet;

}

function updateBullets()
{
    for (let i = 0; i < bullets.length; i++)
    {
        bullets[i].position.y += (bullets[i].speed * bullets[i].yDirection);
        bullets[i].position.x += (bullets[i].speed * bullets[i].xDirection);
        console.log("We are updating a bullet!");
        //bullets.push("Balls");
        

        if (bullets[i].position.y < 0 || bullets[i].position.y > app.view.height || bullets[i].position.x < 0 || bullets[i].position.x > app.view.width)
        {
            console.log("We are removing a bullet!");
            mainScreen.removeChild(bullets[i]);
            bullets.splice(i,1);
        }
    }
}

function combination(x, y)
{
    if(x < 0)
        x *= -1;
    if(y < 0)
        y *= -1;
    return x + y;
}