function chngBg(i,img) {
    let e = document.getElementById(i);
    e.style.backgroundImage="url("+img+")";
} 
    
function chngBgA(img){
    let e = document.getElementById('bgImgA');
    
    document.documentElement.style.setProperty('--animNextBg',"url("+img+")");
    e.style.animation="bgChangeAnim .6s 1 forwards";
    
    setTimeout(function(){
                        e.style.backgroundImage="url("+img+")";
                        e.style.animation="none";
                        },600);
} 
    
function chngBgB(img){
    let e = document.getElementById('bgImgB');
    
    document.documentElement.style.setProperty('--animNextBg',"url("+img+")");
    e.style.animation="bgChangeAnim .6s 1 forwards";

    setTimeout(function(){
                        e.style.backgroundImage="url("+img+")";
                        e.style.animation="none";
                        },600);
}

function chngBgC(img){
    let e = document.getElementById('bgImgC');
    
    document.documentElement.style.setProperty('--animNextBg',"url("+img+")");
    e.style.animation="bgChangeAnim .6s 1 forwards";

    setTimeout(function(){
                        e.style.backgroundImage="url("+img+")";
                        e.style.animation="none";
                        },600);
}

let Tracks = [new Audio('music/DiscoZombiItalia.mp3'),
              new Audio('music/LePerv.mp3'),
              new Audio('music/LookingForTracyTzu.mp3'),
              new Audio('music/MondayHunt.mp3'),
              new Audio('music/DivisionRuine.mp3'),
              new Audio('music/RollerMobster.mp3'),
              new Audio('music/TurboKiller.mp3'),
              new Audio('music/YoureMine.mp3'),
              new Audio('music/EndTitles.mp3')
             ];

let TracksDurs=[];

function collectDurs(){
    for(var i=0;i<Tracks.length;i++){
        console.log(Tracks[i].duration);
        TracksDurs[i]=Tracks[i].duration;
        console.log(TracksDurs[i]);
    }
};
                
let TracksNames = ["Disco Zombi Italia",
                   "Le Perv",
                   "Looking For Tracy Tzu",
                   "Monday Hunt",
                   "Division Ruine",
                   "Roller Mobster",
                   "Turbo Killer",
                   "You're Mine",
                   "End Titles"
                  ];

let TracksIcons = ["cp-ep2.jpg",
                   "cp-ep1.jpg",
                   "cp-ep3.jpg",
                   "cp-lt.jpg",
                   "cp-ep3.jpg",
                   "cp-ep2.jpg",
                   "cp-ep3.jpg",
                   "furi.jpg",
                   "cp-lt.jpg"
                  ];
                  
let currentTrack=0;
let audioVolume=1;

function getPosition(element){
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}      

let mX;
let mY;
(function() {
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        event = event || window.event;
        mX=event.clientX;
        mY=event.clientY;
    }
})();

let clkSlideBTN=false;
let maxDur;
let max;
function slideBTNMov(x,align=false,trackMov=true,ratio=false){
    var s = document.getElementById('slideLine');
    var e = document.getElementById('slideBTN');
    var pos;
    
    max = s.clientWidth-e.clientWidth;  
    
    if(align){
        var lineX = getPosition(s).x;
        pos = x-lineX;
    }else if(ratio){
        pos = x * max;
    }else{
        pos = x;
    }
    if(pos>max)pos=max;
    if(pos<0)pos=0;
    /*
    // document.documentElement.style.setProperty('--slideMovAnimX',"blue");
    e.style.animation='slideMov 1.5 1 forwards';
    setTimeout(function(){
                        e.style.animation="none";
                        },1600);
    */
    e.style.transform='translatex('+pos+'px)';
    
    // console.log((pos/max)*100+"%");
    
    if(clkSlideBTN){  
        Tracks[currentTrack].currentTime=maxDur*(pos/max);
        clkSlideBTN=false;
    }
    // else{console.log("NoWORK")}
}

