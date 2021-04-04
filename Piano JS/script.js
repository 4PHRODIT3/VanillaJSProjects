var key_container = document.getElementsByClassName("key-container")[0];
var input = document.getElementById("show-keys");
var ul = document.getElementById("record-list");

var keys = ['C4','D4','E4','F4','G4','A4','B4','C5'];
var memory = new Array();

window.addEventListener("keyup",event=>{
    switch(event.keyCode){
        case 65:
            playAudio(`${keys[0]}`);
            break;
            case 83:
                playAudio(`${keys[1]}`);
                break;
            case 68:
                playAudio(`${keys[2]}`);
                break;
            case 70:
                playAudio(`${keys[3]}`);
                break;
            case 74:
                playAudio(`${keys[4]}`);
                break;
            case 75:
                playAudio(`${keys[5]}`);
                break;
            case 76:
                playAudio(`${keys[6]}`);
                break;
            case 186:
                playAudio(`${keys[7]}`);
                break;
    }
})

keys.map(key=>{
    key_container.innerHTML += `<button class="key-btn" onclick="playAudio('${key}')">${key}</button>`;
})
function showRecords(){
    if(memory.length>=1){
        ul.innerHTML="";
        memory.map((record,index)=>{
            ul.innerHTML += `<li><button class="replay" onclick="replay(${index})"><i class="fas fa-play-circle"></i></button>&nbsp${record} </li>`;
        });
    };
}
function playAudio(key){
    input.value += key + ",";
    var audio = new Audio(`sound/${key}.mp3`);
    audio.play();
}
function saveChord(){
    memory.push(input.value);
    input.value = "";
    showRecords();
}
function replay(index,keyDur=1000){
    var chords = memory[index].split(",");
    chords.pop();
    var dur = 0;
    keyDur = Number(window.prompt("Enter the duration between each chords: ",1000));
    chords.map(chord=>{
        setTimeout(playAudio,dur,chord);
        dur += keyDur
    });
}
