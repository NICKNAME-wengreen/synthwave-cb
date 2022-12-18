function getPosition(e){
    var rect = e.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}

function isInViewport(e) {
    const rect = e.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let windowRatioX = 0;
let windowRatioY = 0;

let loadScreenDeleted = false;
function scaleMusicPlayer(){
    var e = document.getElementById('videoBg');
    var mp = document.getElementById('musicPlayer');

    var la = document.getElementById('loadScreen');
    var lb = document.getElementById('loadScreenCtx');

    windowRatioX = 1920/window.screen.availWidth;
    windowRatioY = 1080/window.screen.availHeight;

    console.log("|X: " + windowRatioX + "|Y: " + windowRatioY);

    e.style.width = mp.clientWidth + "px";
    e.style.height = mp.clientHeight + "px";

    if(!loadScreenDeleted){
        la.style.width = mp.clientWidth + "px";
        lb.style.width = mp.clientWidth + "px";

        console.log(mp.clientWidth + " musicPlayer width;");

        la.style.height = mp.clientHeight + "px";
        lb.style.height = mp.clientHeight + "px";

        console.log(mp.clientHeight + " musicPlayer height;");
    }
}

let ctxMenuAnim;
let ctxMenuAnimMutex = false;
let ctxMenuBtnPressed = false;

function ctxMenuBtnPress(){
    var ctx = document.getElementById('ctxMenu');
    var btn = document.getElementById('ctxMenuBtn');
    var siteBar = document.getElementById('siteBar');
    var pos = getPosition(btn);

    if(!ctxMenuBtnPressed&&!ctxMenuAnimMutex){
        ctxMenuBtnPressed = true;
        ctx.style.visibility = "visible";
        document.documentElement.style.setProperty('--ctx1',"translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(-" + ctx.clientHeight + "px)");
        document.documentElement.style.setProperty('--ctx2',"translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(" + siteBar.clientHeight + "px)");
        ctx.style.animation="ctxMenuSlide .6s 1 forwards";

        ctxMenuAnimMutex = true;
        clearTimeout(ctxMenuAnim);
        ctxMenuAnim = setTimeout(function(){
            ctx.style.animation = "none";
            ctx.style.transform = "translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(" + siteBar.clientHeight + "px)";
            ctxMenuAnimMutex = false;
        },600);
    }else{
        ctxMenuBtnPressed = false;
        ctx.style.visibility = "visible";
        document.documentElement.style.setProperty('--ctx1',"translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(" + siteBar.clientHeight + "px)");
        document.documentElement.style.setProperty('--ctx2',"translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(-" + ctx.clientHeight + "px)");
        ctx.style.animation="ctxMenuSlide .6s 1 forwards";

        ctxMenuAnimMutex = true;
        clearTimeout(ctxMenuAnim);
        ctxMenuAnim = setTimeout(function(){
            ctx.style.visibility = "hidden";
            ctx.style.animation = "none";
            ctx.style.transform = "translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(-" + ctx.clientHeight + "px)";
            ctxMenuAnimMutex = false;
        },600);
    }
}

function ctxResize(){
    var ctx = document.getElementById('ctxMenu');
    var btn = document.getElementById('ctxMenuBtn');
    var siteBar = document.getElementById('siteBar');

    var pos = getPosition(btn);
    console.log(" CTXposX: " + pos.x + "| CTXposY: " + pos.y);

    if(!ctxMenuBtnPressed)
    ctx.style.transform = "translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(-" + ctx.clientHeight + "px)";
    else
    ctx.style.transform = "translatex(" + ( pos.x - (window.screen.availWidth * 0.0125) ) + "px) translatey(" + siteBar.clientHeight + "px)";

    btn.onpointerdown = function(){
        ctxMenuBtnPress();
    }
}

function start2(){
    console.log("First");
    ctxResize();

    document.body.onkeyup = function(e){
        var ctx = document.getElementById('ctxMenu');
        if(e.keyCode == 27 && isInViewport(ctx) && ctxMenuBtnPressed){
            console.log("PRESSED TEST");
            ctxMenuBtnPressed = true;
            ctxMenuBtnPress();
        }
    }

    scaleMusicPlayer();

    var script = document.createElement('script');
    script.src = "index.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = function(){
        start();
    }
}

window.onresize = function (event) {
    ctxResize();
    scaleMusicPlayer();
}

window.onload = start2;
