const name = document.getElementById('name');
const priceFrom = document.getElementById('price-from');
const priceTo = document.getElementById('price-to');
const submitButton = document.getElementById('submitButton');

const nameError = 'name-error';
const priceFromError = 'price-from-error';
const priceToError = 'price-to-error';

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    validateName();
    let isSuccessValidationPriceFrom = validatePrice(priceFrom, priceFromError, "Price from");
    let isSuccessValidationPriceTo = validatePrice(priceTo, priceToError, "Price to");
    if (isSuccessValidationPriceFrom && isSuccessValidationPriceTo) {
        validatePriceRange();
    }

});

function validateName() {
    if (isFieldBlank(name)) {
        errorOnInputField(name, nameError, "Name" + blankFieldErrorMsg);
    }
    else if (containsSpecialCharacters(name)) {
        errorOnInputField(name, nameError, "Name " + specialCharactersErrorMsg)
    }
    else {
        successValidation(name, nameError)
    }
}

function containsSpecialCharacters(input) {
    let regexOnlyWordsAndNumber = /^[a-z0-9.]+$/;
    return !regexOnlyWordsAndNumber.exec(input.value);
}

function containsNonNumbers(input) {
    let regexOnlyNumbers = /^[0-9.]+$/;
    return !regexOnlyNumbers.exec(input.value);
}

function isFieldBlank(input) {
    return input.value.length === 0;
}

function errorOnInputField(input, errorId, errorMsg) {
    input.style.borderColor = errorColor;
    document.getElementById(errorId).innerHTML = errorMsg;
    input.placeholder = '';
    console.warn(errorMsg)
}

function successValidation(input, errorId) {
    input.style.borderColor = successValidationColor;
    document.getElementById(errorId).innerHTML = '';
}

function validatePrice(input, errorId, name) {
    let parsedPrice = parseFloat(input.value);
    console.log(parsedPrice);
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

function validatePriceRange() {
    let parsedPriceFrom = parseFloat(priceFrom.value);
    let parsedPriceTo = parseFloat(priceTo.value);

    if (parsedPriceFrom > parsedPriceTo) {
        priceFrom.style.borderColor = errorColor;
        priceTo.style.borderColor = errorColor;
        document.getElementById(priceToError).innerHTML = "Price from can't be bigger than price to";
    } else {
        successValidation(priceFrom, priceFromError);
        successValidation(priceTo, priceToError);
    }
}