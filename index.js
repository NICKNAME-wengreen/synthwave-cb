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

let Tracks = [];

function createAudios(){
    Tracks = [new Audio('music/DiscoZombiItalia.mp3'),
              new Audio('music/LePerv.mp3'),
              new Audio('music/LookingForTracyTzu.mp3'),
              new Audio('music/MondayHunt.mp3'),
              new Audio('music/DivisionRuine.mp3'),
              new Audio('music/RollerMobster.mp3'),
              new Audio('music/TurboKiller.mp3'),
              new Audio('music/YoureMine.mp3'),
              new Audio('music/EndTitles.mp3')
             ];
}

let TracksDurs=[];

function collectDurs(){
    for(var i=0;i<Tracks.length;i++){
        TracksDurs[i]=Tracks[i].duration;
        console.log(TracksNames[i]+" -- "+TracksDurs[i]);
    }
    audioLoaded = true;
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
let effectIntensity=1;

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
let slidePercent=0;
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

    slidePercent = pos/max;
    if(slidePercent==NaN)slidePercent=0;

    console.log(" [SlidePercent = " + slidePercent + " ] ");

    e.style.transform='translatex('+pos+'px)';

    if(clkSlideBTN){  
        Tracks[currentTrack].currentTime=maxDur*(pos/max);
        clkSlideBTN=false;
    }
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
        Tracks[currentTrack].volume=audioVolume;
        clkSlideVertRBTN=false;
    }
}

let clkSlideVertLBTN=false;
let maxvertL;
// effectIntensity
function slideVertLBTNMov(y,align=false,trackMov=true,ratio=false){
    var s = document.getElementById('slideVertLLine');
    var e = document.getElementById('slideLBTN');
    var pos;

    maxvertL = s.clientHeight-e.clientHeight;

    if(align){
        var lineY = getPosition(s).y;
        pos = y - lineY;
    }else if(ratio){
        pos = (1-y) * maxvertL;
    }else{
        pos = y;
    }

    if(pos>maxvertL)pos=maxvertL;
    if(pos<0)pos=0;

    if(trackMov)
    e.style.transform='translatey('+pos+'px)';

    console.log((pos/maxvertL)*100+"%");

    effectIntensity=1-(pos/maxvertL);
    // Tracks[currentTrack].volume=effectIntensity;

    if(clkSlideVertLBTN){
        clkSlideVertLBTN=false;
    }
}

function clickSlideBTN(){
    clkSlideBTN=true;
    setTimeout(slideBTNMov(mX,true),0);
}
function clickSlideVertLBTN(){
    clkSlideVertLBTN=true;
    setTimeout(slideVertLBTNMov(mY,true),0);
}
function clickSlideVertRBTN(){
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

    if(crntDur==maxDur){
        stopPressed=false;
        stopPress();
        slideBTNMov(0);
        dc.innerHTML = "0:00";
        return;
    }
}

let notStopBTN=false;
let holdBTN;
let stopPressed = true;
let stopPressedAnim;
function stopPress(){
    var e = document.getElementById('stopBTN');
    var article = document.getElementById('trackArticle');

    if(!notStopBTN){
        e.style.animation = "none";
        e.style.animation = "MinoraPlayerStopButton .6s 1 forwards";

        // clearTimeout(stopPressedAnim);
        stopPressedAnim = setTimeout(function(){
                            e.style.animation="none";
                            },600);
    }else notStopBTN = false;

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
        
        e.src = "pauseIcon.svg";
        stopPressed=false;
    }else{
        Tracks[currentTrack].pause();
        e.src = "playIcon.svg";
        stopPressed=true;
    }
}
        
let MusicPlayerDataLoaded = false;

let holdenBTN=true;
let holdenBTNvL=true;
let holdenBTNvR=true;

function startEvents(){
    document.getElementById('slideBTN').onpointerdown = function(){
        console.log("BTN_HOLDEN");
        clearInterval(holdBTN);
        holdenBTN=true
        holdBTN=window.setInterval(function(){slideBTNMov(mX-10,true,true);},0);
    };

    document.getElementById('slideLBTN').onpointerdown = function(){
        console.log("BTN_HOLDEN");
        clearInterval(holdBTN);
        holdenBTNvL=true;
        holdBTN=window.setInterval(function(){slideVertLBTNMov(mY-10,true,true);},0);
    };

    document.getElementById('slideRBTN').onpointerdown = function(){
        console.log("BTN_HOLDEN");
        clearInterval(holdBTN);
        holdenBTNvR=true
        holdBTN=window.setInterval(function(){slideVertRBTNMov(mY-10,true,true);},0);
    };

    var watermark = document.getElementById('watermark')
    watermark.onpointerdown = function(){
        watermark.style.animation="DisapearLoader 1.6s 1 forwards";

        setTimeout(function(){
            watermark.style.animation="none";
            watermark.remove();
        },1600);
    }

    document.body.onkeyup = function(e){
        var ctx = document.getElementById('ctxMenu');
        if(e.keyCode == 27 && isInViewport(ctx) && ctxMenuBtnPressed){
            console.log("PRESSED TEST");
            ctxMenuBtnPressed = true;
            ctxMenuBtnPress();
        }else
        if(isInViewport(document.getElementById('musicPlayer'))&&MusicPlayerDataLoaded){
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
                if(!holdenBTN){
                    alignCrntTime();
                }
            }
            ,1000);

        }
    });

    window.addEventListener("keydown", function(e) {
        if(([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)&&
        isInViewport(document.getElementById('musicPlayer')))
            e.preventDefault();
    }, false);
}

