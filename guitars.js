
let character = "JR";
let facingRight = true;
let speed = 3;
function chooseCharacter(charNumber) {


}



function leftArrowPressed(charImg) {
    facingRight = false;
    let diff = charImg.offsetLeft;
    if (diff > 0) {
        let move = speed;
        if (diff < speed) {
            move = diff - 1;
        }
        charImg.style.left = parseInt(charImg.style.left) - move + 'px';
    }
}

function rightArrowPressed(charImg) {

    facingRight = true;
    let imwidth = charImg.clientWidth;
    let diff = document.getElementById("rightborder").offsetLeft - charImg.offsetLeft - imwidth;
    if (diff > 0) {
        let move = speed;
        if (diff <= speed) {
            move = diff - 1;
        }
        charImg.style.left = parseInt(charImg.style.left) + move + 'px';
    }
}

function upArrowPressed(charImg) {
    let diff = charImg.offsetTop;
    if (diff > 0) {
        let move = speed;
        if (diff <= speed) {
            move = diff - 1;
        }
        charImg.style.top = parseInt(charImg.style.top) - move + 'px';
    }
}

function downArrowPressed(charImg) {
    let imheight = charImg.clientHeight;
    let diff = document.getElementById("bottomborder").offsetTop - charImg.offsetTop - imheight;
    if (diff > 0) {
        let move = speed;
        if (diff < speed) {
            move = diff;
        }
        charImg.style.top = parseInt(charImg.style.top) + move + 'px';
    }
}

function reset(charImg) {
    charImg.style.top = '100px';
    charImg.style.left = '100px';
}

function gotoGuitars() {
    window.location.href = "./index.html";
}
function fire(charImg) {
    if ((charImg.offsetLeft - document.getElementById("home").offsetLeft < 20) && (charImg.offsetTop - document.getElementById("home").offsetTop < 20)) {
        gotoGuitars();
    }
}

function docReady() {

    function KeyboardController(keys, repeat) {
        var timers = {};
        document.onkeydown = function (event) {
            var key = (event || window.event).keyCode;
            if (!(key in keys))
                return true;
            if (!(key in timers)) {
                timers[key] = null;
                keys[key]();
                if (repeat !== 0)
                    timers[key] = setInterval(keys[key], repeat);
            }
            return false;
        };
        document.onkeyup = function (event) {
            var key = (event || window.event).keyCode;
            if (key in timers) {
                if (timers[key] !== null)
                    clearInterval(timers[key]);
                delete timers[key];
            }
        };
        window.onblur = function () {
            for (key in timers)
                if (timers[key] !== null)
                    clearInterval(timers[key]);
            timers = {};
        };
    };
    let charImg = document.getElementById(character);

    KeyboardController({
        37: function () { leftArrowPressed(charImg); },
        38: function () { upArrowPressed(charImg); },
        39: function () { rightArrowPressed(charImg); },
        40: function () { downArrowPressed(charImg); },
        88: function () { fire(charImg); }
    }, 1);
}