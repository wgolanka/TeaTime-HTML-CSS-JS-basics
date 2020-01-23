const name = document.getElementById('name');
const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');
const description = document.getElementById('description');
const imageLink = document.getElementById('image-link');

const nameError = 'name-error';
const priceFromError = 'price-from-error';
const priceToError = 'price-to-error';
const descError = 'desc-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

$(document).ready(function () {
    console.log("ready - edit accessory from screen");

    window.onload = function () {

        let queryString = getPathParamsArray();

        let accessoryId = "id-fromurl";
        if (queryString["id"] != null) {
            accessoryId = queryString["id"];
        }

        const url = "http://localhost:8080/teatime/accessory/" + accessoryId;

        console.log("details final url: " + url);
        $.get(url, function (data) {

            const name = document.getElementById("name");
            name.value = data.name;

            const isNecessary = document.getElementById("is-necessary");
            isNecessary.value = data.isNecessary;

            const priceFrom = document.getElementById("price-from");
            priceFrom.value = data.priceFrom;

            const priceTo = document.getElementById("price-to");
            priceTo.value = data.priceTo;

            const description = document.getElementById("description");
            description.value = data.description;

            const teaImage = document.getElementById("image-link");
            teaImage.value = data.imageLink;

            const editAccessoryDiv = document.getElementById("edit-accessory-div");
            editAccessoryDiv.setAttribute("accessoryId", data.id)
        });
    };

});

let errorCount = 0;

//TODO add validtion

$('form').submit(function(e){
    e.preventDefault();
    const editAccessoryDiv = document.getElementById("edit-accessory-div");
    let data = $( "#edit-accessory-form" ).serialize();
    data = data + "&id=" + encodeURIComponent(editAccessoryDiv.getAttribute("accessoryId"));
    console.log("data: " + data);

    $.ajax({
        url: 'http://127.0.0.1:8080/teatime/accessory/update',
        type: 'PUT',
        data: data,
        success: function(data) {
            alert('Accessory updated!');
        }
    });
});

// function validateForm() {
//     validateAccessory();
//     if (!errorCount) {
//         alert("Submitted successfully!")
//     }
//     return !errorCount;
// }

function validateAccessory() {
    errorCount = 0;
    let isNameOk = validateName();
    let isPriceFromOk = validatePrice(priceFrom, priceFromError, "Price from");
    let isPriceToOk = validatePrice(priceTo, priceToError, "Price to");
    let isPriceRangeOk = false;
    if (isPriceFromOk && isPriceToOk) {
        isPriceRangeOk = validatePriceRange();
    }
    let isDescOk = validateDescription();
    let isImageLinkOk = validateImageLink();

    scrollToFirstElementFailed(isNameOk, isPriceFromOk, isPriceToOk, isPriceRangeOk, isDescOk, isImageLinkOk);
    showErrorSummary();
}

function validateName() {
    if (isFieldBlank(name)) {
        errorOnInputField(name, nameError, "Name" + blankFieldErrorMsg);
        return false;
    }
    else if (containsSpecialCharacters(name)) {
        errorOnInputField(name, nameError, "Name " + specialCharactersErrorMsg);
        return false;
    }
    else {
        successValidation(name, nameError);
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

function validatePrice(input, errorId, name) {
    let parsedPrice = parseFloat(input.value);
    if (isFieldBlank(input)) {
        errorOnInputField(input, errorId, name + blankFieldErrorMsg);
        return false;
    } else if (parsedPrice < 0) {
        errorOnInputField(input, errorId, name + " can't be smaller than 0");
        return false;
    } else if (containsNonNumbers(input)) {
        errorOnInputField(input, errorId, name + " must be a number");
        return false;
    }
    else {
        successValidation(input, errorId);
        return true;
    }
}

function containsNonNumbers(input) {
    let regexOnlyNumbers = /^[0-9.]+$/;
    return !regexOnlyNumbers.exec(input.value);
}

function validatePriceRange() {
    let parsedPriceFrom = parseFloat(priceFrom.value);
    let parsedPriceTo = parseFloat(priceTo.value);

    if (parsedPriceFrom > parsedPriceTo) {
        errorOnInputField(priceFrom, priceFromError, '');
        errorOnInputField(priceTo, priceToError, "Price from can't be bigger than price to");
        return false;
    } else {
        successValidation(priceFrom, priceFromError);
        successValidation(priceTo, priceToError);
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

function scrollToFirstElementFailed(isNameOk, isPriceFromOk, isPriceToOk, isPriceRangeOk, isDescOk, isImageLinkOk) {
    if (!isNameOk) {
        name.scrollIntoView()
    } else if (!isPriceFromOk) {
        priceFrom.scrollIntoView()
    } else if (!isPriceToOk) {
        priceTo.scrollIntoView()
    } else if (!isPriceRangeOk) {
        priceFrom.scrollIntoView()
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
