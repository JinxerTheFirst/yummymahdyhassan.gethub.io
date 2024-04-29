let apiData = document.getElementById("apiData");


$(document).ready(() => {
    searchByFName("").then(() => {
        $(".loading").fadeOut(300)
        $("body").css("overflow", "visible")
        $(".inner-loading").fadeOut(300)

    });
})
///////////////////////////////////////////////////////////Nav-Bar-Start
function openSideNavBar() {
    $(".side-nav-bar").animate({ left: "0px" }, 500);
    $("i.nav-close-and-open-icon").removeClass("fa-bars").addClass("fa-x");
    $(".nav-links li").each(function (index) {
        $(this).animate({ top: "0px" }, 500 + (100 * index));
    });
}

function closeSideNavBar() {
    let boxWidth = $(".side-nav-bar .nav-menu").outerWidth();
    $(".nav-close-and-open-icon").removeClass("fa-x").addClass("fa-bars");
    $(".side-nav-bar").animate({ left: -boxWidth }, 400);
    $(".nav-links li").animate({ top: "300px" }, 400);
}
closeSideNavBar();

$(".side-nav-bar i.nav-close-and-open-icon").click(function () {
    if ($(".side-nav-bar").css("left") === "0px") {
        closeSideNavBar();
    } else {
        openSideNavBar();
    }
});
///////////////////////////////////////////////////////////Nav-Bar-end



///////////////////////////////////////////////////////////Search and Display Meals start
function displayMeals(food) {
    let mealsMenu = "";
    for (let i = 0; i < food.length; i++) {
        mealsMenu += `
            <div class="col-md-3">
                <div onclick="getMealsDetails('${food[i].idMeal}')" class="icon-cursor meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${food[i].strMealThumb}" alt="">
                    <div class="meal-hover d-flex align-items-center position-absolute">
                        <h3 class="text-black">${food[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `;
    }
    apiData.innerHTML = mealsMenu;
}
///////////////////////////////////////////////////////////Search and Display Meals end



///////////////////////////////////////////////////////////Categories Meals start
async function getCategories() {
    $(".inner-loading").fadeIn(500)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategories(response.categories);
    $(".inner-loading").fadeOut(300)

}
function displayCategories(arr) {
    let mealsMenu = "";
    for (let i = 0; i < arr.length; i++) {
        mealsMenu += `
            <div class="col-md-3 icon-cursor">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')"  class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
                    <div class="meal-hover text-center position-absolute">
                        <h3 class="text-black">${arr[i].strCategory}</h3>
                        <p class="text-black">${arr[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
                    </div>
                </div>
            </div>
        `;
    }
    apiData.innerHTML = mealsMenu;
}
///////////////////////////////////////////////////////////Categories Meals end



///////////////////////////////////////////////////////////area Meals start
async function getArea() {
    $(".inner-loading").fadeIn(500)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    $(".inner-loading").fadeOut(300)

}

function displayArea(arr) {
    let mealsMenu = "";
    for (let i = 0; i < arr.length; i++) {
        mealsMenu += `
            <div onclick="getAreaMeals('${arr[i].strArea}')" class="col-md-3 text-center icon-cursor">
                <i class="fa-solid fa-house-laptop fs-1"></i>
                <h3 class="text-black">${arr[i].strArea}</h3>
            </div>
        `;
    }
    apiData.innerHTML = mealsMenu;
}
///////////////////////////////////////////////////////////area Meals end



///////////////////////////////////////////////////////////area ingredients start
async function getingredients() {
    $(".inner-loading").fadeIn(500)

    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayingredients(response.meals.slice(0, 20));
    $(".inner-loading").fadeOut(300)

}

function displayingredients(arr) {
    let mealsMenu = "";
    for (let i = 0; i < arr.length; i++) {
        mealsMenu += `
            <div onclick="getIngredientsaMeals('${arr[i].strIngredient}')" class="icon-cursor col-md-3 text-center">
              <i class="fa-solid fa-utensils fs-1"></i>
              <h3 class="text-white">${arr[i].strIngredient}</h3>
              <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        `;
    }
    apiData.innerHTML = mealsMenu;
}
///////////////////////////////////////////////////////////area ingredients end



///////////////////////////////////////////////////////////meals-type-dis start
async function getCategoryMeals(category) {
    $(".inner-loading").fadeIn(500)

    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

async function getAreaMeals(area) {
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}

async function getIngredientsaMeals(ingredients) {
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals)
    $(".inner-loading").fadeOut(300)

}
///////////////////////////////////////////////////////////meals-type-dis end



//////////////////////////////////////////////////////////displayMeals-details-start
async function getMealsDetails(mealID) {
    $(".inner-loading").fadeIn(500)

    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    response = await response.json()
    displayMealsDetails(response.meals[0])
    $(".inner-loading").fadeOut(300)

}

function displayMealsDetails(meal) {
    closeSideNavBar()
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-2 fs-6">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-2">${tags[i]}</li> `;

    }

    let mealsDetails = `<div class="col-md-4 g-4 overflow-hidden mt-5 ">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
    <h2 class="">${meal.strMeal}</h2>
</div>
  <div class="col-md-8 mt-5 overflow-hidden">
    <h2>${meal.strArea}</h2>
    <p>${meal.strInstructions}</p>
    <h2>Area : ${meal.strArea}</h2>
    <h2>Category : ${meal.strCategory}</h2>
    <h2>Recipes : </h2>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${ingredients}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tagsStr}
    </ul>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success ms-2">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger ms-2">Youtube</a>
