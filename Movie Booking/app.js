var seat_container = document.querySelector(".seats-container");
var seats = document.querySelectorAll(".row .seat:not(.occupied)")
var movie_select = document.getElementById("movie");
var arr_seats = Array.from(seats);


const storeData = _ => {
    var selectedSeat = document.querySelectorAll(".row .selected");
    var arrSelectedIndex = [];
    selectedSeat.forEach(element => {
        arrSelectedIndex.push(arr_seats.indexOf(element));
    })
    localStorage.setItem("selectedIndex",JSON.stringify(arrSelectedIndex));
    freshUI();
}

const freshUI = _ => {
    var selected_index = JSON.parse(localStorage.getItem("selectedIndex"));
    selected_index.map(index => {
        arr_seats[index].classList.add("selected");
    });
    var current_price = localStorage.getItem("currentPrice");
    if(current_price){
        movie_select.value = current_price;
    }
    calculatePrice();
}

const calculatePrice = _ => {
    var ticketPrice = movie_select.value;
    var selectedSeatCount = JSON.parse(localStorage.getItem("selectedIndex")).length;
    var totalPrice = eval(selectedSeatCount * ticketPrice);
    
    document.getElementById("count").innerHTML = selectedSeatCount;
    document.getElementById("amount").innerHTML = totalPrice;

}

const setCurrentOption = (movie_index,price) => {
    localStorage.setItem("currentPrice",price);
    localStorage.setItem("currentOption",movie_index);
}

movie_select.addEventListener("change", e => {
    var current_option = movie_select.selectedIndex;
    var current_price = movie_select.value;
    setCurrentOption(current_option,current_price);
    calculatePrice();
})

seat_container.addEventListener("click", e => {
    var target = e.target;
    if(target.classList.contains("seat") && !target.classList.contains("occupied")){
        target.classList.toggle("selected");
        storeData();
    }
})

freshUI();