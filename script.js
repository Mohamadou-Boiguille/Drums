const repertoire = [
  (chanson1 = {
    name: "Pulp Fiction OST- Mirsilou",
    drums: {
      bpm: 167,
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ride: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      crash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  }),
  (chanson2 = {
    name: "Yellow - Cold Play",
    drums: {
      bpm: 90,
      kick: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      ride: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      crash: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  }),
  (chanson3 = {
    name: "Yellow - Cold Play",
    drums: {
      bpm: 60,
      kick: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      hats: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      ride: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      crash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  }),
];

// audio files
const audioElement = document.querySelectorAll(`audio`);

const linksAudio = {
  hats:
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Osama%20Qureshi%20DrumKit/457[kb]OQD-hat-1.wav.mp3",
  kick:
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/25[kb]real-life-KICK.WAV.mp3",
  snare:
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/57[kb]real-life-SN2.WAV.mp3",
  ride:
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/206[kb]real-life-RIDE.WAV.mp3",
  crash:
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/180[kb]real-life-CRASH2.WAV.mp3",
};

let pads = document.querySelectorAll(`[class^="pad"]`);

(function preload() {
  for (link in linksAudio) {
    audio = document.createElement("AUDIO");
    audio.setAttribute("id", link);
    audio.setAttribute("src", linksAudio[link]);
    audio.setAttribute("type", "audio/mp3");
    audio.preload = "auto";
    document.body.appendChild(audio);
  }
})();


const light = document.querySelectorAll("#boutons1 button");
const play = document.querySelector("#playButton");
const led = document.querySelectorAll(".circle");

/* ride.volume = 0.3;
crash.volume = 0.5; */

let idInterval;
let index = 0;

let choix = () => {
  let radio = document.querySelectorAll("[name='chanson']");
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      return repertoire[i].drums;
    }
  }
};

function initialisation() {
  play.innerHTML = "Stop";
  play.removeEventListener("click", initialisation);
  play.addEventListener("click", stopPlaying);
  song = choix();
  startPlaying(song);
  index = 0;
}

function startPlaying(song) {
  idInterval = setInterval(async () => {
    light.forEach((element) => element.classList.remove("lightOn"));
    led.forEach((element) => element.classList.remove("circleOn"));

    function playItem(item) {
      document.querySelector(`#${item}`).currentTime = 0;
      document.querySelector(`#${item}`).play();
      document.querySelector(`#${item}Btn`).classList.add("lightOn");
    }

    for (const isPlayed in song) {
      if (song[isPlayed][index]) {
        playItem(isPlayed);
        pads.forEach((element) => element.classList.add("padOff"));
      }
    }

    index++;

    led[index].classList.add("circleOn");
    let colStep = document.querySelectorAll(
      `.col${index} div[class^="pad"]`
    );
    if (index === 16) {
      index = 0;
    }
    colStep.forEach((element) => element.classList.remove("padOff"));
  }, 60000 / song.bpm / 4);
}

function stopPlaying() {
  clearInterval(idInterval);
  play.innerHTML = "Play";
  play.removeEventListener("click", stopPlaying);
  play.addEventListener("click", initialisation);
}

// imported and modified code to the 'playground' functionality

const playSound = (e) => {
  const keyCode = e.keyCode;
  const audioElement = document.querySelector(`[data-key="${keyCode}"]`);
  if (!audioElement) {
    return;
  }
  console.log(keyCode);
  audioElement.currentTime = 0;
  audioElement.play();
};

window.addEventListener("keydown", playSound);
play.addEventListener("click", initialisation);