</div>`

    apiData.innerHTML = mealsDetails
}
//////////////////////////////////////////////////////////displayMeals-details-end


//////////////////////////////////////////////////////////searchArea-start
function getSearch() {
    $(".inner-loading").fadeIn(500)

    searchInput.innerHTML = `<div class="row">
    <div class="col-md-6 mt-5">
      <input onkeyup="searchByFName(this.value)" class="form-control bg-transparent" placeholder="Search By Name" type="" name="" id="">
    </div>
    <div class="col-md-6 mt-5">
      <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent" placeholder="Search By First Letter" type="" name="" id="">
    </div>
  </div>`
    apiData.innerHTML = ""
    $(".inner-loading").fadeOut(300)

}
async function searchByFName(name) {
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading").fadeOut(300)

}

async function searchByFLetter(letter) {
    $(".inner-loading").fadeIn(500)

    letter == "" ? letter = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $(".inner-loading").fadeOut(300)

}
//////////////////////////////////////////////////////////searchArea-end



//////////////////////////////////////////////////////////contactUs-start
function contactUs() {
    apiData.innerHTML = `<div class="container contact w-75 p-md-5 p-0">
        <div class="row p-5">
          <div class="col-md-6 mt-5">
            <input id="nameValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By Name" type="text">
            <span id="nameError" class="error-message alert text-danger me-3"></span>
          </div>
          <div class="col-md-6 mt-3 mt-md-5">
            <input id="emailValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By Email" type="text">
            <span id="emailError" class="error-message text-danger"></span>
          </div>
          <div class="col-md-6 mt-2">
            <input id="phoneValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By phone" type="tel">
            <span id="phoneError" class="error-message text-danger"></span>
          </div>
          <div class="col-md-6 mt-2">
            <input id="ageValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By age" type="number">
            <span id="ageError" class="error-message text-danger"></span>
          </div>
          <div class="col-md-6 mt-4">
            <input id="passwordValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By Password" type="password">
            <span id="passwordError" class="error-message text-danger"></span>
          </div>
          <div class="col-md-6 mt-4">
            <input id="repasswordValidation" oninput="contactsValidation()" class="form-control bg-transparent" placeholder="Enter By Repassword" type="password">
            <span id="repasswordError" class="error-message text-danger"></span>
          </div>
        </div>
        <div class="col-12 text-center">
          <button id="submitButton" onclick="submitForm()" disabled class="btn bg-danger bg-transparent border border-1 border-danger text-danger">Submit</button>
        </div>
      </div>`;

    // Event listeners for input focus
    document.getElementById("nameValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });

    document.getElementById("emailValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });

    document.getElementById("phoneValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });

    document.getElementById("ageValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });

    document.getElementById("passwordValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });

    document.getElementById("repasswordValidation").addEventListener("focus", () => {
        hideAllErrorMessages();
    });
}

function hideAllErrorMessages() {
    document.getElementById("nameError").innerText = '';
    document.getElementById("emailError").innerText = '';
    document.getElementById("phoneError").innerText = '';
    document.getElementById("ageError").innerText = '';
    document.getElementById("passwordError").innerText = '';
    document.getElementById("repasswordError").innerText = '';
}

function contactsValidation() {
    var isNameValid = nameValidation();
    var isEmailValid = emailValidation();
    var isPhoneValid = phoneValidation();
    var isAgeValid = ageValidation();
    var isPasswordValid = passwordValidation();
    var isRepasswordValid = repasswordValidation();

    // Update error messages only for the currently focused input field
    if (document.activeElement.id === "nameValidation") {
        document.getElementById('nameError').innerText = isNameValid ? '' : 'Invalid Name';
    } else if (document.activeElement.id === "emailValidation") {
        document.getElementById('emailError').innerText = isEmailValid ? '' : 'Invalid Email *exmple@abc.zzz';
    } else if (document.activeElement.id === "phoneValidation") {
        document.getElementById('phoneError').innerText = isPhoneValid ? '' : 'Invalid Phone';
    } else if (document.activeElement.id === "ageValidation") {
        document.getElementById('ageError').innerText = isAgeValid ? '' : 'Invalid Age';
    } else if (document.activeElement.id === "passwordValidation") {
        document.getElementById('passwordError').innerText = isPasswordValid ? '' : 'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, and one digit';
    } else if (document.activeElement.id === "repasswordValidation") {
        document.getElementById('repasswordError').innerText = isRepasswordValid ? '' : 'Passwords do not match';
    }

    // Enable/disable submit button based on overall validity
    var submitButton = document.getElementById('submitButton');
    submitButton.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
}

function nameValidation() {
    var nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(document.getElementById("nameValidation").value);
}

function emailValidation() {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(document.getElementById("emailValidation").value);
}

function phoneValidation() {
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(document.getElementById("phoneValidation").value);
}

function ageValidation() {
    var ageRegex = /^\d+$/;
    return ageRegex.test(document.getElementById("ageValidation").value);
}

function passwordValidation() {
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(document.getElementById("passwordValidation").value);
}

function repasswordValidation() {
    var password = document.getElementById("passwordValidation").value;
    var repassword = document.getElementById("repasswordValidation").value;
    return password === repassword;
}

function submitForm() {
    alert("Form submitted successfully!");
    document.getElementById("nameValidation").value = "";
    document.getElementById("emailValidation").value = "";
    document.getElementById("phoneValidation").value = "";
    document.getElementById("ageValidation").value = "";
    document.getElementById("passwordValidation").value = "";
    document.getElementById("repasswordValidation").value = "";
    document.getElementById("submitButton").disabled = true;
}
//////////////////////////////////////////////////////////contactUs-end
