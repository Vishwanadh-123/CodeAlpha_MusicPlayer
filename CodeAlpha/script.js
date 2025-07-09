const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const playlistItems = document.querySelectorAll("#playlist li");
const currentTrackName = document.getElementById("current-track-name");

const tracks = [
  { name: "Bliss Vibes", file: "assets/track1.mp3" },
  { name: "City Drive", file: "assets/track2.mp3" },
  { name: "Chill Beats", file: "assets/track3.mp3" },
  { name: "Night Lo-Fi", file: "assets/track4.mp3" },
  { name: "Uplift Me", file: "assets/track5.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

function loadTrack(index) {
  audio.src = tracks[index].file;
  currentTrackName.textContent = tracks[index].name;
  playlistItems.forEach(item => item.classList.remove('active'));
  playlistItems[index].classList.add('active');
  currentTrack = index;
}

function playTrack() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
    progress.classList.add("playing");
  }
  
  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
    progress.classList.remove("playing"); // 🛑 Remove pulsing
  }
  

playPauseBtn.addEventListener("click", () => {
  isPlaying ? pauseTrack() : playTrack();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

playlistItems.forEach(item => {
  item.addEventListener("click", () => {
    const index = parseInt(item.getAttribute("data-index"));
    loadTrack(index);
    playTrack();
  });
});


loadTrack(currentTrack);
