const name = document.getElementById('name');
const originCountry = document.getElementById('origin-country');
const harvestSeason = document.getElementById('harvest-seasons');
const caffeineContent = document.getElementById('caffeine-content');
const imageLink = document.getElementById('image-link');

const nameError = 'name-error';
const originCountryError = 'origin-country-error';
const harvestSeasonError = 'harvest-season-error';
const caffeineContentError = 'caffeine-content-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

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

            const name = document.getElementById("name");
            name.value = data.name;

            const originCountry = document.getElementById("origin-country");
            originCountry.value = data.originCountry;

            const harvestSeasons = document.getElementById("harvest-seasons");
            harvestSeasons.value = data.harvestSeasons;

            const caffeineContent = document.getElementById("caffeine-content");
            caffeineContent.value = data.caffeineContent;

            const teaImage = document.getElementById("image-link");
            teaImage.value = data.imageLink;

            const editTeaDiv = document.getElementById("edit-tea-div");
            editTeaDiv.setAttribute("teaId", data.id)
        });
    };

});

//TODO add validation

let errorCount = 0;

$('form').submit(function(e){
    e.preventDefault();
    const editTeaDiv = document.getElementById("edit-tea-div");
    let data = $( "#edit-tea-form" ).serialize();
    data = data + "&id=" + encodeURIComponent(editTeaDiv.getAttribute("teaId"));
    console.log("data: " + data);
    validateTeaUpdate();
    if(!errorCount){
        $.ajax({
            url: 'http://127.0.0.1:8080/teatime/tea/update',
            type: 'PUT',
            data: data,
            success: function(data) {
                alert('Tea updated!');
            },
            error: function () {
                alert("Something went wrong, please try again later!")
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


function validateTeaUpdate() {
    errorCount = 0;
    let isNameOk = simpleValidate(name, nameError, "Name");
    let isOriginCountryOk = simpleValidate(originCountry, originCountryError, "Origin country"); //TODO check if country exist
    let isHarvestSeasonOk = simpleValidate(harvestSeason, harvestSeasonError, "Harvest season");
    let isCaffeineContentOk = validateCaffeineContent();
    let isImageLinkOk = validateImageLink();

    scrollToFirstElementFailed(isNameOk, isOriginCountryOk, isHarvestSeasonOk, isCaffeineContentOk, isImageLinkOk);
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

function validateCaffeineContent() {
    if (isFieldBlank(caffeineContent)) {
        errorOnInputField(caffeineContent, caffeineContentError, "Caffeine content must be provided");
        return false;
    }

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

function containsNonNumbers(input) {
    let regexOnlyNumbers = /^[0-9.]+$/;
    return !regexOnlyNumbers.exec(input.value);
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
