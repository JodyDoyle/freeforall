// This function takes 2 sprites as inputs and checks if they are touching
function spritesIntersect(a,b)
{
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width >= bBox.x &&
           aBox.x <= bBox.x + bBox.width &&
           aBox.y + aBox.height >= bBox.y &&
           aBox.y <= bBox.y + bBox.height;
}

//Checks which direction two sprites are intersecting and returns the appropriate integer
function whichIntersect(a,b)
{
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    let up = 0;
    let down = 0;
    let left = 0;
    let right = 0;

    left = aBox.x + aBox.width;
    right = aBox.x - bBox.width;
    up = aBox.y - bBox.height;
    down = aBox.y + aBox.height;

    let leftCheck = left - bBox.x;
    if(leftCheck < 0)
        leftCheck *= -1;

    let rightCheck = right - bBox.x;
    if(rightCheck < 0)
        rightCheck *= -1;

    let upCheck = up - bBox.y;
    if(upCheck < 0)
        upCheck *= -1;

    let downCheck = down - bBox.y;
    if(downCheck < 0)
        downCheck *= -1;


    let check = Math.min(leftCheck, rightCheck, upCheck, downCheck);
    collisionCheck = check;

    if (check == upCheck)
    {
        return 3;
    }
    else if (check == downCheck)
    {
        return 4;
    }
    else if (check == leftCheck)
    {
        return 2;
    }
    else if (check == rightCheck)
    {
        return 1;
    }
    
    else
    {
        return 0;
    }
}

function anyIntersect(player)
{
    let i = 0;
    let l = sprites.length;
    let b = true;

    while(i<l)
    {
        if(spritesIntersect(player,sprites[i]))
        {
            if(sprites[i].team == "pickup")
            {
                pickup(sprites[i]);
            }
            else if(sprites[i].team != "background")
            {
                disableMovement(whichIntersect(player,sprites[i]))
                b = false;
            }
            
        }
        i++;
    }
    if(b)
    {
        player.left = true;
        player.right = true;
        player.up = true;
        player.down = true;
    }
}

function disableMovement(check)
{
    switch(check)
    {
        case 1:
            rein.left = false;
            rein.x += collisionCheck;
            break;
        case 2:
            rein.right = false;
            rein.x -= collisionCheck;
            break;
        case 3:
            rein.up = false;
            rein.y += collisionCheck;
            break;
        case 4:
            rein.down = false;
            rein.y -= collisionCheck;
    }
    collisionCheckUIElements(check);
}

function collisionCheckUIElements(check)
{
    let i = 0;
    let l = uiSprites.length;
    //console.log("UI function: moved = " + moved);
    while(i<l)
    {
        switch(check)
        {
            case 1:
                uiSprites[i].x += collisionCheck;
                break;
            case 2:
                uiSprites[i].x -= collisionCheck;
                break;
            case 3:
                uiSprites[i].y += collisionCheck;
                break;
            case 4:
                uiSprites[i].y -= collisionCheck;
        }

        i++;
    }
}

function checkRelevantIntersection(player)
{
    let i = 0;
    let l = sprites.length;

    while(i<l)
    {
        if(spritesIntersect(player,sprites[i]))
        {
            if(sprites[i].type == "merchant")
                return sprites[i];
        }
        i++;
    }
    return 0;
}

function checkBulletCollision()
{
    let i = 0;
    let j = 0;
    let ll = sprites.length;
    let l = bullets.length;
    //console.log(l);

    while(i<l)
    {
        while(j<ll)
        {
            if(spritesIntersect(bullets[i],sprites[j]) && sprites[j].invuln <= 0 && bullets[i].team != sprites[j].team)
            {
                //console.log("A bullet hit " + i);
                //console.log("The bullet's team was " + bullets[i].team);
                // Need to add invulnerability frames and deprecate health and check for death when a sprite is hit by a bullet
                // Need to also check if the sprite is friend or foe when checking if the sprite should take damage
                // Should probably also remove the bullet once it damaged someone

                console.log("The bullet's team is " + bullets[i].team);
                console.log("The sprite's team is " + sprites[j].team);

                mainScreen.removeChild(bullets[i]);
                console.log("We are removing a bullet because of a collision");
                bullets.splice(i,1);
                l--;
                
                if(sprites[j].team == "blue" || sprites[j].team == "red")
                {
                    sprites[j].invuln += 80;
                    sprites[j].health -= 10;
                    //console.log((playerSheet));
                    sprites[j].textures = sprites[j].sheet.invulnerable;
                    sprites[j].play();
                    //console.log(sprites[j].health);
                    //checkForDeath(sprites[j]);
                }
                

                if(i==l)
                {
                    j = ll;
                }

            }

            j++;
        }
        j = 0;
        i++;
    }
}


function checkDaggerCollision(swingArc)
{
    let i = 0;
    let l = sprites.length;

    while(i<l)
    {
        if(spritesIntersect(swingArc,sprites[i]) && sprites[i].invuln <= 0 && swingArc.team != sprites[i].team)
        {
            if(sprites[i].team == "blue" || sprites[i].team == "red")
            {
                sprites[i].invuln += 80;
                sprites[i].health -= 10;
                //console.log((playerSheet));
                sprites[i].textures = sprites[i].sheet.invulnerable;
                sprites[i].play();
                //console.log(sprites[j].health);
                //checkForDeath(sprites[j]);
            }
        }
        i++;
    }
}