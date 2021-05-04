const info = document.getElementById("info");
const message_box = document.querySelector(".message-box");
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const history_list = document.getElementById("history-list");

( _ => {

    if(!localStorage.expense_tracker){
        localStorage['expense_tracker'] = JSON.stringify([]);
    }

})();

var data = JSON.parse(localStorage.expense_tracker);


const updateTransition = _ => {
    localStorage.expense_tracker = JSON.stringify(data);
}

const generateTransitionID = old_data => {

    var last_transition = old_data[old_data.length - 1].transition_id;
    var transition_id = `transition${++last_transition[last_transition.length -1]}`;
    return transition_id;
}

const calculatTransitions = _ => {
    
    var expenses = data.filter(d => d.amount < 0).reduce((total,d) => total += Number(d.amount),0);
    var income = data.filter(d => d.amount >= 0).reduce((total,d) => total += Number(d.amount),0);

    document.getElementById("amount-income").innerHTML = `$ ${income.toFixed(2)}`;
    document.getElementById("amount-expense").innerHTML = `$ ${(expenses * -1).toFixed(2)}`;

    var total = expenses + income;
    document.getElementById("balance").innerHTML = `$ ${total.toFixed(2)}`;
}

const updateUI = _ => {
    history_list.innerHTML = "";
    data.map(d => {
        status = d.amount > 0 ? 'earn' : 'expense';
        history_list.innerHTML += `<div class="history-row ${status}" id="${d.transition_id}">
                                    <span>${d.title}</span>
                                    <span>${d.amount>0 ? "+"+ d.amount: d.amount}</span>
                                    <i class="fas fa-trash"></i></div>`;
    })
    calculatTransitions();
}

const addToStorage = (title,amount) => {
    if(data.length == 0){
        transition_id = "transition1";
    }
    else{
        transition_id = generateTransitionID(data);
    }
    var transition = {transition_id,title,amount};
    data.push(transition);
    updateTransition();
    updateUI();

}

history_list.addEventListener("click", event => {
    var targetElement =  event.target;
    history_list.removeChild(targetElement);
    var newTransition = data.filter(d => d.transition_id !== targetElement.id);
    data = newTransition;
    updateTransition();
    calculatTransitions();
})

submit.addEventListener("click", event => {

    var title_value = title.value.trim();
    var amount_value = amount.value.trim();
    event.preventDefault();

    if(title_value && amount_value){
        addToStorage(title_value,amount_value);
    }
    else{
        alert("Fill both values to add Transition");
    }
    title.value = "";
    amount.value = "";
})


info.addEventListener("click", _ => {

    message_box.style.display = "inline-block";

    setTimeout( _ => {
        message_box.style.display = "none";
    },3000);

});

updateUI();