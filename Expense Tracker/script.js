const info = document.getElementById("info");
const message_box = document.querySelector(".message-box");


info.addEventListener("click", _ => {
    
    message_box.style.display = "inline-block";
    setTimeout( _ => {
        message_box.style.display = "none";
    },3000);

})

