// import react for use context.
import React, {useEffect, useState} from "react";
// import app context
// }
//  redo code
// create a function that ranomdizes numbers to be displayed
 function NumberGame(props) {
    const [randomNumber , setRandomNumber] = useState("");
    const chooseRandomNumber = (numberLength) => {
        let number = '';
        for (let i = 0; i < numberLength; i ++){
            number = number + (Math.floor(Math.random()* 10)).toString();
        }
        setRandomNumber(number);
        return number;
    }
    // create a function to check answers
    const [score , totScore] = useState(0);
    const answer = (number) => {
        if (number === randomNumber) {
            totScore(score + 1);
        }
        else {
            // if incoreect, game over
            // hide all buttons
        }
    }
    // create a function to display new number after submit is clicked
    // useEffect for event listners
    return (
        <div>
            <h7>Submit your answer</h7> 
            <form>
                <p>{randomNumber}</p>
                <textarea placeholder="type answer here"></textarea>
                <button type="submit">Submit answer</button>
            </form>
        </div>
       
    );

}
export default NumberGame;
    // add a timer that will make the number disapper after a certain amount of time
    // add text box for answer submissom

// create a function that checks if teh answer is incorrect
    // if correct then add point and got to next number
    // if incorrect then game over
// create a timer that times the
// create a funtion that takes in the high score and add to the highscores page
    // create button to save highscore and it will go to high score page
    // create a play again button

    