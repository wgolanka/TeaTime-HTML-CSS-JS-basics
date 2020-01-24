$(document).ready(function () {
    console.log("ready - remove accessory from tea screen");

    let selectedAccessoriesRem = [];

    let queryString = getPathParamsArray();

    let teaId = "id-fromurl";
    if (queryString["id"] != null) {
        teaId = queryString["id"];
    }

    const url = "http://localhost:8080/teatime/accessory/byTea/" + teaId;

    $.get(url, function (data) {

        if(data.length === 0){
            alert("No accessories here yet!");
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
            isNecessary.innerText = "Is necessary: " + data[i].isNecessary;

            let priceRange = document.createElement("p");
            priceRange.innerText = "Price Range: " + data[i].priceRange;

            divCardTextContainer.appendChild(description);
            divCardTextContainer.appendChild(isNecessary);
            divCardTextContainer.appendChild(priceRange);
            divCard.appendChild(cardTitle);
            divCard.appendChild(img);
            divCard.appendChild(divCardTextContainer);
            divCard.id = data[i].id;
            divCard.setAttribute("selected", "false");

            divCard.onclick = function(){
                let divId = divCard.getAttribute("id");
                if(divCard.getAttribute("selected") === "true"){
                    divCard.setAttribute("selected", "false");
                    divCard.className = "card";
                    let index = selectedAccessoriesRem.indexOf(divId);
                    selectedAccessoriesRem.splice(index, 1);
                    return
                }
                divCard.setAttribute("selected", "true");
                divCard.className = "selected-card";

                selectedAccessoriesRem.push(divId);
                console.log("selected accessories: " + selectedAccessoriesRem)

                // let url = "../accessory-details/accessory-details.html" +  "?id=" + encodeURIComponent(divCard.id);
                // location.href = url;
                // console.log("on click button accessory details url: " + url)

            };

            liCard.appendChild(divCard);
            fragment.appendChild(liCard);

            let removeSelectedButton = document.getElementById("remove-selected-button");
            removeSelectedButton.onclick = function () {

                for (let i = 0; i < selectedAccessoriesRem.length; i++) {

                    // let data = "?teaId=" + encodeURIComponent(teaId) + "&accessoryId=" + selectedAccessories[i];
                    // console.log("data: " + data);
                    let url = "http://127.0.0.1:8080/teatime/tea/accessory/remove/" + teaId + "/" + selectedAccessoriesRem[i];
                    console.log("remove acc to tea url: " + url);
                    $.ajax({
                        url: url,
                        type: 'PUT',
                        data: data,
                        success: function(data) {
                            alert('Accessory removed from tea!');
                            location.reload();
                        },
                        error: function () {
                            alert('Something went wrong:( Please try again later!');
                        }
                    });

                }
            }
        }

        userAccessories.appendChild(fragment);
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