const videoContainer = document.querySelector(".video-container");
const controls = document.querySelector(".controls");
const video = document.getElementById("video");
const showDuration = document.getElementById("duration");
const timestamp = document.getElementById("timestamp");

//buttons
const playBtn = document.getElementById("togglePlay");
const stopBtn = document.getElementById("stop");
const fullscreen = document.getElementById("full-screen");

// icons
var pause = `<i class="fas fa-pause"></i>`;
var play = `<i class="fas fa-play"></i>`;

//video methods

const toggleVideo = _ => {
    var vd_status = video.paused;
    if(vd_status){
        updateToggleIcon(pause);
        video.play();
    }
    else{
        updateToggleIcon(play);
        video.pause();
    }
};

const stopVideo = _ => {
    video.pause();
    video.currentTime = 0;
    updateToggleIcon(play);
};

const secToHMS = (sec) => {
    var second = Number(sec);

    var h = Math.floor(second / 3600);
    var m = Math.floor(second % 3600 / 60);
    var s =  Math.floor(second % 3600 % 60);

    var hDisplay = h > 0 ? h+ " : "  : "";
    var mDisplay = m > 0 ? m : "";
    var sDisplay = s > 0 ? s : "";

    return hDisplay + String(mDisplay).padStart(1,'0') + " : "  + String(sDisplay).padStart(2,'0'); 
};

const updateToggleIcon = (icon) => {
    playBtn.innerHTML = icon;
};

const updateTimestamp = _ => {
    var current_time = Math.floor(video.currentTime);
    var full_time = Math.floor(video.duration);
    var current_reach_duration = secToHMS(current_time);
    var original_duration = secToHMS(full_time);

    var rangeValue = (current_time/full_time)*100;
    timestamp.value = rangeValue;
    showDuration.innerHTML = current_reach_duration + " / " + original_duration;

};

const setTimestamp = _ => {
    var timestampValue = timestamp.value;
    var currentTime = Math.floor(timestampValue * video.duration / 100);
    video.currentTime = currentTime;
};

const openFullscreen = _ => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
      video.msRequestFullscreen();
    }
  }

//Customized Controls Functions

video.addEventListener("click",toggleVideo);
video.addEventListener("timeupdate", updateTimestamp);
video.addEventListener("ended",stopVideo);
playBtn.addEventListener("click",toggleVideo);
stopBtn.addEventListener("click",stopVideo);
timestamp.addEventListener("change",setTimestamp);
fullscreen.addEventListener("click",openFullscreen);
//Customized Controls UI 

videoContainer.addEventListener("mouseenter", _ => {
    controls.classList.remove("invisible");
    setTimeout(_ => {
        controls.classList.add("invisible");
    },7000)
    videoContainer.addEventListener("pointermove", _ => {
        controls.classList.remove("invisible");
    })
});

videoContainer.addEventListener("mouseleave", _ => {
    controls.classList.add("invisible");
});

document.addEventListener("keyup", e => {
    if(e.keyCode == "32"){
        toggleVideo();
    }
    else if(e.keyCode == "70"){
        openFullscreen();
    }
})