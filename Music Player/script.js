const cd = document.getElementById("cd");
const play_btn = document.querySelector(".play-btn");
const next_btn = document.querySelector(".next-btn");
const previous_btn = document.querySelector(".previous-btn");
const audio_container = document.querySelector(".audio-container");
const audio_title = document.querySelector(".audio-box h3");
const progress_bar = document.getElementById("timestamp");


var current_count = -1
var song_list = ['hey','summer','ukulele'];
var song = new Audio();


const loadMusic = (song_name) => {
    
    song.src = `./music/${song_name}.mp3`;
    cd.src = `./images/${song_name}.jpg`;
    audio_title.innerHTML = song_name.toUpperCase();

}


const updateUI = () => {
    cd.classList.toggle("rotate");
    play_btn.children[0].classList.toggle('fa-play');
    play_btn.children[0].classList.toggle('fa-pause');
    

}

const play = () => {
    if(audio_container.classList.contains("play") ){
        audio_container.classList.remove("play");
        audio_container.classList.add("pause");
        song.pause();
    }
    else{
        audio_container.classList.remove("pause");
        audio_container.classList.add("play");
        song.play();
    }
    updateUI();

}

const updateTimestamp = () => {

    let audio_duration = song.duration;
    let audiio_current_timestamp = song.currentTime;
    progress_bar.value = ( audiio_current_timestamp / audio_duration ) * 100;

}

const setTimestamp = () => {

    let progress_timestamp = progress_bar.value;
    song.currentTime = ( progress_timestamp / 100 ) * song.duration;

}

const nextSong = () => {

    if(++current_count > 2){
        current_count = 0;
    }
    loadMusic(song_list[current_count]);
    song.play();
}

const previousSong = () => {

    if(--current_count < 0){
        current_count = 2;
    }
    loadMusic(song_list[current_count]);
    song.play();
}


loadMusic(song_list[++current_count]);
play_btn.addEventListener("click",play);
song.addEventListener("timeupdate",updateTimestamp);
song.addEventListener("ended",nextSong)
progress_bar.addEventListener("change",setTimestamp);
next_btn.addEventListener("click",nextSong);
previous_btn.addEventListener("click",previousSong);