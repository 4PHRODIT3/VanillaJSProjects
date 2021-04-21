const container = document.getElementById("people-container");
const add_btn = document.getElementById("add-user");
const double_btn = document.getElementById("double");
const millionaires_btn = document.getElementById("millionaires");
const sort_btn = document.getElementById("sort");
const total = document.getElementById("total");
const show_total = document.getElementById("show-total");

var people = new Array();

//Generate money for random people
const generateMoney = _ => {

    var property = Math.floor(Math.random() * 1000000);
    return property;
}

//Fetch API
const getPerson = async () => {

    var raw_data = await fetch("https://randomuser.me/api/");
    var person_data = await raw_data.json();
    var person = person_data.results[0];
    
    var person_name = person.name['title'] + " " + person.name['first'] + " " + person.name['last'];
    var money = generateMoney();

    addToList(person_name,money);
}

//Add to list
const addToList = (name,property) => {
    var personObj = {
        name,property
    }
    people.push(personObj);
    updateUI();
}

//Update UI if changes occurr
const updateUI = _ => {
    //If Total exists then make invisible
    document.getElementById("total-container").classList.add("invisible");
    container.innerHTML = "";
    people.map(person => {
        var div = document.createElement("div");
        div.classList.add("person");

        var name = document.createElement("h2");
        var nameText = document.createTextNode(`${person.name}`);
        name.appendChild(nameText);
        div.appendChild(name);

        var money = document.createElement("span");
        var moneyText = document.createTextNode(`${formatMoney(person.property)}`);
        money.appendChild(moneyText);
        div.appendChild(money);

        container.appendChild(div);

    })
}
const formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Double Money
const doubleMoney = _ => {
    people = people.map(person => {
        return {name:person.name,property:person.property * 2};
    });
    updateUI();
    
}

//Filter Millionaires
const showOnlyMillionaires = _ => {
    people = people.filter(person => person.property >= 1000000);
    updateUI();
}

//Sort
const sortByTheRichest = _ => {
    people = people.sort(function(a, b){return b.property - a.property});
    updateUI();
}

//Show Total
const showTotal = _ => {
    document.getElementById("total-container").classList.remove("invisible");
    var total_amount = people.reduce((total,person) =>{ return total + person.property; } ,0);

    show_total.innerHTML = "";
    var title = document.createElement("span");
    var title_text = document.createTextNode("Total Wealth: ");
    title.appendChild(title_text);
    show_total.appendChild(title);
    
    var amount = document.createElement("h2");
    var amount_text = document.createTextNode(`${formatMoney(total_amount)}`);
    amount.appendChild(amount_text);
    show_total.appendChild(amount);
}

(_ => {
    for(var i = 0; i < 3; i++){
        getPerson();
    }
})();

add_btn.addEventListener("click",getPerson);
double_btn.addEventListener("click",doubleMoney);
millionaires_btn.addEventListener("click",showOnlyMillionaires);
sort_btn.addEventListener("click",sortByTheRichest);
total.addEventListener("click",showTotal);