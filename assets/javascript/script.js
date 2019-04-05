var videoGames = ["God of War", "Shadow of Mordor", "The Last of Us", "Assassin's Creed", "Resident Evil 5"];
var buttonField = document.querySelector("#button-display");
var submit = document.getElementById("submit");
var imageDisplay = document.getElementById("image-display");
var APIKey = "cAIArwQuYBrwxNH9AltwAv79OKwGKzQg";
var game;
var queryURL;
var movingGif = [];

// Creates buttons at top of page from the videoGames array
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

// When entering a new game in the form on the right of the page, that value is entered into the buttonCreation function
const addGame = () => {
    event.preventDefault();
    var game = document.getElementById("entryField").value;
    if (game !== "") {
        videoGames.push(game);
        document.querySelector("form").reset();
        buttonCreation();
    }
}

// When a button at the top of the page is clicked, this function pulls ten gifs (still image) and posts them in the field on the left of the page
var getGifs = function (event) {
    game = event.target.dataset.name.replace(" ", "+");
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=${game}&limit=10`;
    // Checks for feature
    if (event.target.tagName === "BUTTON") {
        // runs fetch for getting the gifs
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
            // If fetch is not available, this runs XHR
        } else {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", queryURL);

            xhr.onload = (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        parsed = JSON.parse(xhr.responseText);
                        var final = parsed.data;
                        imageDisplay.innerHTML = "";
                        for (var i = 0; i < final.length; i++) {
                            var gameDiv = document.createElement("div");
                            gameDiv.classList.add("gif");
                            var p = document.createElement("p");
                            p.innerText = `Rating: ${final[i].rating.toUpperCase()}`;
                            var gameImage = document.createElement("img");
                            gameImage.setAttribute("src", final[i].images.fixed_height_still.url);
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

// changes the source of the gifs from still to moving or vice versa
const toggleGif = (event) => {
    if (event.target.tagName === "IMG") {
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(result => result.json())
                .then(response => {
                    console.log(event.target.src);
                    // assigns the gif URL to the result variable
                    var result = event.target.src;
                    // looks for moving gif to toggle it back to still gif
                    if (result.indexOf("200.gif") !== -1) {
                        var toggle = result.replace("200.gif", "200_s.gif");
                        console.log(toggle);
                        event.target.src = toggle;
                        // looks for still gif to turn it back to moving gif
                    } else if (result.indexOf("200_s.gif") !== -1) {
                        var toggle = result.replace("200_s.gif", "200.gif");
                        event.target.src = toggle;
                    }
                })
        } else {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", queryURL);

            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        parsed = JSON.parse(xhr.responseText);
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

            xhr.onerror = (event) => {
                console.error(xhr.responseText);
            }
            xhr.send();
        }
    }
}

// Event listeners for the respective button clicks
submit.addEventListener("click", addGame);
buttonField.addEventListener("click", getGifs);
imageDisplay.addEventListener("click", toggleGif);
buttonCreation();

// getAttribute("src") === results.images.fixed_height.url)