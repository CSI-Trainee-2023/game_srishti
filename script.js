let gameStarted = false;
document.addEventListener("keydown", function (event) {
    if (event.key === " ") { // Check if the spacebar key is pressed
        if (!gameStarted) { // Check if the game has not started already
            startGame(); // Call your game start function
            gameStarted = true; // Set the game started flag to true
        }
    }
});
function startGame() {
    document.getElementById("start").style.display = "none";
    document.getElementById("road").style.animation = "roadAnimation 20s linear infinite";
    document.getElementById("obstacle1").style.animation = "obs1 3s linear infinite";
    document.getElementById("obstacle2").style.animation = "obs2 3.5s linear infinite";
    document.getElementById("obstacle3").style.animation = "obs3 4s linear infinite";

    let t = 30;
    let l = 1.6;

    const minTop = -40;
    const maxTop = 35;
    const minLeft = -10;
    const maxLeft = 13;

    function moveCar(x) {
        if ((x.key == "w" || x.key == "ArrowUp") && t > minTop) {
            t -= 5;
        }
        if ((x.key == "a" || x.key == "ArrowLeft") && l > minLeft) {
            l -= 2;
        }
        if ((x.key == "s" || x.key == "ArrowDown") && t < maxTop) {
            t += 5;
        }
        if ((x.key == "d" || x.key == "ArrowRight") && l < maxLeft) {
            l += 2;
        }
        document.getElementById("myCar").style.top = `${t}vh`;
        document.getElementById("myCar").style.left = `${l}vw`;
    }

    window.addEventListener("keydown", moveCar);

    setInterval(() => {
        num = Math.floor(Math.random() * (-84 + 164 + 1) - 164);
        document.getElementById("obstacle1").style.left = `${num}px`;
    }, 3000);

    setInterval(() => {
        num = Math.floor(Math.random() * (50 + 60 + 1) - 60);
        document.getElementById("obstacle2").style.left = `${num}px`;
    }, 3500);

    setInterval(() => {
        num = Math.floor(Math.random() * (164 - 85 + 1) + 85);
        document.getElementById("obstacle3").style.left = `${num}px`;
    }, 4000);

    let highScore = localStorage.getItem("highScore") || 0;
    let n = 0;

    function updateScore() {
        document.getElementById("score").innerText = `Score : ${n}`;
        n++;
        document.getElementById("highScore").innerText = `High Score : ${highScore}`;
        if (n >= highScore) {
            highScore = n - 1;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").innerText = `High Score: ${highScore}`;
        }
    }

    setInterval(updateScore, 100);

    function checkCollision() {
        var obs1Left = Math.abs(document.getElementById("obs1Img").getBoundingClientRect().left);
        var obs1Right = Math.abs(document.getElementById("obs1Img").getBoundingClientRect().right);
        var obs1Top = Math.abs(document.getElementById("obs1Img").getBoundingClientRect().top);
        var obs1Bottom = Math.abs(document.getElementById("obs1Img").getBoundingClientRect().bottom);

        var obs2Left = Math.abs(document.getElementById("obs2Img").getBoundingClientRect().left);
        var obs2Right = Math.abs(document.getElementById("obs2Img").getBoundingClientRect().right);
        var obs2Top = Math.abs(document.getElementById("obs2Img").getBoundingClientRect().top);
        var obs2Bottom = Math.abs(document.getElementById("obs2Img").getBoundingClientRect().bottom);

        var obs3Left = Math.abs(document.getElementById("obs3Img").getBoundingClientRect().left);
        var obs3Right = Math.abs(document.getElementById("obs3Img").getBoundingClientRect().right);
        var obs3Top = Math.abs(document.getElementById("obs3Img").getBoundingClientRect().top);
        var obs3Bottom = Math.abs(document.getElementById("obs3Img").getBoundingClientRect().bottom);

        var mycarLeft = Math.abs(document.getElementById("myCarImg").getBoundingClientRect().left);
        var mycarRight = Math.abs(document.getElementById("myCarImg").getBoundingClientRect().right);
        var mycarTop = Math.abs(document.getElementById("myCarImg").getBoundingClientRect().top);
        var mycarBottom = Math.abs(document.getElementById("myCarImg").getBoundingClientRect().bottom);

        if (mycarLeft < 165 || mycarRight > 1060 || mycarTop < 20 || mycarBottom > 690 ||
            ((obs1Left < mycarLeft && mycarLeft < obs1Right) || (obs1Left < mycarRight && mycarRight < obs1Right)) && ((obs1Top < mycarTop && mycarTop < obs1Bottom) || (obs1Top < mycarBottom && mycarBottom < obs1Bottom)) ||
            ((obs2Left < mycarLeft && mycarLeft < obs2Right) || (obs2Left < mycarRight && mycarRight < obs2Right)) && ((obs2Top < mycarTop && mycarTop < obs2Bottom) || (obs2Top < mycarBottom && mycarBottom < obs2Bottom)) ||
            ((obs3Left < mycarLeft && mycarLeft < obs3Right) || (obs3Left < mycarRight && mycarRight < obs3Right)) && ((obs3Top < mycarTop && mycarTop < obs3Bottom) || (obs3Top < mycarBottom && mycarBottom < obs3Bottom))
            )
 {
            setTimeout(() => {
                alert(`GAME OVER!`);
                location.reload();
            });
        }
    }

    setInterval(checkCollision, 100);
}

document.getElementById("start").addEventListener("click", startGame);