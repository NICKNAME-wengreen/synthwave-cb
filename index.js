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
              new Audio('music/TurboKiller.mp3')
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
                   "Turbo Killer"
                  ];

let TracksIcons = ["cp-ep2.jpg",
                   "cp-ep1.jpg",
                   "cp-ep3.jpg",
                   "cp-lt.jpg",
                   "cp-ep2.jpg",
                   "cp-ep2.jpg",
                   "cp-ep3.jpg"
                  ];
                  
let currentTrack=0;
        
function getPosition(element){
    var rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    };
}      

let mX;
(function() {
    document.onmousemove = handleMouseMove;

    function handleMouseMove(event) {
        event = event || window.event;
        mX=event.clientX;
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
    }else{console.log("NoWORK")}
}

function clickSlideBTN(){
    var e = document.getElementById('slideBTN');
    clkSlideBTN=true;
    setTimeout(slideBTNMov(mX,true),0);
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
    holdBTN=window.setInterval(function(){slideBTNMov(mX-10,true,false);},0);
};
    
document.addEventListener("mouseup", function(){
    console.log("UNHOLDEN");
    if(holdenBTN){
        clearInterval(holdBTN);
        holdenBTN=false;
        
        alignCrntTime();
        holdBTN = window.setInterval(function(){
            if(!holdenBTN){
                alignCrntTime();
                console.log("HERE!!"+holdenBTN);
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
    
    h.style.backgroundImage="url("+TracksIcons[index]+")";
   
    // e.style.opacity="0%";
    e.style.animation="imgChangeAnim .6s 1 forwards";

    setTimeout(function(){
    e.src=TracksIcons[index];
                        e.style.animation="none";
                        e.src=TracksIcons[index];

                        },600);
    
    
    
}

function start(){
    chngImg(0);
    collectDurs();
    var e = document.getElementById('videoBg');
    var m = document.getElementById('musicPlayer');
    console.log("X"+m.clientWidth+"|Y"+m.clientHeight);
    e.style.transform = "translatex(-40px) translatey(-199px) scalex("+m.clientWidth+") scaley("+m.clientHeight+")";
}
window.onload = start;
