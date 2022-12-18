function scaleMusicPlayer2(){
    var e = document.getElementById('videoBg');
    var mp = document.getElementById('musicPlayer');

    var la = document.getElementById('loadScreen');
    var lb = document.getElementById('loadScreenCtx');

    console.log("|X: "+1920/window.screen.availWidth+"|Y: "+1080/window.screen.availHeight);

    e.style.width = mp.clientWidth + "px";
    e.style.height = mp.clientHeight + "px";

    la.style.width = mp.clientWidth + "px";
    lb.style.width = mp.clientWidth + "px";

    console.log(mp.clientWidth + " musicPlayer width;")

    la.style.height = mp.clientHeight + "px";
    lb.style.height = mp.clientHeight + "px";

    console.log(mp.clientHeight + " musicPlayer height;")
}

function start2(){
    console.log("First");
    scaleMusicPlayer2();
    var script = document.createElement('script');
    script.src = "index.js";
    script.async = true;
    document.head.appendChild(script);
    script.onload = function(){
        start();
    }
}

window.onresize = function (event) {
    scaleMusicPlayer2();
}

window.onload = start2;
