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
            harvestSeasons.innerText = data.harvestSeasons;

            const caffeineContent = document.getElementById("caffeine-content");
            caffeineContent.innerText = data.caffeineContent + " mg";

            const teaImage = document.getElementById("tea-image");
            teaImage.src = data.imageLink;
            teaImage.style = "width:80%";

            const idParam = "?id=" + encodeURIComponent(data.id);

            const editTeaButton = document.getElementById("edit-tea-butt");
            editTeaButton.onclick = function () {
                let url = "../edit-tea-form/edit-tea-form.html" + "?id=" + encodeURIComponent(data.id);
                location.href = url;
                console.log("on click button edit tea details url: " + url)
            };

            let urlDelete =  "http://127.0.0.1:8080/teatime/tea/delete" + idParam;

            console.log(urlDelete);

            const deleteTeaButton = document.getElementById("delete-tea-button");
            deleteTeaButton.onclick = function () {
                let url = "../homepage/homepage.html";

                $.ajax({
                    url: urlDelete,
                    type: 'DELETE',
                    success: function () {
                        alert('Tea deleted successfully!');
                        location.href = url;
                    }
                });

                alert('Something went wrong :( Please try again later!');
                console.log("on click button delete tea button redirect to url: " + url)
            };
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