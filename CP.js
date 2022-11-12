let character = "jr";
let facingRight = true;
let speed = 2;
let charImg = document.getElementById(character);
let characterList = ["jr", "mario"];
let tubes = ["tube1", "tube2"];
function chooseCharacter(charName) {
    character = charName;
    charImg = document.getElementById(character);
    setTheme(charName);
}

function getPosition(charToGet) {
    charToGet = document.getElementById(charToGet);
    return [charToGet.offsetLeft, charToGet.offsetTop];
}

function setTheme(charName) {
    switch (charName) {
        case "mario":
            marioTheme();
            break;
        case "jr":
            jrTheme();
            break;
        default:
            break;
    }
    setTimeout(function () {
        document.getElementById("guitars").style.top = (document.getElementById("tube1").offsetTop + document.getElementById("tube1").clientHeight) + 'px';
        document.getElementById("guitars").style.left = (document.getElementById("tube1").offsetLeft + (document.getElementById("tube1").clientWidth / 2) - (document.getElementById("guitars").clientWidth / 2)) + 'px';
        document.getElementById("home").style.top = (document.getElementById("tube2").offsetTop + document.getElementById("tube2").clientHeight) + 'px';
        document.getElementById("home").style.left = (document.getElementById("tube2").offsetLeft + (document.getElementById("tube2").clientWidth / 2) - (document.getElementById("home").clientWidth / 2)) + 'px';
    }, 5);
}
function jrTheme() {
    document.getElementById("guitars").src = "./images/jrguitars.png";
    document.getElementById("home").src = "./images/jrhome.png";
    document.getElementById("name").src = ("./images/jrCPname.png");
    document.getElementById("tube1").src = ("./images/warpgate.png");
    document.getElementById("tube2").src = ("./images/warpgate.png");
    document.getElementById("background").style = "background-color:rgb(0, 0, 0);"
    document.getElementById("instructions").style = "color: rgb(110, 110, 231);;"
}
function marioTheme() {
    document.getElementById("guitars").src = "./images/marioguitars.png";
    document.getElementById("home").src = "./images/mariohome.png";
    document.getElementById("tube1").src = ("./images/tube.png");
    document.getElementById("tube2").src = ("./images/tube.png");
    document.getElementById("background").style = "background-color:rgb(65, 117, 230);"
    document.getElementById("instructions").style = "color: rgba(66,176,50,255);"
    document.getElementById("name").src = ("./images/marioCPname.png");

}
function characterSwitch() {
    currPosition = getPosition(character);
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i] !== character) {
            let nextChar = getPosition(characterList[i]);
            if ((Math.abs(currPosition[0] - nextChar[0]) < charImg.clientHeight) && (Math.abs(currPosition[1] - nextChar[1]) < (charImg.clientWidth))) {
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

function goTo(path) {
    switch (path) {
        case "tube1":
            sessionStorage.setItem("theme", character);
            window.location.href = "./guitars.html";
            break;
        case "tube2":
            sessionStorage.setItem("theme", character);
            window.location.href = "./index.html";
            break;
        default:
            break;
    }
}

function tubeSwitch() {
    currPosition = getPosition(character);
    for (let i = 0; i < tubes.length; i++) {
        if (tubes[i] !== character) {
            let nextChar = getPosition(tubes[i]);
            if ((Math.abs(currPosition[0] - nextChar[0]) < charImg.clientHeight) && (Math.abs(currPosition[1] - nextChar[1]) < (charImg.clientWidth))) {
                return [true, tubes[i]];
            }
        }
    }
    return [false, ""];
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
    let navPath = tubeSwitch();

    setTimeout(function () {
        document.getElementById("fireball").src = "";
        if (navPath[0]) {
            goTo(navPath[1]);
        }
    }, 500);

}

function docReady() {
    renderPage();
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

function renderPage() {
    document.getElementById("guitars").src = "./images/jrguitars.png"
    document.getElementById("guitars").style.top = (document.getElementById("tube1").offsetTop + document.getElementById("tube1").clientHeight) + 'px';
    document.getElementById("guitars").style.left = (document.getElementById("tube1").offsetLeft + (document.getElementById("tube1").clientWidth / 2) - (document.getElementById("guitars").clientWidth / 2)) + 'px';

    document.getElementById("home").src = "./images/jrhome.png"
    document.getElementById("home").style.top = (document.getElementById("tube2").offsetTop + document.getElementById("tube2").clientHeight) + 'px';
    document.getElementById("home").style.left = (document.getElementById("tube2").offsetLeft + (document.getElementById("tube2").clientWidth / 2) - (document.getElementById("home").clientWidth / 2)) + 'px';
    let prevTheme = sessionStorage.getItem("theme");
    if (prevTheme !== null) {
        chooseCharacter(prevTheme);
    }
}