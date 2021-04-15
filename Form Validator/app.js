//Get All your Inputs

const form = document.getElementById("form");
const inputs = ['username','email','password','password1'];
var password = "";

//Validation Functions

const showErrorMessage = (id,message) => {
    var input = document.getElementById(id);
    document.getElementById(id+"Warning").innerHTML = message;
    input.className = "";
    input.classList.add("danger-input");
}

const showSuccessMessage = (id) => {
    var input = document.getElementById(id);
    document.getElementById(id+"Warning").innerHTML = "";
    input.className = "";
    input.classList.add("success-input");
}

const requiredData = (inputId) => {
    var string = document.getElementById(inputId).value;
    if(string != ""){
        showSuccessMessage(inputId);
        return true;
    }
    else{
        showErrorMessage(inputId,`${inputId.charAt(0).toUpperCase()+inputId.slice(1)} is required`);
        return false;
    }
    
}

const checkLen = (string) => {
    return string.length;
}

const validateForLen = (inputId) => {
    var len = 0;
    var inputValue = document.getElementById(inputId).value;
    if(inputId == "username"){
        
        if(inputValue.length < 3){
            showErrorMessage(inputId,"Username must be at least 3 characters");
        }
        else{
            showSuccessMessage(inputId);
        }
    }
    else if(inputId == "password"){
        if(inputValue.length < 6){
            showErrorMessage(inputId,`${inputId} must be at least 6 characters`)
        }
        else{
            showSuccessMessage(inputId);
        }
        password = inputValue;
    }
    else if( inputId == "password1"){
        if(password != ""){
            if(password !== inputValue){
                showErrorMessage(inputId,`Passwords do not match`);
            }
            else{
                showSuccessMessage(inputId);
            }
        }
        
    }
    
}

const validateEmail = (inputId) => {
    var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    var email = document.getElementById(inputId).value;
    if(email.match(reg)){
        showSuccessMessage(inputId);
    }
    else{
        showErrorMessage(inputId,"Invalid Email Address");
    }

}
//Main Method
form.addEventListener("submit", e => {
    e.preventDefault();
    inputs.map(input => {
        if(requiredData(input)){
            if(input === "email"){
                validateEmail(input);
            }
            else{
                validateForLen(input);
            }
        }
    })
})