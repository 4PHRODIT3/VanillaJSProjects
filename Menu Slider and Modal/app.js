const nav_btn = document.getElementById("nav-toggle");
const body = document.body;
const nav_bar = document.querySelector(".nav-bar");
const signup = document.getElementById("sign-up");
const modal = document.querySelector(".modal");
const modal_close = document.getElementById("modal-close");

const closeNavbar = e => {
    if(body.classList.contains("show-nav")){
        if(e.target !== nav_btn && !nav_btn.contains(e.target)){
            if(e.target !== nav_bar && !nav_bar.contains(e.target)){
                body.classList.remove("show-nav");
            }
        }
    }  
}

nav_btn.addEventListener("click", _ => {
    body.classList.toggle("show-nav");
    body.addEventListener("click", closeNavbar);
})

signup.addEventListener("click", _ => {
    modal.classList.add("show-modal");
})

modal_close.addEventListener("click", _ => {
    modal.classList.remove("show-modal");
})

window.addEventListener("click", e => {
    if(e.target == modal){
        modal.classList.remove("show-modal");
    }
})