let clkSlideVertRBTN=false;
let maxvertR;
function slideVertRBTNMov(y,align=false,trackMov=true,ratio=false){
    var s = document.getElementById('slideVertRLine');
    var e = document.getElementById('slideRBTN');
    var pos;

    maxvertR = s.clientHeight - e.clientHeight;

    if(align){
    var lineY = getPosition(s).y;
        pos = y - lineY;
    }else if(ratio){
        pos = (1-y) * maxvertR;
    }else{
        pos = y;
    }

    if(pos>maxvertR)pos=maxvertR;
    if(pos<0)pos=0;

    if(trackMov)
    e.style.transform='translatey('+pos+'px)';

    console.log(100-(pos/maxvertR)*100+"% Rvert");
    audioVolume=1-(pos/maxvertR);
    Tracks[currentTrack].volume=audioVolume;

    if(clkSlideVertRBTN){
        // Tracks[currentTrack].currentTime=maxDur*(pos/maxvertR);
        Tracks[currentTrack].volume=audioVolume;
        clkSlideVertRBTN=false;
    }
    // else{console.log("NoWORKVertR")}
}

let clkSlideVertLBTN=false;
let maxvertL;
function slideVertLBTNMov(x,align=false,trackMov=true,ratio=false){
    var s = document.getElementById('slideVertLLine');
    var e = document.getElementById('slideLBTN');
    var pos;

    maxvertL = s.clientHeight-e.clientHeight;

    if(align){
        var lineY = getPosition(s).y;
        pos = x - lineY;
    }else if(ratio){
        pos = (1-y) * maxvertL;
    }else{
        pos = y;
    }

    if(pos>maxvertL)pos=maxvertL;
    if(pos<0)pos=0;

    e.style.transform='translatey('+pos+'px)';

    console.log((pos/maxvertL)*100+"%");

    if(clkSlideVertLBTN){
        // Tracks[currentTrack].currentTime=maxDur*(pos/max);
        clkSlideVertLBTN=false;
    }
    // else{console.log("NoWORKVertL")}
}

function clickSlideBTN(){
    var e = document.getElementById('slideBTN');
    clkSlideBTN=true;
    setTimeout(slideBTNMov(mX,true),0);
}

function clickSlideVertLBTN(){
    // var e = document.getElementById('slideLBTN');
    clkSlideVertLBTN=true;
    setTimeout(slideVertLBTNMov(mY,true),0);
}
function clickSlideVertRBTN(){
    // var e = document.getElementById('slideRBTN');
    clkSlideVertRBTN=true;
    setTimeout(slideVertRBTNMov(mY,true),0);
}

function alignCrntTime(){
    let dc = document.getElementById('crntDur');
    let crntDur = Tracks[currentTrack].currentTime;
    var minutes = Math.floor(crntDur/60);
    var seconds = Math.floor(crntDur-(minutes*60));
    if(seconds<10)seconds="0"+seconds;

    dc.innerHTML = minutes+":"+seconds;
    slideBTNMov(Math.floor((crntDur/maxDur)*max));

    // console.log("|"+Math.floor((crntDur/maxDur)*max)+'px');

    if(crntDur==maxDur){
        stopPressed=false;
        stopPress();
        slideBTNMov(0);
        dc.innerHTML = "0:00";
        return;
    }
}

let holdBTN;
let stopPressed = true;
function stopPress(){
    var e = document.getElementById('stopBTN');
    var article = document.getElementById('trackArticle');

    if(stopPressed){
        maxDur = TracksDurs[currentTrack];
        let dm = document.getElementById('maxDur');
        var minutes = Math.floor(maxDur/60);
        var seconds = Math.floor(maxDur-(minutes*60));
        if(seconds<10)seconds="0"+seconds;
        dm.innerHTML = minutes+":"+seconds;
        
        article.innerHTML = TracksNames[currentTrack];
        Tracks[currentTrack].play();
        Tracks[currentTrack].volume=audioVolume;

        chngImg(currentTrack);
        console.log("Current track is :["+currentTrack+"]");
        
        alignCrntTime();
        holdBTN = window.setInterval(function(){
            alignCrntTime();
        }
        ,1000);
        
        e.src= "pauseIcon.svg";
        stopPressed=false;
    }else{
        Tracks[currentTrack].pause();
        e.src= "playIcon.svg";
        stopPressed=true;
    }
}
        
let holdenBTN=true;
document.getElementById('slideBTN').onpointerdown = function(){
    console.log("BTN_HOLDEN");
    clearInterval(holdBTN);
    holdenBTN=true
    holdBTN=window.setInterval(function(){slideBTNMov(mX-10,true,true);},0);
};

