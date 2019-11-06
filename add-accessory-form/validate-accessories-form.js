function validateFormOnSubmit(form) {
    validateName(form.name);
    validatePriceRange(form.priceFrom, form.priceTo);

    return false;
}

function validateName(name) { //TODO name can't contain special signs
    validateIsInputFilled(name, 'name-error', "Name")
}

function validateIsInputFilled(input, errorId, fieldName){
    if (input.value.length === 0) {
        errorOnBlankInput(input, errorId, fieldName + " must be filled in.");
        return 'error'
    } else {
        successValidation(input, errorId);
        return 'success'
    }
}

function errorOnBlankInput(input, errorId, errorMsg){
    input.style.borderColor = '#bb0018';
    document.getElementById(errorId).innerHTML = errorMsg;
    input.placeholder = '';
}

function successValidation(input, errorId){
    input.style.borderColor = '#b4b2b4';
    document.getElementById(errorId).innerHTML = '';
}


function validatePriceRange(formPriceFrom, formPriceTo) { //TODO price must be a number
    let error = "";
    let priceFrom = parseFloat(formPriceFrom.value);
    let priceTo = parseFloat(formPriceTo.value);
    let errorColor = '#bb0018';
    let errorFromId = 'price-from-error';
    let errorToId = 'price-to-error';


    let priceFromBlank = validateIsInputFilled(formPriceFrom, errorFromId, 'Price from');
    let priceToBlank = validateIsInputFilled(formPriceTo, errorToId, 'Price to');

    if(priceFromBlank === 'error' || priceToBlank === 'error'){
        return error;
    }

    console.log(priceFrom);
    console.log(priceTo);
    if (priceFrom < 0) {
        console.log(priceFrom + ' smaller than 0');
        formPriceFrom.style.borderColor = errorColor;
        document.getElementById(errorFromId).innerHTML = "Price from can't be smaller than 0";
    }
    else if (priceTo < 0) {
        console.log(priceTo + ' smaller than 0');
        formPriceTo.style.borderColor = errorColor;
        document.getElementById(errorToId).innerHTML = "Price to can't be smaller than 0";
    }
    else if (priceFrom > priceTo) {
        console.log(priceFrom + 'is bigger than ' + priceTo);
        formPriceFrom.style.borderColor = errorColor;
        formPriceTo.style.borderColor = errorColor;
        document.getElementById(errorToId).innerHTML = "Price from can't be smaller than price to";
    }
    else {
        console.log('everything ok with prices');
        successValidation(formPriceFrom, errorFromId);
        successValidation(formPriceTo, errorToId);
    }
    return error;
}