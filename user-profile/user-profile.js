$(document).ready(function () {
    console.log("ready - user-profile");

    const teasTilesContainer = document.querySelector('.teas-tiles-container .content');
    const accessoriesButton = document.querySelector('.accessories-button');
    const accessoriesTilesContainer = document.querySelector('.accessories-tiles-container .content');

    const spinner1 = document.getElementById('spinner1');
    const spinner2 = document.getElementById('spinner2');

    $.get("http://localhost:8080/teatime/user/current", function (data) {
        console.log("Data Loaded, user id: " + data.id);

        const email = document.getElementById("email");
        email.innerText = data.emailAddress;

        const username = document.getElementById("username");
        username.innerText = data.username;

        const description = document.getElementById("description");
        description.innerText = data.description;

        const accCreated = document.getElementById("account-created");
        accCreated.innerText = data.accountCreated;

        const avatar = document.getElementById("avatar-usr");
        avatar.src = data.avatar;

        const editProfileButton = document.getElementById("edit-profile-button");
        editProfileButton.onclick = function () {
            let url = '../edit-profile/edit-profile.html' + "?id=" + encodeURIComponent(data.id);
            location.href = url;
            console.log("on click button tea edit profile url: " + url)
        };

        const addUserButton = document.getElementById("add-user-button");
        addUserButton.onclick = function () {
            let url = '../add-user-form/add-user-form.html';
            location.href = url;
            console.log("on click button add user form url: " + url)
        };
    });

    $.get("http://localhost:8080/teatime/tea/byCurrentUser", function (data) {

        if(data.length === 0){
            alert("User has no teas added yet");
            return
        }

        console.log("Data Loaded, first tea Id: " + data[0].id);
        teasTilesContainer.classList.remove('d-none');
        spinner1.classList.add('d-none');

        const list = document.getElementById("user-teas-ul");

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

    $.get("http://localhost:8080/teatime/accessory/all", function (data) {
        console.log("User Accessories Loaded: " + data[0].id);
        accessoriesTilesContainer.classList.remove('d-none');
        spinner2.classList.add('d-none');
        const userAccessories = document.getElementById("user-accessories-ul");

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

    const deleteUserButton = document.getElementById("delete-user-button");
    deleteUserButton.onclick = function () {
        $.ajax({
            url: 'http://127.0.0.1:8080/teatime/user/current',
            type: 'DELETE',
            success: function (data) {
                alert('Account deleted!');
                let url = "../homepage/homepage.html";
                // location.href = url;
                console.log("redirect to homepage after user delete: " + url)
            },
            error: function () {
                alert("Something went wrong, try again soon!")
            }
        });
    }

});
