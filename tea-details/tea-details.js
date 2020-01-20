$(document).ready(function () {
    console.log("ready - details screen");

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
            name.innerText = data.name;

            const originCountry = document.getElementById("origin-country");
            originCountry.innerText = data.originCountry;

            const harvestSeasons = document.getElementById("harvest-seasons");
            harvestSeasons.innerText =  data.harvestSeasons;

            const caffeineContent = document.getElementById("caffeine-content");
            caffeineContent.innerText = data.caffeineContent + " mg";

            const teaImage = document.getElementById("tea-image");
            teaImage.src = data.imageLink;
            teaImage.style = "width:80%";
        });
    };

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