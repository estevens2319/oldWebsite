
let character = "jr";
let facingRight = true;
let speed = 2;
let charImg = document.getElementById(character);
let characterList = ["jr", "mario"];
function chooseCharacter(charName) {
    character = charName;
    charImg = document.getElementById(character);
}

function getPosition(charToGet) {
    charToGet = document.getElementById(charToGet);
    return [charToGet.offsetLeft, charToGet.offsetTop];
}

function characterSwitch() {
    currPosition = getPosition(character);
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i] !== character) {
            let nextChar = getPosition(characterList[i]);
            if ((Math.abs(currPosition[0] - nextChar[0]) < charImg.clientHeight) && (Math.abs(currPosition[1] - nextChar[1]) < (charImg.clientWidth))) {
                console.log((Math.abs(currPosition[0] - nextChar[0]) + " " + charImg.clientHeight));
                console.log(Math.abs(currPosition[1] - nextChar[1]) + " " + (charImg.clientWidth));
                chooseCharacter(characterList[i]);
                return;
            }
        }
    }
}

function leftArrowPressed(charImg) {
    facingRight = false;
    charImg.src = "./images/" + character + "left.png";
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
    charImg.src = "./images/" + character + "right.png";
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

function goHome() {
    window.location.href = "./index.html";
}
function fire(charImg) {
    characterSwitch();
    let fireball = document.getElementById("fireball");
    let currPos = getPosition(character);
    let ifRight = 0;
    fireball.src = "./images/fireball.png";
    if (facingRight) {
        ifRight = charImg.clientWidth + fireball.clientWidth;
    }
    fireball.style.top = (currPos[1] + (charImg.clientHeight / 2) - (fireball.clientHeight / 2)) + 'px';
    fireball.style.left = (currPos[0] - fireball.clientWidth + ifRight) + 'px';

    currPosition = getPosition(character);
    let guitarLink = getPosition("home");
    let nav = false;
    if ((Math.abs(currPosition[0] - guitarLink[0]) < charImg.clientHeight) && (Math.abs(currPosition[1] - guitarLink[1]) < (charImg.clientWidth))) {
        nav = true;
    }
    setTimeout(function () {
        document.getElementById("fireball").src = "";
        if (nav) {
            goHome();
        }
    }, 500);
}

function docReady() {
    window.addEventListener('keydown', checkX);

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
    charImg = document.getElementById(character);
    function checkX(key) {
        if (key.keyCode === 88) {
            fire(charImg);
        }
    }
    KeyboardController({
        37: function () { leftArrowPressed(charImg); },
        38: function () { upArrowPressed(charImg); },
        39: function () { rightArrowPressed(charImg); },
        40: function () { downArrowPressed(charImg); }
    }, 1);
}