const emailAddress = document.getElementById('email');
const username = document.getElementById('username');
const description = document.getElementById('description');
const imageLink = document.getElementById('image-link');

const emailError = 'email-error';
const usernameError = 'username-error';
const descError = 'desc-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

let errorCount = 0;

$('form').submit(function (e) {
    e.preventDefault();
    let data = $("#form-edit-profile").serialize();
    console.log("data add user: " + data);

    validateUserEdit();

    if (!errorCount) {
        $.ajax({
            url: 'http://127.0.0.1:8080/teatime/user/add',
            type: 'POST',
            data: data,
            success: function (data) {
                alert('User added!');
            },
            error: function () {
                alert("Something went wrong, try again soon!")
            }
        });
    }
});

function validateUserEdit() {
    errorCount = 0;
    let isEmailOk = validateEmail();
    let isUsernameOk = validateName();
    let isDescOk = validateDescription();
    let isImageLinkOk = validateImageLink();

    scrollToFirstElementFailed(isEmailOk, isUsernameOk, isDescOk, isImageLinkOk);
    showErrorSummary();
}

function validateEmail() {
    if (isFieldBlank(emailAddress)) {
        errorOnInputField(emailAddress, emailError, "Email" + blankFieldErrorMsg);
        return false;
    }
    else if (!containsMonkey(emailAddress)) {
        errorOnInputField(emailAddress, emailError, "Email address not correct");
        return false;
    }
    else {
        successValidation(emailAddress, emailError);
        return true;
    }
}


function validateName() {
    if (isFieldBlank(username)) {
        errorOnInputField(username, usernameError, "Username" + blankFieldErrorMsg);
        return false;
    }
    else if (containsSpecialCharacters(name)) {
        errorOnInputField(username, usernameError, "Username " + specialCharactersErrorMsg);
        return false;
    }
    else {
        successValidation(username, usernameError);
        return true;
    }
}

function isFieldBlank(input) {
    return !input.value.trim().length;
}

function containsMonkey(input) {
    let regexOnlyWordsAndNumber = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexOnlyWordsAndNumber.exec(input.value);
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

function scrollToFirstElementFailed(isEmailOk, isUsernameOk, isDescOk, isImageLinkOk) {
    if (!isEmailOk) {
        emailAddress.scrollIntoView()
    } else if (!isUsernameOk) {
        username.scrollIntoView()
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
