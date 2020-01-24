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

            const name = document.getElementById("name");
            name.value = data.name;

            const originCountry = document.getElementById("origin-country");
            originCountry.value = data.originCountry;

            const harvestSeasons = document.getElementById("harvest-seasons");
            harvestSeasons.value = data.harvestSeasons;

            const caffeineContent = document.getElementById("caffeine-content");
            caffeineContent.value = data.caffeineContent;

            const teaImage = document.getElementById("image-link");
            teaImage.value = data.imageLink;

            const editTeaDiv = document.getElementById("edit-tea-div");
            editTeaDiv.setAttribute("teaId", data.id)
        });
    };

});

//TODO add validation

$('form').submit(function(e){
    e.preventDefault();
    const editTeaDiv = document.getElementById("edit-tea-div");
    let data = $( "#edit-tea-form" ).serialize();
    data = data + "&id=" + encodeURIComponent(editTeaDiv.getAttribute("teaId"));
    console.log("data: " + data);

    $.ajax({
        url: 'http://127.0.0.1:8080/teatime/tea/update',
        type: 'PUT',
        data: data,
        success: function(data) {
            alert('Tea updated!');
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