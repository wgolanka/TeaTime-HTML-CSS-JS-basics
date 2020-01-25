$(document).ready(function () {
    console.log("ready - edit tea screen");

    window.onload = function () {

        let queryString = getPathParamsArray();

        let teaId = "id-fromurl";
        if (queryString["id"] != null) {
            teaId = queryString["id"];
        }

        const url = "http://localhost:8080/teatime/tea/" + teaId;

        console.log("details final url: " + url);
        $.get(url, function (data) {

            if(data.brewingConfig != null){
                console.log("brewing config: " + data.brewingConfig);
                const brewingTime = document.getElementById("brewing-time");
                brewingTime.value = data.brewingConfig.brewingTime;

                const ingredients = document.getElementById("ingredients");
                ingredients.value = data.brewingConfig.ingredients;

                const drinkingTime = document.getElementById("drinking-time");
                drinkingTime.value = data.brewingConfig.drinkingTime;

                const description = document.getElementById("description");
                description.value = data.brewingConfig.description;
            }

            const editTeaDiv = document.getElementById("div-edit-config-tea");
            editTeaDiv.setAttribute("teaId", data.id)
        });
    };

});

//TODO add validation

$('form').submit(function(e){
    e.preventDefault();
    const editTeaConfigDiv = document.getElementById("div-edit-config-tea");
    let data = $( "#form-edit-config" ).serialize();
    data = data + "&teaId=" + encodeURIComponent(editTeaConfigDiv.getAttribute("teaId"));
    console.log("data: " + data);

    $.ajax({
        url: 'http://127.0.0.1:8080/teatime/tea/config/update',
        type: 'PUT',
        data: data,
        success: function(data) {
            alert('Tea config updated!');
        },
        error: function () {
            alert("Something went wrong:( please try again later")
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