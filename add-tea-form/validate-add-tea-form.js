const name = document.getElementById('name');
const originCountry = document.getElementById('origin-country');
const harvestSeason = document.getElementById('harvest-season');
const caffeineContent = document.getElementById('caffeine-content');
const description = document.getElementById('description');
const imageLink = document.getElementById('image-link');

const nameError = 'name-error';
const originCountryError = 'origin-country-error';
const harvestSeasonError = 'harvest-season-error';
const caffeineContentError = 'caffeine-content-error';
const descError = 'desc-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

let errorCount = 0;

// function validateForm() {
//     validate();
//     if (!errorCount) {
//         alert("Submitted successfully!");
//         $.post( "http://127.0.0.1:8080/teatime/tea/add", $( "#add-tea-form" ).serialize() );
//     }
//
// }

$('form').submit(function(e){
    e.preventDefault();
    let data = $( "#add-tea-form" ).serialize();
    console.log("data: " + data);

    $.post( "http://127.0.0.1:8080/teatime/tea/add", data );
    //TODO validate and alert on success or fail
});

function validate() {
    errorCount = 0;
    let isNameOk = simpleValidate(name, nameError, "Name");
    let isOriginCountryOk = simpleValidate(originCountry, originCountryError, "Origin country");
    let isHarvestSeasonOk = simpleValidate(harvestSeason, harvestSeasonError, "Harvest season");
    let isCaffeineContentOk = validateCaffeineContent();
    let isDescOk = validateDescription();
    let isImageLinkOk = validateImageLink();

    scrollToFirstElementFailed(isNameOk, isOriginCountryOk, isHarvestSeasonOk, isCaffeineContentOk, isDescOk, isImageLinkOk);
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

function containsNonNumbers(input) {
    let regexOnlyNumbers = /^[0-9.]+$/;
    return !regexOnlyNumbers.exec(input.value);
}

function validateCaffeineContent() {
    let parsedCaffeineContent = parseFloat(caffeineContent.value);

    if (parsedCaffeineContent < 0) {
        errorOnInputField(caffeineContent, caffeineContentError, "Caffeine content can't be smaller than 0");
        return false;
    } else if (!isFieldBlank(caffeineContent) && containsNonNumbers(caffeineContent)) {
        errorOnInputField(caffeineContent, caffeineContentError, "Caffeine content can't contain non numbers");
        return false;
    } else {
        successValidation(caffeineContent, caffeineContentError);
        return true;
    }
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

function validateImageLink() {
    if (isFieldBlank(imageLink)) {
        imageLink.placeholder = '';
    }
    if (!isValidURL(imageLink)) {
        errorOnInputField(imageLink, imageLinkError, "This is not valid url");
        return false;
    }
    else {
        successValidation(imageLink, imageLinkError);
        return true;
    }
}

function isValidURL(url) {
    let urlElement = document.createElement('input');
    urlElement.setAttribute('type', 'url');
    urlElement.value = url.value;
    return urlElement.validity.valid;
}

function scrollToFirstElementFailed(isNameOk, isOriginCountryOk, isHarvestSeasonOk, isCaffeineContentOk, isDescOk,
                                    isImageLinkOk) {
    if (!isNameOk) {
        name.scrollIntoView()
    } else if (!isOriginCountryOk) {
        originCountry.scrollIntoView()
    } else if (!isHarvestSeasonOk) {
        harvestSeason.scrollIntoView()
    } else if (!isCaffeineContentOk) {
        caffeineContent.scrollIntoView()
    } else if (!isDescOk) {
        description.scrollIntoView()
    } else if (!isImageLinkOk) {
        imageLink.scrollIntoView()
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
