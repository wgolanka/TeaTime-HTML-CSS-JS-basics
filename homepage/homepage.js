$(document).ready(function () {
    console.log("ready - homepage");

    $.get("http://localhost:8080/teatime/tea/all", function (data) {
        console.log("Data Loaded: " + data[0].id);

        const list = document.getElementById("all-teas-ul");

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

});