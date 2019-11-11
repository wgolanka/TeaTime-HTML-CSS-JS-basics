function isFieldBlank(input) {
    return !input.value.length;
}

function containsSpecialCharacters(input) {
    const regexOnlyWordsAndNumber = /^[a-zA-Z0-9. ]+$/;
    return !regexOnlyWordsAndNumber.exec(input.value);
}

function errorOnInputField(input, errorId, errorMsg = '') {
    input.style.borderColor = errorColor;
    document.getElementById(errorId).textContent = errorMsg;
    input.placeholder = '';
    console.warn(errorMsg);
    input.focus();

    return false;
}

function successValidation(input, errorId) {
    input.style.borderColor = successValidationColor;
    document.getElementById(errorId).textContent = '';
    input.blur();

    return true;
}

function showErrorSummary(errorCount) {
    if (errorCount) {
        errorSummary.textContent = errorCount === 1 ? `${errorCount} error to fix` : `${errorCount} errors to fix`;
        errorSummary.style.color = errorColor;
    } else {
        errorSummary.textContent = 'Submitted successfully!';
        errorSummary.style.color = '#49a02f';
    }
}

function getErrorCount(payload) {
    return Object.keys(payload).filter(item => !payload[item]).length;
}
