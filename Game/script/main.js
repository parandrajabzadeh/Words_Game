let game = new Game([
 
    {
        title:"پرنده ای است که حتی اگر وارونه اش هم کنید باز پرنده است",
        ans:"زاغ",
        time: 30,
        score: 50

    },
    {
        title:" کدام  کشور است که منبع ویتامین ث می شد؟",
        ans:"پرتغال",
        time: 30,
        score: 50
    },
    {
        title:"اون چیه که سفیده، برف نیست، ریشه داره، درخت نیست؟",
        ans:"دندان",
        time: 30,
        score: 50
    },
    {
        title:"آن چه کشوری است که در چشم ماست",
        ans:"کره",
        time: 30,
        score: 50

    },
    {
        title:"منظور از خروس بیوه چیست؟",
        ans:"خرس",
        time: 30,
        score: 50
    }
    
]);

// window.onload = ()=>{
//     let a = new Audio('script/back.mp3');
//     a.play();
// }

let keyBoardWrapper = document.querySelector('#keyboard');
let laters = ["ا", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د",

    "ذ", "ر", "ز", "ژ", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ",

    "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی"];

let typed = [];

let inputValue = document.getElementById('inpvval');

function checkAns(n = true) {
    let ans = typed.join('');
    if (ans == q.ans) {
        let a = new Audio('script/Victory-Sound-Effect.mp3');
        a.play();
        score += q.score;
        scoreDom.innerHTML = score;
        typed = [];
        updateForm();
        clearInterval(interval)
        if (n) {
            return nextQuestionGenerator();
        }
        return
    }
    let a = new Audio('script/Red-Cross-Buzzer-Sound.mp3');
    a.play();
    if (inputValue.innerHTML != '') {
        inputValue.style.color = 'red';
        inputValue.classList.add('shake');
        setTimeout(() => {
            inputValue.style.color = '#000000';
            inputValue.classList.remove('shake');
        }, 1000);
    }

}

function onEnter() {
    checkAns();
}

function addLetter(w) {
    w = w.target;
    if (w.innerHTML.includes('Delete')) {
        typed.pop();
    } else if (w.innerHTML.includes('Enter')) {
        onEnter();
    } else if (w.innerHTML != ' ') {
        typed.push(w.innerHTML.trim());
    } else {
        typed.push(' ');
    }
    updateForm();
}

function updateForm() {
    if (typed.length != 0) {
        inputValue.classList.remove('OnPlaceholder');
        inputValue.innerHTML = typed.join('');
    } else {
        inputValue.innerHTML = 'متن را وارد کنید';
        inputValue.classList.add('OnPlaceholder');
    }
}

laters.forEach(w => {
    keyBoardWrapper.innerHTML += `<button class="letter"> ${w} </button>`;
});


keyBoardWrapper.innerHTML += `
<div class="footerwraper">
<button class="letter enter">Enter</button>
<button class="letter space"> </button>
<button class="letter">Delete</button>
</div>

`;

document.querySelectorAll('.letter').forEach(e => e.addEventListener('click', addLetter));

let questionDom = document.getElementById('q');
let cq = game.c;
let questionTimeDom = document.getElementById('question-time');
let questionNumberDom = document.getElementById('question-number');
let timerWrapper = document.getElementById('timer-wrapper');
window.score = 0;
window.scoreDom = document.getElementById('score');

function endGame() {
    checkAns(false);
    typed = [];
    updateForm();
    nextQuestionGenerator();
}

function nextQuestionGenerator() {
    if (game.c == game.qs.length - 1) {
        console.log('agfe');
        document.getElementById('end').innerHTML += `<div class="endGame">
    <div>
        بازی تمام شد
    </div>
</div>`;
        return
    }
    timerWrapper.innerHTML = "";
    window.q = game.getNext();
    questionDom.innerHTML = q.title;
    let count = game.c;
    count++;

    questionNumberDom.innerHTML = count;
    questionTimeDom.innerHTML = q.time;
    let time = q.time;
    window.interval = setInterval(() => {
        time--;
        questionTimeDom.innerHTML = time;
        if (time == 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
    timerWrapper.innerHTML = `<div class="time" id="time">
            </div>`;
    let timer = document.getElementById('time');
    timer.style.width = '0%';
    timer.style.transition = `width ${q.time}s cubic-bezier(0.19, 0.15, 0.37, 0.45)`;
    setTimeout(() => {
        timer.style.width = '100%';
    }, 100);
}

nextQuestionGenerator();