let holdenBTNvL=true;
document.getElementById('slideLBTN').onpointerdown = function(){
    console.log("BTN_HOLDEN");
    clearInterval(holdBTN);
    holdenBTNvL=true
    holdBTN=window.setInterval(function(){slideVertLBTNMov(mY-10,true,true);},0);
};

let holdenBTNvR=true;
document.getElementById('slideRBTN').onpointerdown = function(){
    console.log("BTN_HOLDEN");
    clearInterval(holdBTN);
    holdenBTNvR=true
    holdBTN=window.setInterval(function(){slideVertRBTNMov(mY-10,true,true);},0);
};

document.body.onkeyup = function(e){
    if(isInViewport(document.getElementById('musicPlayer'))){
        if(e.keyCode == 32){
            stopPress();
        }else
        if(e.keyCode == 39){
            chngTrack(0,'next');
        }else
        if(e.keyCode == 37){
            chngTrack(0,'prev');
        }else
        if(e.keyCode == 38){
            if(audioVolume<=0.95){
                audioVolume+=0.05;
                console.log(Math.floor(audioVolume)+" ratio AVol")
                slideVertRBTNMov(audioVolume,false,true,true);
            }else{
                audioVolume=1;
                console.log(Math.floor(audioVolume)+" ratio AVol")
                slideVertRBTNMov(audioVolume,false,true,true);
            }
        }else
        if(e.keyCode == 40){
            if(audioVolume>=0.05){
                audioVolume-=0.05;
                console.log(Math.floor(audioVolume)+" ratio AVol")
                slideVertRBTNMov(audioVolume,false,true,true);
            }else{
                audioVolume=0;
                console.log(Math.floor(audioVolume)+" ratio AVol")
                slideVertRBTNMov(audioVolume,false,true,true);
            }
        }
    }
}

document.addEventListener("mouseup", function(){
    console.log("UNHOLDEN");
    if(holdenBTN||holdenBTNvL||holdenBTNvR){
        clearInterval(holdBTN);
        holdenBTN=false;
        
        alignCrntTime();
        holdBTN = window.setInterval(function(){
            // if(holdenBTNvR)Tracks[currentTrack].volume=audioVolume;
            if(!holdenBTN){
                alignCrntTime();
                // console.log("HERE!!"+holdenBTN);
            }
        }
        ,1000);

    }
});

function chngTrack(index,direction=null){
    Tracks[currentTrack].load();

    if(direction=='next'&&currentTrack<Tracks.length-1){
        currentTrack++;console.log('NEXT');
    }else if(direction=='prev'&&currentTrack>0){
        currentTrack--;console.log('PREV');
    }else if(direction=null){
        currentTrack=index;
    }
    
    stopPressed=true;
    stopPress();
};

function chngImg(index=0){
    var e = document.getElementById("musicPlayerImgMain");
    var h = document.getElementById("musicPlayerImgHolo");
    
    h.style.backgroundImage="url("+TracksIcons[currentTrack]+")";
    e.style.animation="imgChangeAnim .6s 1 forwards";

    setTimeout(function(){
        e.style.animation="none";
        e.src=TracksIcons[currentTrack];
    },600);
}

function scaleMusicPlayer(){
    var e = document.getElementById('videoBg');
    var m = document.getElementById('musicPlayer');
    console.log("X"+window.screen.availWidth+"|Y"+window.screen.availHeight);
    console.log("vbgX"+m.clientWidth/e.clientWidth
              + "|vbgY"+m.clientHeight/e.clientHeight);
    // e.style.transform = "scalex("+(m.clientWidth/16)+") scaley("+(m.clientHeight/9)+")";
    e.style.transform = "scalex("+(Math.ceil(m.clientWidth)/e.clientWidth)+
                      ") scaley("+(Math.ceil(m.clientHeight)/e.clientHeight)+")";
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function start(){
    chngImg(0);
    collectDurs();
    scaleMusicPlayer();
}

window.addEventListener("keydown", function(e) {
    if(([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)&&
       isInViewport(document.getElementById('musicPlayer')))
        e.preventDefault();
}, false);

window.onresize = function (event) {
    scaleMusicPlayer();
}

window.onload = start;
