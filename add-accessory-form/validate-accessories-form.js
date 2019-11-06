function validateFormOnSubmit(form) {
    validateName(form.name);
    validatePriceRange(form.priceFrom, form.priceTo);

    return false;
}

function validateName(name) {
    let errorId = 'name-error';

    if (name.value.length === 0) {
        errorOnBlankInput(name, errorId, "Name must be filled in.");
    } else {
        successValidation(name, errorId)
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


function validatePriceRange(formPriceFrom, formPriceTo) {
    let error = "";
    let priceFrom = parseFloat(formPriceFrom);
    let priceTo = parseFloat(formPriceTo);
    let errorColor = '#bb0018';
    let noErrorColor = '#b4b2b4';
    let errorFromId = 'price-from-error';
    let errorToId = 'price-to-error';


    if (priceFrom > priceTo) {
        formPriceFrom.style.borderColor = errorColor;
        formPriceTo.style.borderColor = errorColor;
        document.getElementById(errorToId).innerHTML = "Price from can't be smaller than price to";
        error = 2;
    }
    else if (priceFrom < 0) {
        formPriceFrom.style.borderColor = errorColor;
        document.getElementById(errorFromId).innerHTML = "Price from can't be smaller than 0";
        error = 3;
    }
    else if (priceTo < 0) {
        formPriceTo.style.borderColor = errorColor;
        document.getElementById(errorToId).innerHTML = "Price to can't be smaller than 0";
        error = 4;
    }
    else {
        priceFrom.style.borderColor = noErrorColor;
        priceTo.style.borderColor = noErrorColor;
        document.getElementById(errorFromId).innerHTML = '';
        document.getElementById(errorToId).innerHTML = '';
    }
    return error;
}