const nav_btn = document.getElementById("nav-toggle");
const body = document.body;
const nav_bar = document.querySelector(".nav-bar");

const closeNavbar = e => {
    if(body.classList.contains("show-nav") && e.target !== nav_btn && !nav_btn.contains(e.target) && e.target !== nav_bar && !nav_bar.contains(e.target)){
        body.classList.remove("show-nav");
    }
        
}

nav_btn.addEventListener("click", _ => {
    body.classList.toggle("show-nav");
    body.addEventListener("click", closeNavbar);
})