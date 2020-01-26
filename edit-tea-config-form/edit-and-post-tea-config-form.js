const brewingTime = document.getElementById('brewing-time');
const ingredients = document.getElementById('ingredients');
const drinkingTime = document.getElementById('drinking-time');
const description = document.getElementById('description');

const brewingTimeError = 'brewing-time-error';
const ingredientsError = 'ingredients-error';
const drinkingTimeError = 'drinking-time-error';
const descError = 'desc-error';

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

let errorCount = 0;

$(document).ready(function () {
    console.log("ready - edit tea screen");

    window.onload = function () {

        let queryString = getPathParamsArray();

        let teaId = "id-fromurl";
        if (queryString["id"] != null) {
            teaId = queryString["id"];
        }

        const url = "http://localhost:8080/teatime/tea/" + teaId;

        console.log("details final url: " + url);
        $.get(url, function (data) {

            if (data.brewingConfig != null) {
                console.log("brewing config: " + data.brewingConfig);
                const brewingTime = document.getElementById("brewing-time");
                brewingTime.value = data.brewingConfig.brewingTime;

                const ingredients = document.getElementById("ingredients");
                ingredients.value = data.brewingConfig.ingredients;

                const drinkingTime = document.getElementById("drinking-time");
                drinkingTime.value = data.brewingConfig.drinkingTime;

                const description = document.getElementById("description");
                description.value = data.brewingConfig.description;
            }

            const editTeaDiv = document.getElementById("div-edit-config-tea");
            editTeaDiv.setAttribute("teaId", data.id)
        });
    };

});

$('form').submit(function (e) {
    e.preventDefault();
    const editTeaConfigDiv = document.getElementById("div-edit-config-tea");
    let data = $("#form-edit-config").serialize();
    data = data + "&teaId=" + encodeURIComponent(editTeaConfigDiv.getAttribute("teaId"));
    console.log("data: " + data);

    validateTeaConfig();
    if (!errorCount) {
        $.ajax({
            url: 'http://127.0.0.1:8080/teatime/tea/config/update',
            type: 'PUT',
            data: data,
            success: function (data) {
                alert('Tea config updated!');
            },
            error: function () {
                alert("Something went wrong:( please try again later")
            }
        });
    }
});


function getPathParamsArray() {
    const queryString = new Array();
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            const params = window.location.search.split('?')[1].split('&');
            for (let i = 0; i < params.length; i++) {
                let key = params[i].split('=')[0];
                let value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    return queryString;
}


function validateTeaConfig() {
    errorCount = 0;
    let isBrewingTimeOk = validateBrewingTime();
    let isIngredientsOk = simpleValidate(ingredients, ingredientsError, "Ingredients");
    let isDrinkingTimeOk = simpleValidate(drinkingTime, drinkingTimeError, "Drinking time");
    let isDescOk = validateDescription();

    scrollToFirstElementFailed(isBrewingTimeOk, isIngredientsOk, isDrinkingTimeOk, isDescOk);
    showErrorSummary();
}

function simpleValidate(input, errorId, name) {
    if (isFieldBlank(input)) {
        errorOnInputField(input, errorId, name + blankFieldErrorMsg);
        return false;
    }
    else if (containsSpecialCharacters(name)) {
        errorOnInputField(input, errorId, name + specialCharactersErrorMsg);
        return false;
    }
    else {
        successValidation(input, errorId);
        return true;
    }
}

function isFieldBlank(input) {
    return !input.value.trim().length;
}

function containsSpecialCharacters(input) {
    let regexOnlyWordsAndNumber = /^[a-zA-Z0-9. ]+$/;
    return !regexOnlyWordsAndNumber.exec(input.value);
}

function errorOnInputField(input, errorId, errorMsg) {
    input.style.borderColor = errorColor;
    document.getElementById(errorId).innerHTML = errorMsg;
    input.placeholder = '';
    console.warn(errorMsg);
    errorCount++;
}

function successValidation(input, errorId) {
    input.style.borderColor = successValidationColor;
    document.getElementById(errorId).innerHTML = '';
}

function validateBrewingTime() {
    if (isFieldBlank(brewingTime)) {
        errorOnInputField(brewingTime, brewingTimeError, "Brewing time must be provided");
        return false;
    }

    let parsedBrewingTime = parseFloat(brewingTime.value);

    if (parsedBrewingTime < 0) {
        errorOnInputField(brewingTime, brewingTimeError, "Brewing time can't be smaller than 0");
        return false;
    } else if (!isFieldBlank(brewingTime) && containsNonNumbers(brewingTime)) {
        errorOnInputField(brewingTime, brewingTimeError, "Brewing time can't contain non numbers");
        return false;
    } else {
        successValidation(brewingTime, brewingTimeError);
        return true;
    }
}

function containsNonNumbers(input) {
    let regexOnlyNumbers = /^[0-9.]+$/;
    return !regexOnlyNumbers.exec(input.value);
}

function validateDescription() {
    if (isFieldBlank(description)) {
        errorOnInputField(description, descError, "Description" + blankFieldErrorMsg);
        return false;
    }
    else if (description.value.length > 200) {
        errorOnInputField(description, descError, "Description maximum length is 200 characters");
        return false;
    }
    else {
        successValidation(description, descError);
        return true;
    }
}

function scrollToFirstElementFailed(isBrewingTime, isIngredientsOk, isDrinkingTime, isCaffeineContentOk, isDescOk) {
    if (!isBrewingTime) {
        brewingTime.scrollIntoView()
    } else if (!isIngredientsOk) {
        ingredients.scrollIntoView()
    } else if (!isDrinkingTime) {
        drinkingTime.scrollIntoView()
    } else if (!isDescOk) {
        description.scrollIntoView()
    }
}

function showErrorSummary() {
    let errorSummary = document.getElementById('error-summary');
    errorSummary.style.color = errorColor;
    if (errorCount > 0) {
        errorSummary.innerHTML = errorCount === 1 ? errorCount + ' error to fix' : errorCount + " errors to fix";
    } else {
        errorSummary.innerHTML = 'Submitted successfully!';
        errorSummary.style.color = '#49a02f';
    }
}
