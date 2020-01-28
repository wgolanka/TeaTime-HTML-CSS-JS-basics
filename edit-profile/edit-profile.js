const username = document.getElementById('username');
const description = document.getElementById('description');
const imageLink = document.getElementById('image-link');

const usernameError = 'username-error';
const descError = 'desc-error';
const imageLinkError = "image-link-error";

const errorColor = '#bb0018';
const successValidationColor = '#b4b2b4';

const blankFieldErrorMsg = " must be filled in";
const specialCharactersErrorMsg = " can't contain special characters";

$(document).ready(function () {
    console.log("ready - edit profile screen");

    window.onload = function () {

        let queryString = getPathParamsArray();

        let userId = "id-fromurl";
        if (queryString["id"] != null) {
            userId = queryString["id"];
        }

        const url = "http://localhost:8080/teatime/user/" + userId;

        console.log("details final url: " + url);
        $.get(url, function (data) {

            const username = document.getElementById("username");
            username.value = data.username;

            const description = document.getElementById("description");
            description.value = data.description;

            const avatar = document.getElementById("image-link");
            avatar.value = data.avatar;

            const editProfileDiv = document.getElementById("edit-profile-div");
            editProfileDiv.setAttribute("userId", data.id)
        });
    };

});

let errorCount = 0;

$('form').submit(function (e) {
    e.preventDefault();
    const editProfileDiv = document.getElementById("edit-profile-div");
    let data = $("#form-edit-profile").serialize();
    data = data + "&id=" + encodeURIComponent(editProfileDiv.getAttribute("userId"));
    console.log("data us edit: " + data);

    validateUserEdit();

    if (!errorCount) {
        $.ajax({
            url: 'http://127.0.0.1:8080/teatime/user/update',
            type: 'PUT',
            data: data,
            success: function (data) {
                alert('Profile data updated!');
            },
            error: function () {
                alert("Something went wrong, try again soon!")
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


function validateUserEdit() {
    errorCount = 0;
    let isUsernameOk = validateName();
    let isDescOk = validateDescription();
    let isImageLinkOk = validateImageLink();

    scrollToFirstElementFailed(isUsernameOk, isDescOk, isImageLinkOk);
    showErrorSummary();
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

function scrollToFirstElementFailed(isUsernameOk, isDescOk, isImageLinkOk) {
    if (!isUsernameOk) {
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
