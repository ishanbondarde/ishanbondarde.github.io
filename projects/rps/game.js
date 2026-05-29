function Play(userChoice) {
let choices = ["Rock","Paper","Scissor"];

let randomIndex = Math.floor(Math.random()* 3);
 console.log(randomIndex);

let computerChoice = choices[randomIndex];

console.log(computerChoice);
let result = "";

if (userChoice === computerChoice) {
     result = "TIE!";
}

else if ( (userChoice === "Rock" && computerChoice === "Scissor") || (userChoice === "Scissor" && computerChoice === "Paper") || (userChoice === "Paper" && computerChoice === "Rock") )
        {
        result = "Player Won!!!";
        }
        
else {
result = "Computer Win!!"; 
}
   
   
 document.getElementById("Result").innerHTML = "computer Choice : " + computerChoice + "<br>" + result  ;        
        
 }       
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        











