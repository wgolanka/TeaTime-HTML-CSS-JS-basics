$(document).ready(function () {
    console.log("ready - tea details screen");

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

            if(data.brewingConfig != null){
                console.log("brewing config: " + data.brewingConfig);
                const brewingTime = document.getElementById("brewing-time");
                brewingTime.innerText = data.brewingConfig.brewingTime;

                const ingredients = document.getElementById("ingredients");
                ingredients.innerText = data.brewingConfig.ingredients;

                const drinkingTime = document.getElementById("best-time-to-drink");
                drinkingTime.innerText = data.brewingConfig.drinkingTime;

                const description = document.getElementById("description");
                description.innerText = data.brewingConfig.description;
            }

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

            const editTeaConfigButton = document.getElementById("edit-tea-config-button");

            editTeaConfigButton.onclick = function () {
                let url = "../edit-tea-config-form/edit-tea-config-form.html" + "?id=" + encodeURIComponent(data.id);
                location.href = url;
                console.log("on click button edit tea config details url: " + url)
            };

            let urlDelete = "http://127.0.0.1:8080/teatime/tea/delete" + idParam;

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
                    },
                    error: function () {
                        alert('Something went wrong :( Please try again later!');
                    }
                });
                console.log("on click button delete tea button redirect to url: " + url)
            };

            const addAccessoryButton = document.getElementById("add-acc-to-tea-button");
            addAccessoryButton.onclick = function () {
                let url = "../add-accessory-to-tea/add-accessory-to-tea.html" + "?id=" + encodeURIComponent(data.id);
                location.href = url;
                console.log("on click button add accessories button redirect to url: " + url)
            };

            const removeAccessoryButton = document.getElementById("remove-acc-from-tea-button");
            removeAccessoryButton.onclick = function () {
                let url = "../remove-accessory-from-tea/remove-accessory-from-tea.html" + "?id=" + encodeURIComponent(data.id);
                location.href = url;
                console.log("on click button remove accessories button redirect to url: " + url)
            };

        });

        let getTeaAccessoriesUrl = "http://localhost:8080/teatime/accessory/byTea/" + teaId;

        $.get(getTeaAccessoriesUrl, function (data) {

            if (data.length === 0) {
                console.log("no accessories for this tea"); //TODO say it on site
                return
            }
            console.log("User Accessories Loaded: " + data[0].id);

            const userAccessories = document.getElementById("tea-accessories-ul");

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

                let description = document.createElement("p");
                description.innerText = "Description: " + data[i].description;

                let isNecessary = document.createElement("p");
                if (data[i].necessary === undefined) {
                    isNecessary.innerText = "Is necessary: false";
                } else {
                    isNecessary.innerText = "Is necessary: " + data[i].necessary;
                }

                let priceRange = document.createElement("p");
                priceRange.innerText = "Price Range: " + data[i].priceRange;

                divCardTextContainer.appendChild(description);
                divCardTextContainer.appendChild(isNecessary);
                divCardTextContainer.appendChild(priceRange);
                divCard.appendChild(cardTitle);
                divCard.appendChild(img);
                divCard.appendChild(divCardTextContainer);
                divCard.id = data[i].id;

                divCard.onclick = function () {
                    let url = "../accessory-details/accessory-details.html" + "?id=" + encodeURIComponent(divCard.id);
                    location.href = url;
                    console.log("on click button accessory details url: " + url)
                };

                liCard.appendChild(divCard);
                fragment.appendChild(liCard);
            }

            userAccessories.appendChild(fragment);
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