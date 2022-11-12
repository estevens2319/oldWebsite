
let character = "jr";
let facingRight = true;
let speed = 3;
let charImg = document.getElementById(character);
let characterList = ["jr", "mario"];
function chooseCharacter(charName) {
  character = charName;
  charImg = document.getElementById(character);
}

function characterSwitch() {
  for (let i = 0; i < characterList.length; i++) {
    if (characterList[i] !== character) {
      if ((charImg.offsetLeft - document.getElementById(characterList[i]).offsetLeft < 40) && (charImg.offsetTop - document.getElementById(characterList[i]).offsetTop < 40)) {
        chooseCharacter(characterList[i]);
      }
    }
  }
}

function leftArrowPressed(charImg) {
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

function gotoGuitars() {
  window.location.href = "./guitars.html";
}
function fire(charImg) {
  characterSwitch();
  // if ((charImg.offsetLeft - document.getElementById("guitars").offsetLeft < 20) && (charImg.offsetTop - document.getElementById("guitars").offsetTop < 20)) {
  //   gotoGuitars();
  // }
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
  charImg = document.getElementById(character);
  KeyboardController({
    37: function () { leftArrowPressed(charImg); },
    38: function () { upArrowPressed(charImg); },
    39: function () { rightArrowPressed(charImg); },
    40: function () { downArrowPressed(charImg); },
    88: function () { fire(charImg); }
  }, 1);
}