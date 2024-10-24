// CHARACTERS VARIABLES

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", 
    "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const allCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
    "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", 
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", 
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", 
    "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

// DOM VARIABLES

let firstPasswordEl = document.getElementById("firstPassword")
let secondPasswordEl = document.getElementById("secondPassword")
let lengthInputEl = document.getElementById("length-input")
let charsetToggleBtnEl = document.getElementById("charsetToggleBtn")
let modeSwitchBtnEl = document.getElementById("modeSwitchBtn")
let modeSliderEl = document.querySelector(".mode-slider")

// GENERATE PASSWORD

function generatePassword() {
    firstPasswordEl.textContent = []
    secondPasswordEl.textContent = []
    checkInput()
}

// CREATING FIRST PASSWORD

function createFirstPass() {
    if (charsetToggleBtnEl.checked === true) {
        for (let i = 0; i < lengthInputEl.value; i++) {
            firstPasswordEl.textContent += allCharacters[Math.floor(Math.random() * allCharacters.length)]
        }
    } else {
        for (let i = 0; i < lengthInputEl.value; i++) {
            firstPasswordEl.textContent += characters[Math.floor(Math.random() * characters.length)]
        }
    }
}

// CREATING SECOND PASSWORD

function createSecondPass() {
    if (charsetToggleBtnEl.checked === true) {
        for (let i = 0; i < lengthInputEl.value; i++) {
            secondPasswordEl.textContent += allCharacters[Math.floor(Math.random() * allCharacters.length)]
        }
    } else {
        for (let i = 0; i < lengthInputEl.value; i++) {
            secondPasswordEl.textContent += characters[Math.floor(Math.random() * characters.length)]
        }
    }
}

// CHANGING MODE

function changingMode() {

    if (modeSwitchBtnEl.checked) {
        document.querySelector("main").style.backgroundColor = "#ECFDF5"
        document.querySelector("h1").style.color = "#111827"
        document.getElementById("supporting-text").style.color = "#6B7280"
        document.querySelector(".toggle-label").style.color = "#6B7280"
        document.querySelector("hr").style.borderColor = "#D5D4D8"
        modeSliderEl.style.setProperty("--Image",
            "url('https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-moon-icon-png-image_1024711.jpg')")
    } else {
        document.querySelector("main").style.backgroundColor = "#1F2937"
        document.querySelector("h1").style.color = "whitesmoke"
        document.getElementById("supporting-text").style.color = "#D5D4D8"
        document.querySelector(".toggle-label").style.color = "#D5D4D8"
        document.querySelector("hr").style.borderColor = "#2F3E53"
        modeSliderEl.style.setProperty("--Image", 
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy15dic1oL-0Sldem7kCiSUj2mUAuJNQMgdhJk7srULmegyEl5gsSDsVL8u7NDcFRSzGs&usqp=CAU')")
    }

}

// INPUT CHECK (to make sure that input is integer)

function checkInput() {
    
    if (isNaN(lengthInputEl.value) === true) {
        firstPasswordEl.textContent = "Enter a number"
        secondPasswordEl.textContent = "Enter a number"
    } else if (lengthInputEl.value.indexOf(".") === 0 || lengthInputEl.value.indexOf(".") === 1 || lengthInputEl.value.indexOf(".") === 2) {
        firstPasswordEl.textContent = "Enter a whole number"
        secondPasswordEl.textContent = "Enter a whole number"
    } else if (0 < lengthInputEl.value && lengthInputEl.value < 18) {
        createFirstPass()
        createSecondPass()
    } else {
        console.log("skaiciai tarp 0 ir 17")
        firstPasswordEl.style.fontSize = "14px"
        firstPasswordEl.textContent = "Enter a number between 0 and 17"
        secondPasswordEl.textContent = "Enter a whole number"
    }
}

// COPY FIRST PASSWORD TO CLICKBOARD (for NEWER browsers)

firstPasswordEl.addEventListener("click", function () {
    navigator.clipboard.writeText(firstPasswordEl.textContent)
        .then(function () {
            console.log('Text copied to clipboard: ' + firstPasswordEl.textContent);
        })
        .catch(function (error) {
            console.error('Failed to copy text: ', error);
        });
});

// COPY SECOND PASSWORD TO CLICKBOARD (for NEWER browsers)

secondPasswordEl.addEventListener("click", function () {
    navigator.clipboard.writeText(secondPasswordEl.textContent)
        .then(function () {
            console.log('Text copied to clipboard: ' + secondPasswordEl.textContent);
        })
        .catch(function (error) {
            console.error('Failed to copy text: ', error);
        });
});

const links = document.querySelectorAll('.copy-click');

const cls = {
  copied: 'is-copied',
  hover: 'is-hovered' };

// COPY PASSWORD TO CLICKBOARD (for OLDER browsers)

const copyToClipboard = str => {
  const el = document.createElement('input');
  el.value = str.textContent;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.opacity = 0;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

/* 
If we want to use ONLY FOR NEWER BROWSERS, we will need to delete
copyToClipboard() function and delete same function from clickInteraction()
function.
*/

const clickInteraction = e => {
  copyToClipboard(e.target);
  e.target.classList.add(cls.copied);
  setTimeout(() => e.target.classList.remove(cls.copied), 1000);
  setTimeout(() => e.target.classList.remove(cls.hover), 700);
};

Array.from(links).forEach(link => {
  link.addEventListener('click', e => clickInteraction(e));
  link.addEventListener('mouseover', e => e.target.classList.add(cls.hover));
  link.addEventListener('mouseleave', e => {

    e.target.classList.remove(cls.hover);
    
  });
});
