submitButton.addEventListener('click', (event) => {
    //TODO autofocus on field when wrong, sum errors
    event.preventDefault();

    const isNameOk = validateName();
    const isPriceFromOk = validatePrice(priceFrom, priceFromError, "Price from");
    const isPriceToOk = validatePrice(priceTo, priceToError, "Price to") && validatePriceRange();
    const isDescOk = validateDescription();
    const isImageLinkOk = validateImageLink();

    const payload = { isNameOk, isPriceFromOk, isPriceToOk, isDescOk, isImageLinkOk };

    scrollToFirstElementFailed(payload);

    showErrorSummary(getErrorCount(payload));
});
