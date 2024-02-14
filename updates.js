async function doUpdates()
{
    
    updateUIElements(playerSpeed);
    if(tt)
    {
        updateText();
    }
    
    updateBullets();
    checkBulletCollision();
    updateInvuln();
    changeWeapon();
    anyIntersect(rein);
    updateCooldowns();
    //I will go through all the sprites and the ones that are team ui I will move along with the player (rein)
}

function updateInvuln()
{
    let i = 0;
    let l = sprites.length;

    while(i<l)
    {
        if(sprites[i].invuln == 1)
        {
            sprites[i].textures = sprites[i].sheet.regularSprite;
            //console.log("We updatin invuln yo");
        }
                    
        if(sprites[i].invuln > 0)
        {
            sprites[i].invuln -= 1;
        }
                    

        //console.log("We updatin invuln yo");
        i++;
    }
}

function updateText()
{
    // W
    if(keys["87"] && rein.up) {
        topText.y -= playerSpeed;
    }
    // A
    if(keys["65"] && rein.left) {
        topText.x -= playerSpeed;
    }
    // S
    if(keys["83"] && rein.down) {
        topText.y += playerSpeed;
    }
    // D
    if(keys["68"] && rein.right) {
        topText.x += playerSpeed;
    }
    if(ttime > uptime)
        topText.y += 4;
    else if(ttime < 26)
        topText.y -= 4;

    ttime--;
    if(ttime == 0)
    {
        mainScreen.removeChild(topText);
        tt = false;
    }
}

function updateUIElements(ps)
{
    let i = 0;
    let l = uiSprites.length;
    //console.log("The playerSpeed is (UI) " + ps);
    while(i<l)
    {
        // W
        if(keys["87"] && rein.up) {
            //console.log("And here's the proof!")
            //console.log("We pressed W and rein.up is: " + rein.up);
            uiSprites[i].y -= ps;
        }
        // A
        if(keys["65"] && rein.left) {
            //console.log("We pressed A and rein.left is: " + rein.left);
            uiSprites[i].x -= ps;
        }
        // S
        if(keys["83"] && rein.down) {
            //console.log("We pressed S and rein.down is: " + rein.down);
            uiSprites[i].y += ps;
        }
        // D
        if(keys["68"] && rein.right) {
            //console.log("We pressed D and rein.right is: " + rein.right);
            uiSprites[i].x += ps;
        }

        i++;
    }
    
}

function changeWeapon()
{
    if(!switchedWeapons)
    {
        // 1
        if(keys["49"]) {
            swapWeapons(1);
        }
        // 2
        else if(keys["50"]) {
            swapWeapons(2);
        }
        // 3
        else if(keys["51"]) {
            swapWeapons(3);
        }
        // 4
        else if(keys["52"]) {
            swapWeapons(4);
        }
        // 5
        else if(keys["53"]) {
            swapWeapons(5);
        }
        // 6
        else if(keys["54"]) {
            swapWeapons(6);
        }
        // 7
        else if(keys["55"]) {
            swapWeapons(7);
        }
        // 8
        else if(keys["56"]) {
            swapWeapons(8);
        }
        // 9
        else if(keys["57"]) {
            swapWeapons(9);
        }
        // 10 (0)
        else if(keys["48"]) {
            swapWeapons(10);
        }
    }
    else if(!keys["48"] && !keys["49"] && !keys["50"] && !keys["51"] && !keys["52"] && !keys["53"] && !keys["54"] && !keys["55"] && !keys["56"] && !keys["57"])
    {
        switchedWeapons = false;
    }
}

function swapWeapons(k)
{
    if(k >= inventory.length || !inventory[k].equip)
        return 0;
    
    switchedWeapons = true;

    let tempx = inventory[0].smallChild.x
    inventory[0].smallChild.x = inventory[k].smallChild.x;
    inventory[k].smallChild.x = tempx;

    [inventory[0], inventory[k]] = [inventory[k], inventory[0]]; //Swaps the elements at the given indexes for the inventory array
}

function updateMoney(x)
{
    money += x
    moneyText = createUIText("X " + money, rein.x - 300, rein.y + 400, "james", moneyText);
}

function updateCooldowns()
{
    if(dashCD>0)
    {
        dashCD--;
        if(dashSpeedReduction > 0)
        {
            dashSpeedReduction--;
            console.log("We are decrementing the playerSpeed by 20 now!");
            playerSpeed -= 20;
        }
    }
}