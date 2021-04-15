var upload = document.getElementById("upload");
var container = document.getElementById("container");
var uploadContainer = document.getElementById("upload-container");

upload.addEventListener("change",_=>{
    var files = upload.files;
    for(var file of files){
        generateSrc(file);
    }
});

uploadContainer.addEventListener("click",_=>{
    upload.click();
});
function createImg(url){
    var image = new Image();
    image.src =`${url}`;
    image.classList.add("gallery-img");
    container.appendChild(image);
}
function generateSrc(file){
    var reader = new FileReader();
    reader.addEventListener("load",_=>{
        createImg(reader.result);
    })
    if(file){
        reader.readAsDataURL(file);
    }
}