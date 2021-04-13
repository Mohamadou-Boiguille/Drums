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
const linksSamples = {
  kid: new Audio(
    "https://drive.google.com/uc?export=download&id=1GpHz7L0sXwFskJ9LgtjG8u-7Xs7Gkxp8"
  ),
};

const audioLinks = [];

const linksAudio = {
  hats: new Audio(
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Osama%20Qureshi%20DrumKit/457[kb]OQD-hat-1.wav.mp3"
  ),
  kick: new Audio(
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/25[kb]real-life-KICK.WAV.mp3"
  ),
  snare: new Audio(
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/57[kb]real-life-SN2.WAV.mp3"
  ),
  ride: new Audio(
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/206[kb]real-life-RIDE.WAV.mp3"
  ),
  crash: new Audio(
    "https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/REAL%20LIVE%20KITS/Another%20Real%20Life%20Kit/180[kb]real-life-CRASH2.WAV.mp3"
  ),
};

let beat = 0;
let idInterval;
let isPlaying = "no";
let bpm;
let tempoChange = false;
const tempo = document.querySelector("#tempo");
tempo.addEventListener("change", () => {
  tempoChange = true;
});

const drumBtn = document.querySelectorAll("#boutons1 button");
const redLed = document.querySelectorAll(".led");

const preload = () => {
  for (audio in linksAudio) {
    audio.preload = "auto";
  }

  for (sample in linksSamples) {
    sample.preload = "auto";
  }
};
preload();

let radioBtn = document.querySelectorAll("[name='song']");

function chosenSong() {
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      if (!tempoChange) {
        bpm = repertoire[i].drums.bpm;
        tempo.value = bpm;
      } else {
        bpm = tempo.value;
      }
      padScore(repertoire[i]);
      return repertoire[i].drums;
    }
  }
}

const padScore = (drumsToPlay) => {
  document.querySelectorAll(".pad").forEach((element) => {
    element.classList.remove("padToPlay");
  });
  for (const item in drumsToPlay.drums) {
    let array = drumsToPlay.drums[item];
    for (let b = 0; b < array.length; b++) {
      if (array[b] && Array.isArray(array)) {
        document
          .querySelector(`.${item} .p${b + 1}`)
          .classList.add("padToPlay");
      }
    }
  }
};

const lightPads = () => {
  // allume les pads qui se jouent
};

const lightPlayedDrums = () => {
  // allume le type joué
};

const lightLed = () => {
  // allume les leds
};

let startTime;
/* setInterval(()=> {
    endTime = Date.now();
    console.log(endTime - startTime + "ms");
    startTime = Date.now();
  
},100) */
const playSong = () => {
  // preload et 1234
  drumsToPlay = chosenSong();
  idInterval = setTimeout(async () => {
    playSong();

    if (sampling && beat === 0) {
      playSample();
      sampling = false;
    }

    redLed.forEach((element) => element.classList.remove("ledOn"));
    drumBtn.forEach((element) => element.classList.remove("drumOn"));

    for (const drum in drumsToPlay) {
      if (drumsToPlay[drum][beat]) {
        linksAudio[drum].currentTime = 0;
        linksAudio[drum].play();
        document.querySelector(`#${drum}`).classList.add("drumOn");
      }
    }

    redLed[beat].classList.add("ledOn");

    beat++;

    if (beat > 15) {
      beat = 0;
    }
  }, 60000 / bpm / 4);
};

function stopPlaying() {
  clearInterval(idInterval);
  play.innerHTML = "Play";
}

const stopSong = () => {
  clearInterval(idInterval);
  isPlaying = "no";
};

const play = document.querySelector("#playButton");
play.addEventListener("click", () => {
  if (isPlaying === "yes") {
    //stop
    stopSong();
  } else {
    isPlaying = "yes";
    playSong();
  }
});

let playSample = () => {

  linksSamples.kid.playbackRate = 1.1;
  linksSamples.kid.currentTime = 0;
  linksSamples.kid.play();
};

let sampling = false;

window.addEventListener("keydown", (e) => {
  if (e.key == "a") {
    console.log("a OK");
    if (!sampling) {
      console.log("start" + e);
      sampling = true;
    } else {
      console.log("stop" + e);
      sampling = false;
    }
  }
});

//---------------------------------------