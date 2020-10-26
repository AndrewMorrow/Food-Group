const RECIPEAPIKEY = `d7ff51b2246ccf813a3815611cf0417a`;
const RECIPEAPIID = `3377a3e7`;
const SEARCHBAR = $("#userRecipeSearch");
const SEARCHBUTTON = $(".searchBtn");
const CARDSHOW = $(".cardShow");
const RECIPECARDDIV = $(".recipeCard");


// Nav
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('.modal').modal();
    M.updateTextFields();
SEARCHBUTTON.on("click", basicCall);

// runs on search click
function basicCall() {
    let userSearch = SEARCHBAR.val();
    SEARCHBAR.empty();
    CARDSHOW.empty();
    // basic query search
    apiRecipeCall = `https://api.edamam.com/search?q=${userSearch}&app_id=${RECIPEAPIID}&app_key=${RECIPEAPIKEY}`;

    $.ajax({
        url: apiRecipeCall,
    }).then((response) => {
        // console.log(response);
        let hits = response.hits;
        // targets each recipe received and targets elements we need
        hits.forEach((hit) => {
            // console.log(hit);
            let recipeTitle = hit.recipe.label;
            let recipeImage = hit.recipe.image;
            let recipeTime = hit.recipe.totalTime;
            let recipeUrl = hit.recipe.url;
            let recipeServings = hit.recipe.yield;
            let recipeCalories = Math.round(hit.recipe.calories);

            // check to see if recipe has a time listed
            if (recipeTime === 0) {
                recipeTime = "Time is not listed";
                var showRecipeTime = `<p> Time to Cook: ${recipeTime}</p>`;
            } else {
                var showRecipeTime = `<p> Time to Cook: ${recipeTime} minutes</p>`;
            }
            // calls healthFacts function and stores in healthReturn
            let healthReturn = getHealthFacts(hit);
            // console.log(healthReturn);

            // healthInfoValues
            let recipeFat = healthReturn[0].fat;
            let recipeCarbs = healthReturn[0].carbs;
            let recipeProtein = healthReturn[0].protein;
            let recipeCholesterol = healthReturn[0].cholesterol;
            // console.log(recipeFat);

            // creates elements to append for testing
            let showRecipeTitle = $(`<h2> ${recipeTitle} </h2>`);
            let showRecipeImage = $(`<img src="${recipeImage}"</img>`);
            let showRecipeUrl = $(
                `<a href="${recipeUrl}"> Original Recipe </a>`
            );
            let showRecipeServings = $(`<p> Servings: ${recipeServings}</p>`);
            let showRecipeCalories = $(
                `<p> Total Calories: ${recipeCalories}</p>`
            );
            let showRecipeFat = $(`<p> Total Fat: ${recipeFat}</p>`);
            let showRecipeCarbs = $(`<p> Total Carbs: ${recipeCarbs}</p>`);
            let showRecipeProtein = $(
                `<p> Total Protein: ${recipeProtein}</p>`
            );
            let showRecipeCholesterol = $(
                `<p> Total Cholesterol: ${recipeCholesterol}</p>`
            );

            // appends all the elements created for testing
            CARDSHOW.append(showRecipeTitle);
            CARDSHOW.append(showRecipeImage);
            CARDSHOW.append(showRecipeTime);
            CARDSHOW.append(showRecipeCalories);
            CARDSHOW.append(showRecipeServings);
            CARDSHOW.append(showRecipeFat);
            CARDSHOW.append(showRecipeCarbs);
            CARDSHOW.append(showRecipeProtein);
            CARDSHOW.append(showRecipeCholesterol);
            CARDSHOW.append(showRecipeUrl);

            // calls function to get the ingredients
            getIngredients(hit);
        });
    });
}

// grabs ingredient info for each recipe
function getIngredients(hit) {
    // console.log(hit);
    let ingredients = hit.recipe.ingredients;

    ingredients.forEach((ingredient) => {
        // console.log(ingredient);
        let ingredientImage = ingredient.image;
        let ingredientText = ingredient.text;

        // check to see if the ingredient has a picture
        if (ingredientImage === null) {
            // console.log("This is Null");

            // picture to use if there isnt one available
            ingredientImage = `assets/images/noImageAvailable300.png`;
        }

        // creats elements for ingredients
        let showIngredientImage = `<img src="${ingredientImage}"</img>`;
        let showIngredientText = `<p>${ingredientText}</p>`;

        // appends ingredients for testing
        CARDSHOW.append(showIngredientImage);
        CARDSHOW.append(showIngredientText);
    });
}

// grabs health facts we want from the array
function getHealthFacts(hit) {
    // targets the digest array with contains the health facts
    let recipeHealthFacts = hit.recipe.digest;
    // return array
    let healthFacts = [];
    // object to push to return array
    let healthObj = {};

    recipeHealthFacts.forEach((healthFact) => {
        // console.log(healthFact);
        if (healthFact.label === "Fat") {
            let recipeFat = Math.round(healthFact.total);
            let healthUnit = healthFact.unit;
            recipeFat.toString();
            healthObj.fat = recipeFat + healthUnit;
        }

        if (healthFact.label === "Carbs") {
            var recipeCarbs = Math.round(healthFact.total);
            let healthUnit = healthFact.unit;
            recipeCarbs.toString();
            healthObj.carbs = recipeCarbs + healthUnit;
        }

        if (healthFact.label === "Protein") {
            let recipeProtein = Math.round(healthFact.total);
            let healthUnit = healthFact.unit;
            recipeProtein.toString();
            healthObj.protein = recipeProtein + healthUnit;
        }
        if (healthFact.label === "Cholesterol") {
            let recipeCholesterol = Math.round(healthFact.total);
            let healthUnit = healthFact.unit;
            recipeCholesterol.toString();
            healthObj.cholesterol = recipeCholesterol + healthUnit;
        }
    });

    // pushes to the return array
    healthFacts.push(healthObj);

    // returns an array of objects with healthFacts
    return healthFacts;
}
});
