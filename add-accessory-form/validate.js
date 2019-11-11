function validateName() {
    if (isFieldBlank(name)) {
        return errorOnInputField(name, nameError, `Name ${blankFieldErrorMsg}`);
    }

    if (containsSpecialCharacters(name)) {
        return errorOnInputField(name, nameError, `Name ${specialCharactersErrorMsg}`);
    }

    return successValidation(name, nameError);
}

function validatePrice(input, errorId, name) {
    const parsedPrice = parseFloat(input.value);

    if (isFieldBlank(input)) {
        return errorOnInputField(input, errorId, `${name} ${blankFieldErrorMsg}`);
    }

    if (parsedPrice < 0) {
        return errorOnInputField(input, errorId, `${name} can't be smaller than 0`);
    }

    if (isNaN(parsedPrice)) {
        return errorOnInputField(input, errorId, `${name} must be a number`);
    }

    return successValidation(input, errorId);
}

function validatePriceRange() {
    const parsedPriceFrom = parseFloat(priceFrom.value);
    const parsedPriceTo = parseFloat(priceTo.value);

    if (parsedPriceFrom > parsedPriceTo) {
        return errorOnInputField(priceTo, priceToError, "Price from can't be bigger than price to");
    }

    return successValidation(priceTo, priceToError);
}

function validateDescription() {
    const MAX_DESCRIPTION_LENGTH = 200;

    if (isFieldBlank(description)) {
        return errorOnInputField(description, descError, `Description ${blankFieldErrorMsg}`);
    }
    else if (description.value.length > MAX_DESCRIPTION_LENGTH) {
        return errorOnInputField(description, descError, `Description maximum length is ${MAX_DESCRIPTION_LENGTH} characters`);
    }

    return successValidation(description, descError);
}

function validateImageLink() {
    if (isFieldBlank(imageLink)) {
        return errorOnInputField(imageLink, imageLinkError, "Image link is blank!");
    }

    if (!isValidURL(imageLink)) {
        return errorOnInputField(imageLink, imageLinkError, "This is not valid url");
    }

    return successValidation(imageLink, imageLinkError);
}

function isValidURL(url) {
    return url.validity.valid;
}

function scrollToFirstElementFailed(payload) {
    const { isNameOk, isPriceFromOk, isPriceToOk, isDescOk, isImageLinkOk } = payload;

    if (!isNameOk) {
        name.scrollIntoView();
    } else if (!isPriceFromOk) {
        priceFrom.scrollIntoView();
    } else if (!isPriceToOk) {
        priceTo.scrollIntoView();
    } else if (!isDescOk) {
        description.scrollIntoView();
    } else if (!isImageLinkOk) {
        imageLink.scrollIntoView();
    }
}
