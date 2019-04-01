var videoGames = ["God of War", "Shadow of Mordor", "The Last of Us", "Assassin's Creed", "Resident Evil 5"];
var buttonField = document.querySelector("#button-display");
var submit = document.getElementById("submit");

const buttonCreation = () => {
    buttonField.innerHTML = "";
    for (let videoGame of videoGames) {
        var btn = document.createElement("button");
        btn.classList.add("game");
        btn.setAttribute("data-name", videoGame);
        btn.innerText = videoGame.trim();
        buttonField.appendChild(btn);
    }
}

const addGame = () => {
    event.preventDefault();
    var game = document.getElementById("entryField").value;
    if (game !== "") {
        videoGames.push(game);
        document.querySelector("form").reset();
        buttonCreation();
    }
}

var getGifs = function (event) {
    var game = event.target.dataset.name.replace(" ", "+");
    var APIKey = "cAIArwQuYBrwxNH9AltwAv79OKwGKzQg";
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${game}&limit=10`;

    if (event.target.tagName === "BUTTON") {
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    console.log(response);
                    var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        var gameDiv = document.createElement("div");
                        gameDiv.classList.add("gif");
                        var p = document.createElement("p");
                        p.innerText = `Rating: ${results[i].rating.toUpperCase()}`;
                        var gameImage = document.createElement("img");
                        gameImage.setAttribute("src", results[i].images.fixed_height.url);
                        gameDiv.appendChild(p);
                        gameDiv.appendChild(gameImage);
                        document.querySelector("#image-display").prepend(gameDiv);
                        // ==================================
                    }

                })
        } else {

        }
    }
}


submit.addEventListener("click", addGame);
buttonField.addEventListener("click", getGifs);
buttonCreation();