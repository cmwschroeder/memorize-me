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
    return (
        <div>
            <h7>Submit your answer</h7> 
            <form>
                <textarea placeholder="type answer here"></textarea>
                <button type="submit">Submit answer</button>
            </form>
            <div>
                <p>{randomNumber}</p>
            </div>
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

        // // create seperate functions for increasing digits
    // // 1 digit
    // Math.floor(Math.random()* 10) + 1 ;
    // // 2 digits
    // function twoDigits () {
    //     var min = 10;
    //     var max = 100;
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }
    // // 3 digits
    // function threeDigits () {
    //     var min = 100;
    //     var max = 1000;
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }
    // // 4 digits
    // function fourDigits () {
    //     var min = 1000;
    //     var max = 10000;
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }
    // // 5 digits
    // function fiveDigits() {
    //     var min = 10000;
    //     var max = 100000;
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }
    // // 6 digits
    // function sixDigits() {
    //     var min = 100000;
    //     var max = 1000000;
    //     return Math.floor(Math.random() * (max - min) ) + min;
    // }
    