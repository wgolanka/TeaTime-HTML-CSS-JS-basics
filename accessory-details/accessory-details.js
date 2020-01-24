$(document).ready(function () {
    console.log("ready - accessory details screen");

    window.onload = function () {

        let queryString = getPathParamsArray();

        let accessoryId = "id-fromurl";
        if (queryString["id"] != null) {
            accessoryId = queryString["id"];
        }

        const url = "http://localhost:8080/teatime/accessory/" + accessoryId;

        console.log("accessory details final url: " + url);
        $.get(url, function (data) {
            console.log("accessory details in get request ");

            const name = document.getElementById("name");
            name.innerText = data.name;

            const isNecessary = document.getElementById("is-necessary");
            isNecessary.innerText = data.necessary;

            const priceFrom = document.getElementById("price-from");
            priceFrom.innerText = data.priceFrom;

            const priceTo = document.getElementById("price-to");
            priceTo.innerText = data.priceTo;

            const description = document.getElementById("description");
            description.innerText = data.description;

            const accessoryImg = document.getElementById("image-link");
            accessoryImg.src = data.imageLink;
            accessoryImg.style = "width:80%";

            const editAccessory = document.getElementById("edit-accessory-butt");
            editAccessory.onclick = function () {
                let url = "../edit-accessory-form/edit-accessory-form.html" + "?id=" + encodeURIComponent(data.id);
                location.href = url;
                console.log("on click button edit access details url: " + url)
            };

            const idParam = "?id=" + encodeURIComponent(data.id);
            let urlDelete = "http://127.0.0.1:8080/teatime/accessory/delete" + idParam;

            console.log(urlDelete);

            const deleteTeaButton = document.getElementById("delete-accessory-button");
            deleteTeaButton.onclick = function () {
                let url = "../homepage/homepage.html";

                $.ajax({
                    url: urlDelete,
                    type: 'DELETE',
                    timeout: 5000,
                    success: function () {
                        alert('Accessory deleted successfully!');
                        location.href = url;
                    },
                    error: function () {
                        alert('Something went wrong :( Please try again later!');
                    }
                });
                console.log("on click button delete tea button redirect to url: " + url)
            };
        });

        let byAccessoryUrl = "http://localhost:8080/teatime/tea/byAccessory/" + accessoryId;
        $.get(byAccessoryUrl, function (data) {


            if(data.length === 0) {
                console.log("no accessories in this tea")
                return
            }

            console.log("Data Loaded: " + data[0].id);

            const list = document.getElementById("accessory-teas-ul");

            const fragment = document.createDocumentFragment();

            for (let i = 0; i < data.length; i++) {

                let liCard = document.createElement("li");
                liCard.className = "tiles-item";

                let divCard = document.createElement("div");
                divCard.className = "card";

                let cardTitle = document.createElement("p");
                cardTitle.className = "card-title";
                cardTitle.innerText = data[i].name;

                let img = document.createElement("img");
                img.className = "tiles-img";
                img.src = data[i].imageLink;
                img.style = "width:25%";

                let divCardTextContainer = document.createElement("div");
                divCardTextContainer.className = "card-text-container";

                let originCountry = document.createElement("p");
                originCountry.innerText = "Origin country: " + data[i].originCountry;

                let caffeineContent = document.createElement("p");
                caffeineContent.innerText = "Caffeine content: " + data[i].caffeineContent;

                let harvestSeasons = document.createElement("p");
                harvestSeasons.innerText = "Harvest Seasons: " + data[i].harvestSeasons;

                divCardTextContainer.appendChild(originCountry);
                divCardTextContainer.appendChild(caffeineContent);
                divCardTextContainer.appendChild(harvestSeasons);
                divCard.appendChild(cardTitle);
                divCard.appendChild(img);
                divCard.appendChild(divCardTextContainer);
                divCard.id = data[i].id;

                divCard.onclick = function () {
                    let url = "../tea-details/tea-details.html" + "?id=" + encodeURIComponent(divCard.id);
                    location.href = url;
                    console.log("on click button tea details url: " + url)
                };

                liCard.appendChild(divCard);
                fragment.appendChild(liCard);
            }

            list.appendChild(fragment);
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