let nextBTNPressedAnim;
let prevBTNPressedAnim;
function chngTrack(index,direction=null){
    notStopBTN = true;

    Tracks[currentTrack].load();

    if(direction=='next'){
        if(currentTrack<Tracks.length-1){
            currentTrack++;console.log('NEXT');
        }

        var e = document.getElementById('nextBTN');

        e.style.animation = "none";
        e.style.animation = "MinoraPlayerNextButton .4s 1 forwards";

        clearTimeout(nextBTNPressedAnim);
        nextBTNPressedAnim = setTimeout(function(){
                            e.style.animation="none";
                            },400);
    }else if(direction=='prev'){
        if(currentTrack>0){
            currentTrack--;console.log('PREV');
        }

        var e = document.getElementById('prevBTN');

        e.style.animation = "none";
        e.style.animation = "MinoraPlayerPrevButton .4s 1 forwards";

        clearTimeout(prevBTNPressedAnim);
        prevBTNPressedAnim = setTimeout(function(){
                            e.style.animation="none";
                            },400);
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

function start(){
    console.log("Second");

    window.onresize = function (event) {
        console.log("Resizing!!!");
        ctxResize();
        slideBTNMov(slidePercent,false,true,true);
        slideVertRBTNMov(audioVolume,false,true,true);
        slideVertLBTNMov(effectIntensity,false,true,true);
        scaleMusicPlayer();
    }

    createAudios();
    startEvents();
    checkLoad();
    chngImg(0);
    scaleMusicPlayer();


}

let imagesLoaded=false;
function checkImagesLoad(){
    let imageLoads = ["carpBrutTrilogy.jpg",
                      "cp-ep1.jpg",
                      "cp-ep2.jpg",
                      "cp-ep3.jpg",
                      "cp-lt.jpg",
                      "furi.jpg",
                      "hlm2-s1.jpg",
                      "hlm2-s2.jpg",
                      "hlm2-s3.jpg",
                      "hlm2bg.jpg",
                      "hlmbg.jpg"
                     ];

    imageLoads.forEach(e => {
        var img = new Image();
        img.src = e;
    });

    console.log("ImageCount "+imageLoads.length);
    console.log("Images is loaded!");

    imagesLoaded = true;
}

let videoLoaded=false;
let videoCheckInterval;
function checkVideoLoad(){
    var videoBgObj = document.getElementById('videoBg');
    videoCheckInterval = setInterval(function(){
        if(videoBgObj.readyState >= 2){
            console.log("Video is loaded!");
            videoLoaded = true;
            clearInterval(videoCheckInterval);
        }
    },0);
}

let audioLoaded = false;
let audioCheckInterval;
function checkAudioLoad(){
    var i = 0;
    var tempIndxArray;
        audioCheckInterval = setInterval(function(){
            var sumStts=0;
            Tracks.forEach(e => {
                console.log(" < " + (i%Tracks.length+1) + " | " + TracksNames[i%Tracks.length] + " > = " + e.readyState);
                i++;sumStts+=e.readyState;
            })

            if(sumStts>=(Tracks.length*4)){
                clearInterval(audioCheckInterval);
                console.log("All Audio Loaded!");
                collectDurs();
            }
        },0);
}

let loadChecker;
function checkLoad(){
    checkImagesLoad();
    checkAudioLoad();
    checkVideoLoad();

    loadChecker = setInterval(function(){
        if(imagesLoaded && audioLoaded && videoLoaded){
            MusicPlayerDataLoaded = true;
            console.log("All MetaData is loaded!");
            clearInterval(loadChecker);

            var la = document.getElementById('loadScreen');
            var lb = document.getElementById('loadScreenCtx');

            la.style.animation="DisapearLoader 1.6s 1 forwards";
            lb.style.animation="DisapearLoader 1.6s 1 forwards";

            setTimeout(function(){
                la.style.animation="none";
                lb.style.animation="none";
                la.remove();
                lb.remove();
                loadScreenDeleted = true;
            },1600);
        }
    },0);
}
