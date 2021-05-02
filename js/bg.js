const BG_API_KEY = "9jQI40Y9lotYuplobFjWPhcXfae6T2ar_T-eciVtH3o";
const body = document.querySelector("body"),
      bgDesc = document.querySelector(".js-bgDesc");

function getImg(num1, num2) {
    fetch(`https://api.unsplash.com/photos/random?client_id=${BG_API_KEY}&orientation=landscape`).then(function(response) {
        return response.json();
    }).then(function(json) {
        paintImage(json.urls.raw);
        if (json.location.title !== null) {
            bgDesc.innerText = "⛯ " + json.location.title;
        }
    });
}

function handleImgLoad(event) {
    //event.target.classList.add("bgImage");
    //body.prepend(event.target);
}

function paintImage(imgUrl) {
    body.style.backgroundImage = `url(${imgUrl})`;
    body.classList.add("bgImg");
    
    // const width = window.innerWidth;

    // const image = new Image();
    // image.src = imgUrl + `w=${width}&dpr=2`;
    // image.addEventListener("load", handleImgLoad);
}

function getRandom(max) {
    const number = Math.floor(Math.random() * max) + 1;
    return number;
}

function handleChangeWindow() {
    const width = window.innerWidth;
}

function init() {
    const randNum1 = getRandom(100);
    const randNum2 = getRandom(10) - 1;
    getImg(randNum1, randNum2);
    //paintImage(randomNumber);
    window.addEventListener("resize", handleChangeWindow);
}

init();