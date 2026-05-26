function startGame() {
document.getElementById("game").style.display = "block";
document.getElementById("playBtn").style.display = "none";
setTimeout(checkAnswer20000);

}


function checkAnswer() {
let answer1 = document.getElementById("box1").value;
let answer2 = document.getElementById("box2").value;
let answer3 = document.getElementById("box3").value;
let answer4 = document.getElementById("box4").value;



     if (answer1 == 7  && answer2 == 12 && answer3 == 15 && answer4 == 21) {
document.getElementById("Result").innerHTML = "Correct";
document.getElementById("box1").style.color = "green";
document.getElementById("box2").style.color = "green";
document.getElementById("box3").style.color = "green";
document.getElementById("box4").style.color = "green";
}

else {
document.getElementById("Result").innerHTML = "Incorrect";
document.getElementById("box1").style.color = "red";
document.getElementById("box2").style.color = "red";
document.getElementById("box3").style.color = "red";
document.getElementById("box4").style.color = "red";
}


}
