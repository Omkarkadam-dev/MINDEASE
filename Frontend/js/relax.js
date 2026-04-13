const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const progress = document.getElementById("progress");
const trackName = document.getElementById("trackName");

/* Play */
playBtn.onclick = () => {
  audio.play();
};

/* Pause */
pauseBtn.onclick = () => {
  audio.pause();
};

/* Progress bar */
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* Change track */
document.querySelectorAll(".tracks button").forEach(btn => {
  btn.addEventListener("click", () => {
    audio.src = btn.dataset.src;
    trackName.textContent = btn.textContent;
    audio.play();
  });
});