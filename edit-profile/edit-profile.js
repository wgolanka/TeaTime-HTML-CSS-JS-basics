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
            username.value = data.nickname;

            const description = document.getElementById("description");
            description.value = data.description;

            const avatar = document.getElementById("image-link");
            avatar.value = data.avatar;

            const editProfileDiv = document.getElementById("edit-profile-div");
            editProfileDiv.setAttribute("userId", data.id)
        });
    };

});

//TODO add validation

$('form').submit(function(e){
    e.preventDefault();
    const editProfileDiv = document.getElementById("edit-profile-div");
    let data = $( "#form-edit-profile" ).serialize();
    data = data + "&id=" + encodeURIComponent(editProfileDiv.getAttribute("userId"));
    console.log("data us edit: " + data);

    $.ajax({
        url: 'http://127.0.0.1:8080/teatime/user/update',
        type: 'PUT',
        data: data,
        success: function(data) {
            alert('Profile data updated!');
        },
        error: function () {
            alert("Something went wrong, try again soon!")
        }
    });
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