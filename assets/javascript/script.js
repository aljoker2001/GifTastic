var videoGames = ["God of War", "Shadow of Mordor", "The Last of Us", "Assassin's Creed", "Resident Evil 5"];
var buttonField = document.querySelector("#button-display");
var submit = document.getElementById("submit");
var imageDisplay = document.getElementById("image-display");
var APIKey = "cAIArwQuYBrwxNH9AltwAv79OKwGKzQg";
var game;
var queryURL;
var movingGif = [];

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
    game = event.target.dataset.name.replace(" ", "+");
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${game}&limit=10`;

    if (event.target.tagName === "BUTTON") {
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    console.log(response);
                    var results = response.data;
                    imageDisplay.innerHTML = "";
                    for (var i = 0; i < results.length; i++) {
                        var gameDiv = document.createElement("div");
                        gameDiv.classList.add("gif");
                        var p = document.createElement("p");
                        p.innerText = `Rating: ${results[i].rating.toUpperCase()}`;
                        var gameImage = document.createElement("img");
                        gameImage.setAttribute("src", results[i].images.fixed_height_still.url);
                        movingGif.push(results[i].images.fixed_height);
                        gameDiv.appendChild(p);
                        gameDiv.appendChild(gameImage);
                        imageDisplay.prepend(gameDiv);
                    }
                })
        } else {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", queryURL);

            xhr.onload = (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        parsed = JSON.stringify(xhr.responseText);
                        imageDisplay.innerHTML = "";
                        for (var i = 0; i < parsed.length; i++) {
                            var gameDiv = document.createElement("div");
                            gameDiv.classList.add("gif");
                            var p = document.createElement("p");
                            p.innerText = `Rating: ${parsed[i].rating.toUpperCase()}`;
                            var gameImage = document.createElement("img");
                            gameImage.setAttribute("src", parsed[i].images.fixed_height.url);
                            gameDiv.appendChild(p);
                            gameDiv.appendChild(gameImage);
                            document.querySelector("#image-display").prepend(gameDiv);
                        }
                    } else {
                        console.error(xhr.responseText);
                    }
                }
            }
            xhr.onerror = (event) => {
                console.error(xhr.responseText);
            }
            xhr.send();
        }
    }
}

const toggleGif = (event) => {
    if (event.target.tagName === "IMG") {
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    console.log(event.target.src);
                    var result = event.target.src;
                    if (result.indexOf("200.gif") !== -1) {
                        var toggle = result.replace("200.gif", "200_s.gif");
                        console.log(toggle);
                        event.target.src = toggle;
                    } else if (result.indexOf("200_s.gif") !== -1) {
                        var toggle = result.replace("200_s.gif", "200.gif");
                        event.target.src = toggle;
                    }
                })
        } else {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", queryURL);

            xhr.onload = (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        parsed = JSON.stringify(xhr.responseText);
                        console.log(event.target.src);
                        var result = event.target.src;
                        if (result.indexOf("200.gif") !== -1) {
                            var toggle = result.replace("200.gif", "200_s.gif");
                            console.log(toggle);
                            event.target.src = toggle;
                        } else if (result.indexOf("200_s.gif") !== -1) {
                            var toggle = result.replace("200_s.gif", "200.gif");
                            event.target.src = toggle;
                        }
                    }
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.onerror = (event) => {
            console.error(xhr.responseText);
        }
        xhr.send();
    }
}


submit.addEventListener("click", addGame);
buttonField.addEventListener("click", getGifs);
imageDisplay.addEventListener("click", toggleGif);
buttonCreation();

// getAttribute("src") === results.images.fixed_height.url)