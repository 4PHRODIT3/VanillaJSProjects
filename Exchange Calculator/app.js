const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const swap_btn = document.getElementById("swap");
const show_result = document.getElementById("result");

const fetchAPI = async _ => {
    var data = await fetch("https://open.exchangerate-api.com/v6/latest");
    var exchangeData = await data.json();
    for(var data in exchangeData.rates){
        currency_one.innerHTML += `<option value=${exchangeData.rates[data]}>${data}</option>`;
        currency_two.innerHTML += `<option value=${exchangeData.rates[data]}>${data}</option>`;
    }
    currency_two.selectedIndex = 44;
    calculate();
}

const calculate = _ => {
    var amount_one_value = amount_one.value;
    var currency_one_value = currency_one.value;
    var currency_two_value = currency_two.value;
    var rate = eval(`${currency_two_value} / ${currency_one_value}`);
    var result = eval(`${amount_one_value} * ${rate}`);
    show_result.innerHTML = `1 ${currency_one[currency_one.selectedIndex].innerText} = ${rate} ${currency_two[currency_two.selectedIndex].innerText}`;
    amount_two.value = result.toFixed(2);
}

const swap = _ => {
    var container = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = container;
    calculate();
}

fetchAPI();

amount_one.addEventListener("input",calculate);
amount_two.addEventListener("input",calculate);
currency_one.addEventListener("change",calculate);
currency_two.addEventListener("change",calculate);
swap_btn.addEventListener("click",swap);