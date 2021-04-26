const search_input = document.getElementById("search-text");
const search_btn = document.getElementById("search");
const random_btn = document.getElementById("random");
const images_section = document.querySelector(".images-section");
const detail_container = document.querySelector(".detail-container");
const search_status = document.querySelector(".show-search-word");

const renderSearchResults = (url,name,id) => {

    detail_container.innerHTML = "";

    var div = document.createElement("div");
    div.classList.add("img-container");
    div.id = id;
    
    var img = document.createElement("img");
    img.classList.add("img");
    img.src = url;
    div.appendChild(img);

    var caption = document.createElement("h3");
    caption.classList.add("show-caption");
    var text_caption = document.createTextNode(name);
    caption.appendChild(text_caption);
    div.appendChild(caption);

    images_section.appendChild(div);
}

const searchMeals = async keyword => {

    var rawData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    var meal = await rawData.json();
    if(meal.meals){
        search_status.innerHTML = `<p>Search results for ' ${keyword} '</p>`;
        images_section.innerHTML = "";
        meal.meals.map(meal => {
            renderSearchResults(meal.strMealThumb,meal.strMeal,meal.idMeal);
        });
    }
    else{
        search_status.innerHTML = "<p>There are no search results. Try again!</p>";
    }
}

const renderDetailResults = meal =>{

    detail_container.innerHTML = '';

    var heading = document.createElement("h1");
    var headingText = document.createTextNode(meal.strMeal);
    heading.appendChild(headingText);
    detail_container.appendChild(heading);

    var img = document.createElement("img");
    img.classList.add("detail-img");
    img.src = meal.strMealThumb;
    detail_container.appendChild(img);

    var tags = document.createElement("div");
    tags.classList.add("detail-caption");
    tags.innerHTML += `<p>${meal.strCategory}</p><p>${meal.strArea}</p>`
    detail_container.appendChild(tags);

    var recipe = document.createElement("div");
    recipe.classList.add("detail-recipe");
    recipe.innerHTML = `${meal.strInstructions}`;
    detail_container.appendChild(recipe);

    detail_container.innerHTML += `<h2>Ingredients</h2>`;

    var ingredients = document.createElement("div");
    ingredients.classList.add("ingredient-container");
    for(var i = 0; i <20; i++){
        var ingredient = meal['strIngredient'+i];
        if(ingredient){
            ingredients.innerHTML += `<span>${ingredient} - ${meal['strMeasure'+i]}</span>`
        }
    }
    detail_container.appendChild(ingredients);

}

const searchByID = async id => {
    var rawData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var data = await rawData.json();
    renderDetailResults(data.meals[0]);
}

search_btn.addEventListener("click", _ => {
    var keyword = search_input.value;
    if(keyword.trim()){
        searchMeals(keyword);

    }
    else{
        alert("Please input a valid keyword to search: ");
    }
});

images_section.addEventListener("click", e => {
   var targetID = e.target.parentElement.id;
   searchByID(targetID);
})

random_btn.addEventListener("click", async _ => {
    var rawData = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    var data = await rawData.json();
    images_section.innerHTML = "";
    search_status.innerHTML = "";
    renderDetailResults(data.meals[0]);
})