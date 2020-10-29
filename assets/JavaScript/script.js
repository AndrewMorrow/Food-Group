const RECIPEAPIKEY = `d7ff51b2246ccf813a3815611cf0417a`;
const RECIPEAPIID = `3377a3e7`;
const SEARCHBAR = $("#userRecipeSearch");
const SEARCHBUTTON = $(".searchBtn");
const CARDSHOW = $(".cardShow");
const RECIPECARDDIV = $(".recipeCard");
const HOMEBTN = $(".homeBtn");
const FAVBTN = $(".favorites");
const HISTBTN = $(".history");
const INGREDIENTSBTN = $(".ingredientsBtn");
const GROCERYBTN = $(".groceryBtn");
const ADDFAVBTN = $(".addFavBtn");
const FAVMODAL = $(".favModal");

// Nav
$(document).ready(function () {
  var searchHistoryArray = [];
  var storeSearch = localStorage.getItem("userSearch");

  if (storeSearch) {
    searchHistoryArray = JSON.parse(storeSearch);
  }
  console.log(searchHistoryArray);

  //initialize history 
  searchHistory();

  // materialize js fires
  $(".sidenav").sidenav();
  $(".modal").modal();
  M.updateTextFields();

  SEARCHBUTTON.on("click", basicCall);

  // runs on search click
  function basicCall(e) {
    e.preventDefault();
    let userSearch = SEARCHBAR.val().trim();
    SEARCHBAR.empty();
    CARDSHOW.empty();
    // basic query search
    apiRecipeCall = `https://api.edamam.com/search?q=${userSearch}&app_id=${RECIPEAPIID}&app_key=${RECIPEAPIKEY}`;

    $.ajax({
      url: apiRecipeCall,
    }).then((response) => {

      searchHistory(userSearch);

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
        let showRecipeUrl = $(`<a href="${recipeUrl}"> Original Recipe </a>`);
        let showRecipeServings = $(`<p> Servings: ${recipeServings}</p>`);
        let showRecipeCalories = $(`<p> Total Calories: ${recipeCalories}</p>`);
        let showRecipeFat = $(`<p> Total Fat: ${recipeFat}</p>`);
        let showRecipeCarbs = $(`<p> Total Carbs: ${recipeCarbs}</p>`);
        let showRecipeProtein = $(`<p> Total Protein: ${recipeProtein}</p>`);
        let showRecipeCholesterol = $(
          `<p> Total Cholesterol: ${recipeCholesterol}</p>`
        );

        // appends all the elements created for testing

        // Need to add Recipe Time/Servings/Calories sections
        // var cardShow = $("#cardShow")

        var recipeh5 = $("<h5>");
        recipeh5.addClass("light");
        recipeh5.addClass(`recipeHeader`);
        recipeh5.text(recipeTitle);

        var cardSize = $("<div>");
        cardSize.addClass("card large");

        var imageDiv = $("<div>");
        imageDiv.addClass("card-image");

        var cardImage = $("<img>");
        cardImage.addClass("responsive-img");
        cardImage.attr("src", recipeImage);
        cardImage.attr("alt", "Image Example");

        // var cardTitle = $("<span>");
        // cardTitle.addClass("card-title");
        // cardTitle.text("Recipe");

        var cardContent = $("<div>");
        cardContent.addClass("card-content");

        var cardRecipe = $("<p>");
        cardRecipe.text(recipeUrl);

        var navTag = $("<nav>");

        var divWrap = $("<div>");
        divWrap.addClass("nav-wrapper teal");
        ``;

        var mobileDemo = $("<a>");
        mobileDemo.attr("href", "#");
        mobileDemo.attr("data-target", "mobile-demo2");
        mobileDemo.attr("class", "sidenav-trigger");

        var iTag = $("<i>");
        iTag.addClass("material-icons text-darken-5");
        iTag.text("more_horiz");

        var ulTag = $("<ul>");
        ulTag.addClass("right hide-on-med-and-down");

        var liIngredients = $("<li>");

        var liGrocery = $("<li>");

        var liFavorites = $("<li>");

        var aIngredients = $("<a>");
        aIngredients.addClass(
          "ingredientsBtn waves-effect waves-light btn-small modal-trigger"
        );
        aIngredients.attr("href", "#modal1");
        aIngredients.text("Ingredients");

        var aGrocery = $("<a>");
        aGrocery.addClass(
          "groceryBtn waves-effect waves-light btn-small modal-trigger"
        );
        aGrocery.attr("href", "#modal2");
        aGrocery.text("Grocery");

        var aFavorites = $("<a>");
        aFavorites.addClass("addFavBtn waves-effect waves-light btn-small");
        aFavorites.text("Add");

        var iFavorites = $("<i>");
        iFavorites.addClass("material-icons right");
        iFavorites.text("Favorite");

        var sidenav = $("<ul>");
        sidenav.addClass("sidenav");
        sidenav.attr("id", "mobile-demo2");

        var liMobileRecipe = $("<li>");

        var liMobileIngredients = $("<li>");

        var liMobileGrocery = $("<li>");

        var liMobileFav = $("<li>");

        var h4Recipe = $("<h4>");
        h4Recipe.addClass("teal white-text center-align");
        h4Recipe.text("The Recipe");

        var aMobileIngredients = $("<a>");
        aMobileIngredients.addClass("modal-trigger");
        aMobileIngredients.attr("href", "#modal1");

        var aMobileGrocery = $("<a>");
        aMobileGrocery.addClass("modal-trigger");
        aMobileGrocery.attr("href", "#modal2");

        var aMobileFav = $("<a>");
        aMobileFav.attr("href", "#");
        aMobileFav.text("Add Fav");

        CARDSHOW.append(recipeh5, cardSize);
        cardSize.append(imageDiv, cardContent, navTag, sidenav);
        imageDiv.append(cardImage);
        cardContent.append(cardRecipe);
        navTag.append(divWrap);
        divWrap.append(mobileDemo, ulTag);
        mobileDemo.append(iTag);
        ulTag.append(liIngredients, liGrocery, liFavorites);
        liIngredients.append(aIngredients);
        liGrocery.append(aGrocery);
        liFavorites.append(aFavorites);
        aFavorites.append(iFavorites);

        sidenav.append(
          liMobileRecipe,
          liMobileIngredients,
          liMobileGrocery,
          liMobileFav
        );
        liMobileRecipe.append(h4Recipe);
        liMobileIngredients.append(aMobileIngredients);
        liMobileGrocery.append(aMobileGrocery);
        liMobileFav.append(aMobileFav);

        // CARDSHOW.append(showRecipeTitle);
        // CARDSHOW.append(showRecipeImage);
        // CARDSHOW.append(showRecipeTime);
        // CARDSHOW.append(showRecipeCalories);
        // CARDSHOW.append(showRecipeServings);
        // CARDSHOW.append(showRecipeFat);
        // CARDSHOW.append(showRecipeCarbs);
        // CARDSHOW.append(showRecipeProtein);
        // CARDSHOW.append(showRecipeCholesterol);
        // CARDSHOW.append(showRecipeUrl);

        // calls function to get the ingredients
        getIngredients(hit);
        console.log("hello");
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
      // CARDSHOW.append(showIngredientImage);
      // CARDSHOW.append(showIngredientText);
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

  // pushes search to local storage and check for duplicates
  function searchHistory(userSearch) {
    SEARCHBAR.val("");
    console.log(searchHistoryArray);
    console.log(searchHistoryArray.indexOf(userSearch));
    if (userSearch && searchHistoryArray.indexOf(userSearch) === -1) {
      searchHistoryArray.push(userSearch);
    }
    localStorage.setItem("userSearch", JSON.stringify(searchHistoryArray));

    SEARCHBAR.empty();

    // clear before append
    $(".addHistory").empty()

    // create items in History modal
    searchHistoryArray.forEach(function (search) {
      let newA = $("<a>")
        .addClass("collection-item")
        .attr("href", "#!")
        .text(search);
      $(".addHistory").append(newA);
    });
  }
});

//     <div class="row">
//         <div class="cardShow">
//             <h4 class="light">What they type</h4>
//             <div class="card large">
//                 <div class="card-image">
//                     <img
//                         class="responsive-img"
//                         src="https://via.placeholder.com/300x300"
//                         alt="Example of a recipe picture"
//                     />
//                     <span class="card-title">Recipe</span>
//                 </div>
//                 <div class="card-content">
//                     <p>Example Recipe</p>
//                 </div>

//                 <!-- Card nav -->
//                 <nav>
//                     <div class="nav-wrapper teal">
//                         <a
//                             href="#"
//                             data-target="mobile-demo2"
//                             class="sidenav-trigger"
//                             ><i class="material-icons text-darken-5"
//                                 >more_horiz</i
//                             ></a
//                         >

//                         <ul class="right hide-on-med-and-down">
//                             <li>
//                                 <a
//                                     class="ingredientsBtn waves-effect waves-light btn-small modal-trigger"
//                                     href="#modal1"
//                                     >Ingredients</a
//                                 >
//                             </li>
//                             <li>
//                                 <a
//                                     class="groceryBtn waves-effect waves-light btn-small modal-trigger"
//                                     href="#modal2"
//                                     >Grocery Stores</a
//                                 >
//                             </li>
//                             <li>
//                                 <a
//                                     class="addFavBtn waves-effect waves-light btn-small"
//                                     ><i class="material-icons right"
//                                         >favorite</i
//                                     >Add</a
//                                 >
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>

//                 <ul class="sidenav" id="mobile-demo2">
//                     <li>
//                         <h4 class="teal white-text center-align">
//                             The Recipe
//                         </h4>
//                     </li>
//                     <li>
//                         <a href="#modal1" class="modal-trigger"
//                             >Ingredients</a
//                         >
//                     </li>
//                     <li>
//                         <a href="#modal2" class="modal-trigger"
//                             >Grocery Stores</a
//                         >
//                     </li>
//                     <li><a href="#">Add Fav</a></li>
//                 </ul>
//                 <!-- Card nav End -->
//             </div>
//         </div>
//     </div>
// </div>
