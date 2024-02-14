function merchant()
{
    if(inventory.length == 0)
        topText = activateTopText("Nooooooo you don't have any fish to sell! but i do like u", 300, "james");
    else if(typeof inventory[inventory.length-1].type == "undefined")
        topText = activateTopText("Nooooooo you don't have any fish to sell! and I hate you", 300, "james");
    else if(inventory[inventory.length-1].type == "fish")
    {
        topText = activateTopText("Which fish would you like to sell?", 300, "james");
        
        let i = 1;
        while(i<inventory.length)
        {
            if(inventory[i].type == "fish")
                inventorySprites[i].textures = inventorySprites[i].sheet.selectable;
            else
                inventorySprites[i].textures = inventorySprites[i].sheet.unselectable;
            i++;
        }

        lockMovement();
        selectingFish = true;

        // Wait for them to click
        

    }
    else
    {
        topText = activateTopText("Nooooooo you don't have any fish to sell!", 300, "james");
    }
            
}

function regularMerchant(x) // sells fish for their base price
{

    topText = activateTopText("You sold " + inventory[x].name + " for " + inventory[x].basePrice + " cat dollars!", 300, "james");
    inventorySprites[inventory.length-1].textures = inventorySprites[inventory.length-1].sheet.regularSprite;
    updateMoney(inventory[x].basePrice);
    removeInventoryItem(x);

}

function blueMerchant(x) // sells fish for different prices depending on his mood. :(
{
    let fishprice = inventory[x].basePrice;
    switch(blueMerchantMood)
    {
        case "super bad":
            fishprice = Math.ceil(fishprice * 0.5);
            break;
        case "bad":
            fishprice = Math.ceil(fishprice * 0.75);
            break;
        case "good":
            fishprice = Math.ceil(fishprice * 1.25);
            break;
    }
    topText = activateTopText("He was in a " + blueMerchantMood + " mood, so you received " + fishprice + " cat dollars for your " + inventory[x].name, 300, "james");
    inventorySprites[inventory.length-1].textures = inventorySprites[inventory.length-1].sheet.regularSprite;
    updateMoney(fishprice);
    removeInventoryItem(x);
}

function neonPinkMerchant(x) // sells fish for random prices based on a sigmoid function
{
    let fishprice = Math.round(neonPinkMerchantMood * inventory[x].basePrice);
    topText = activateTopText("For some reason he gave you " + fishprice + " cat dollars for your " + inventory[x].name, 300, "james");
    inventorySprites[inventory.length-1].textures = inventorySprites[inventory.length-1].sheet.regularSprite;
    updateMoney(fishprice);
    removeInventoryItem(x);
}

function setMerchantMoods()
{
    // Sets the mood for the blue merchant
    let rand = Math.random() * 10;
    if(rand < 1)
        blueMerchantMood = "super bad";
    else if(rand < 4)
        blueMerchantMood = "good";
    else
        blueMerchantMood = "bad";
    console.log("The blue merchant is in a " + blueMerchantMood + " mood.");

    // Sets the sigmoid value for the neon pink merchant
    rand = Math.random() - 0.05;
    let check = rand * 1000000000; 
    if(check % 2 < 1)
        rand *= -1
    neonPinkMerchantMood = sigmoid(rand) + 0.5;
    console.log("And the sig value for the neon pink merchant is " + neonPinkMerchantMood);
    
}

function buyMerchant()
{
    
}

function sigmoid(x)
{
    return 1 / (1 + Math.exp(-x))
}