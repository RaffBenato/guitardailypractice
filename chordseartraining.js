const Ael = document.querySelector(`#A`);
const Bel = document.querySelector(`#B`);
const Cel = document.querySelector(`#C`);
const Del = document.querySelector(`#D`);
const Eel = document.querySelector(`#E`);
const Fel = document.querySelector(`#F`);
const Gel = document.querySelector(`#G`);
const chordsEl = [Ael, Bel, Cel, Del, Eel, Fel, Gel];

const btnA = document.querySelector(`.btnChordA`);
const btnB = document.querySelector(`.btnChordB`);
const btnC = document.querySelector(`.btnChordC`);
const btnD = document.querySelector(`.btnChordD`);
const btnE = document.querySelector(`.btnChordE`);
const btnF = document.querySelector(`.btnChordF`);
const btnG = document.querySelector(`.btnChordG`);
const btnsChords = [btnA, btnB, btnC, btnD, btnE, btnF, btnG];

const mainEl = document.querySelector(`.main`);
const mainGameEl = document.querySelector(`.mainGame`);
const btnPlayEl = document.querySelector(`.buttonPlayChord`);
const btnStartEl = document.querySelector(`.btnPlay`);

let chordsAudio = [];
let isPlaying = true;
let waitingAnswer = false;
let answer;
let currentAudio = new Audio();

function checkCheckedChords() {
  chordsAudio = [];

  for (let i = 0; i < chordsEl.length; i++) {
    if (chordsEl[i].checked) {
      btnsChords[i].classList.remove(`hidden`);
      chordsAudio.push(btnsChords[i].textContent);
    } else {
      btnsChords[i].classList.add(`hidden`);
    }
  }
}

function startGame() {
  isPlaying = true;
  waitingAnswer = false;
  answer = ``;

  btnPlayEl.textContent = `Play Chord`;
  checkCheckedChords();
  btnsChords.forEach((btn) => {
    btn.style.backgroundColor = `#c51010`;
  });
}

btnPlayEl.addEventListener(`click`, function () {
  if (!waitingAnswer) {
    if (chordsAudio.length > 0 && isPlaying) {
      const randomAudio = Math.floor(Math.random() * chordsAudio.length);
      const chordAudio = new Audio(`./Audio/${chordsAudio[randomAudio]}.mp3`);
      currentAudio = chordAudio;
      answer = chordsAudio[randomAudio];
      chordAudio.play();
      console.log(chordsAudio[randomAudio]);

      isPlaying = false;
      waitingAnswer = true;
      btnPlayEl.textContent = `Repeat`;
    }
  } else {
    currentAudio.play();
  }
});

btnStartEl.addEventListener(`click`, function () {
  mainEl.classList.add(`hidden`);
  mainGameEl.classList.remove(`hidden`);
});

chordsEl.forEach((chord) => {
  chord.addEventListener(`change`, function () {
    if (isPlaying) {
      checkCheckedChords();
    }
  });
});

btnsChords.forEach((btn) => {
  btn.addEventListener(`click`, function () {
    if (waitingAnswer) {
      btn.style.backgroundColor = `gray`;
      waitingAnswer = false;

      setTimeout(() => {
        btnsChords.forEach((btn) => {
          if (btn.classList.contains(`btnChord` + answer)) {
            btn.style.backgroundColor = `#05ad10`;
            setTimeout(() => {
              startGame();
            }, 1500);
          }
        });
      }, 1500);
    }
  });
});

checkCheckedChords();
