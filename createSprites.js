///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Sprite Creation Functions /////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSprite(image, x, y, wTeam)
{
    sprite = new PIXI.Sprite.from(image);
    sprite.anchor.set(0.5);
    sprite.x = app.view.width / x;
    sprite.y = app.view.height / y;
    sprite.up = true;
    sprite.left = true;
    sprite.down = true;
    sprite.right = true;
    sprite.health = 100;
    sprite.invuln = 0;
    sprite.team = wTeam;
    console.log("I am " + sprite.team + " team!");
    if(wTeam != "background")
        sprites.push(sprite);

    mainScreen.addChild(sprite);
    return sprite;
}

function createSpriteByPixel(image, x, y, wTeam)
{
    sprite = new PIXI.Sprite.from(image);
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.up = true;
    sprite.left = true;
    sprite.down = true;
    sprite.right = true;
    sprite.health = 100;
    sprite.invuln = 0;
    sprite.team = wTeam;
    //console.log("I am " + sprite.team + " team!");
    if(wTeam != "background")
        sprites.push(sprite);
    if(wTeam == "UI")
        uiSprites.push(sprite);

    mainScreen.addChild(sprite);
    return sprite;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Animated Sprite Functions ///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createSpriteFromSheet(poSheet, x, y, wTeam)
{
    sprite = new PIXI.AnimatedSprite(poSheet.regularSprite);
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.up = true;
    sprite.left = true;
    sprite.down = true;
    sprite.right = true;
    sprite.health = 100;
    sprite.invuln = 0;
    sprite.team = wTeam;
    sprite.sheet = poSheet;
    //console.log("I am " + sprite.team + " team!");
    sprites.push(sprite);
    if(wTeam == "UI")
        uiSprites.push(sprite);

    mainScreen.addChild(sprite);
    return sprite;
}

function createAnimatedSpriteByPixel(image, x, y, wTeam)
{
    let poSheet = createPlayerSheet(image);
    console.log(typeof(poSheet.regularSprite))
    //console.log("poSheet = " + image.naturalHeight);
    sprite = new PIXI.AnimatedSprite(poSheet.regularSprite);
    sprite.anchor.set(0.5);
    sprite.animationSpeed = 0.04;
    sprite.loop= true;
    sprite.x = x;
    sprite.y = y;
    sprite.health = 100;
    sprite.invuln = 0;
    sprite.team = wTeam;
    sprite.sheet = poSheet;
    sprites.push(sprite);

    mainScreen.addChild(sprite);
    sprite.play();
    return sprite;
}

function createPlayerSheet(image)
{
    let ssheet = new PIXI.BaseTexture.from(image);
    let w = 32;
    let h = 32;
    let pSheet = {};

    pSheet["regularSprite"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, h))
    ];

    pSheet["invulnerable"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 * w, 0, w, h))
    ];
    return pSheet;
}

function createContextBox(x, y, items)
{
    let ssheet = new PIXI.BaseTexture.from("images/contextBox.png");
    let w = 196;
    let h = 64;
    let hh = 0;
    let poSheet = [];
    let psheet = createPlayerSheet("images/contextBox.png");
    let i = 0;
    while(i<8)
    {
        hh = h*i + 5;
        //console.log(hh);
        poSheet[i] = new PIXI.Texture(ssheet, new PIXI.Rectangle(0, 0, w, hh))
        i++;
    }
    
    console.log(typeof(poSheet[items]))
    
    sprite = new PIXI.AnimatedSprite(psheet.regularSprite);
    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.sheet = poSheet;
    sprites.push(sprite);


    mainScreen.addChild(sprite);
    sprite.play();
    return sprite;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Text Creation Functions ///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createText(text, x, y, font)
{
    text = new PIXI.Text(text);
    text.x = x;
    text.y = y;
    console.log("rein.x is - " + rein.x);
    console.log("rein.y is - " + rein.y);
    text.anchor.set(0.5);
    text.style = new PIXI.TextStyle({
        fontSize: 24,
        fontFamily: font,
    });
    texts.push(text);
    mainScreen.addChild(text);
    console.log('Text created!');
    return text;
}

function createUIText(text, x, y, font, textName)
{
    mainScreen.removeChild(textName);
    text = new PIXI.Text(text);
    text.x = x;
    text.y = y;
    console.log("rein.x is - " + rein.x);
    console.log("rein.y is - " + rein.y);
    text.anchor.set(0.5);
    text.style = new PIXI.TextStyle({
        fontSize: 24,
        fontFamily: font,
    });
    text.team = "UI";
    uiSprites.push(text);
    texts.push(text);
    mainScreen.addChild(text);
    console.log('Text created!');
    return text;
}

function activateTopText(text, time, font)
{
    mainScreen.removeChild(topText);
    text = new PIXI.Text(text);
    text.x = rein.x;
    text.y = rein.y - 450;
    console.log("rein.x is - " + rein.x);
    console.log("rein.y is - " + rein.y);
    text.anchor.set(0.5);
    text.style = new PIXI.TextStyle({
        fontSize: 24,
        fontFamily: font,
    });
    texts.push(text);
    mainScreen.addChild(text);
    tt = true;
    ttime = time;
    uptime = time - 25;
    return text;
}

