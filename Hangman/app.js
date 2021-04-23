const figure_parts = document.querySelectorAll(".figure-part");
const wrong_items_container = document.querySelector(".wrong-result-showcase");
const wrong_items = document.getElementById("wrong-items");
const correct_items = document.querySelector(".correct-items-showcase");
const play_again_btn = document.getElementById("again");
const words = ['application', 'programming', 'interface', 'wizard', 'bitch', 'relationshit'];

var random_word = words[Math.floor(Math.random() * words.length)].split("");

var status = true;
var correct_inputs = [];
var wrong_inputs = [];

const displayInput = _ => {
    correct_items.innerHTML = "";
    random_word.map(letter => {
        if(!correct_inputs.includes(letter)){
            correct_items.innerHTML += "<span class='correct-letter'></span>";
        }
        else{
            correct_items.innerHTML += `<span class='correct-letter'>${letter}</span>`;
        }
    })
}

const updateWrongItems = _ => {
    if(wrong_inputs.length>=1){
        wrong_items_container.style.display = "block";
        wrong_items.innerHTML = wrong_inputs.join(",");
        figure_parts[wrong_inputs.length - 1].style.display="block";
    }
    else{
        wrong_items_container.style.display = "none";
    }
}

const checkWinOrLose = _ => {
    var userInput = correct_items.innerText.replace(/\n/g,"");
    if(random_word.join("") == userInput){   
        document.querySelector(".pop-up-result").style.display = "block";
        document.querySelector(".pop-up-container").style.backgroundColor = "var(--pop-up-color)";
        document.querySelector(".pop-up-result").style.backgroundColor = "var(--pop-up-background-color)";
        document.querySelector(".game-status").innerHTML = "Congratulation You Win 😃!";
        document.querySelector(".reveal-words").innerHTML = "";
        status = false;
    }
    else if(wrong_inputs.length == figure_parts.length){
        document.querySelector(".pop-up-result").style.display = "block";
        document.querySelector(".pop-up-result").style.backgroundColor = "var(--lose)";
        document.querySelector(".pop-up-container").style.backgroundColor = "var(--soft-danger)";
        document.querySelector(".game-status").innerHTML = "You Lose, Try again 😕!";
        document.querySelector(".reveal-words").innerHTML = `The word is ${random_word.join("")}`;
        status = false;
    }
    
}

const showNotification = _ => {
    var notiPanel = document.querySelector(".notification");
    notiPanel.classList.add("show-noti");
    setTimeout(_ => {
    notiPanel.classList.remove("show-noti")},2000);

}

const checkInput = key => {
    if(random_word.includes(key)){
        if(!correct_inputs.includes(key)){
            correct_inputs.push(key);
            displayInput();
            checkWinOrLose();
        }
        else{
            //Popup Noti
            showNotification();
        }
    }
    else{
        if(!wrong_inputs.includes(key)){
            wrong_inputs.push(key);
            updateWrongItems();
            checkWinOrLose();
        }
        else{
            //Popup Noti
            showNotification();
        }
    }
}

play_again_btn.addEventListener("click", _ => {
    status = true;
    document.querySelector(".pop-up-result").style.display = "none";

    //Clean Arrays
    correct_inputs = [];
    wrong_inputs = [];

    //Generate Random 
    random_word = words[Math.floor(Math.random() * words.length)].split("");

    //Update UI
    displayInput();
    updateWrongItems();
    figure_parts.forEach(part => {
        part.style.display = "none";
    })
})


window.addEventListener("keyup", e => {
    if(e.keyCode >=65 && e.keyCode <= 90 ){
        var input_key = e.key.toLowerCase();
        checkInput(input_key);
    }
})
displayInput();