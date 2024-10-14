let pre = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector("#title");
let recent_volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
let slider = document.querySelector("#duration_slider");
let show_duration = document.querySelector("#show_duration");
let track_image = document.querySelector("#track_image");
let auto_play = document.querySelector("#auto");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let artist = document.querySelector("#artist");

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;

// Create an audio element
let track = document.createElement("audio");

// All songs list with images
let tracks = [
  {
    title: "cool down",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    img: "./song1.jpg",
  },
  {
    title: "electro spark",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    img: "./song2.jpg",
  },
  {
    title: "Song 3",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    img: "./song3.jpg",
  },
];

// Function to load the track
function load_track(index_no) {
  clearInterval(timer);
  reset_slider();

  track.src = tracks[index_no].url; // Access the URL
  title.innerHTML = tracks[index_no].title; // Access the title
  track_image.src = tracks[index_no].img; // Access the image
  artist.innerHTML = tracks[index_no].artist; // Access the artist name
  track.load();

  timer = setInterval(range_slider, 1000);
  total.innerHTML = tracks.length; // Update total song count
  present.innerHTML = index_no + 1; // Update current song index

  // Update play/pause button based on whether song is playing or paused
  if (Playing_song) {
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }
}

load_track(index_no);

// Mute function
function mute_sound() {
  track.volume = 0;
  recent_volume.value = 0;
  volume_show.innerHTML = 0;
}

// Play or pause song
function justplay() {
  if (Playing_song == false) {
    playsong();
  } else {
    pausesong();
  }
}

// Reset the song slider
function reset_slider() {
  slider.value = 0;
}

// Play the song
function playsong() {
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// Pause the song
function pausesong() {
  track.pause();
  Playing_song = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// Next song
function next_song() {
  if (index_no < tracks.length - 1) {
    index_no += 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = 0;
    load_track(index_no);
    playsong();
  }
}

// Previous song
function previous_song() {
  if (index_no > 0) {
    index_no -= 1;
    load_track(index_no);
    playsong();
  } else {
    index_no = tracks.length - 1;
    load_track(index_no);
    playsong();
  }
}

// Change volume
function volume_change() {
  volume_show.innerHTML = recent_volume.value;
  track.volume = recent_volume.value / 100;
}

// Change slider position
function change_duration() {
  let slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

// Autoplay switch
function autoplay_switch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto_play.style.background = "rgba(255,255,255,0.2)";
  } else {
    autoplay = 1;
    auto_play.style.background = "#148F77";
  }
}

// Update slider as the song plays
function range_slider() {
  let position = 0;

  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    if (autoplay == 1) {
      next_song();
    }
  }
}
