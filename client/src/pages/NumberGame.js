// import react for use context.
import React, {useEffect, useState} from "react";
// import app context
import App from "../App";
// create a header
export default function header(props) {
    return (
        <div> 
            <h2>Memorize the Numbers</h2>
            <button onClick={start}>Start Game</button>
        </div> 
    )
};
  
// }
//  redo code
// create a function that ranomdizes numbers to be displayed
export default function NumberGame(props) {
    const App = () => {
        const [num , setNum] = useState(0);
        function generateRandomNum (min, max){
            return Math.floor(Math.random() * (max - min +1)) + min;
        }
        useEffect(() => {
            const interval = setInterval(() => {
                setNum(generateRandomNum (0,10));
            }, 2000);
            return() => {
                clearInterval(interval);
            }
        }, [])
    }
    let {submitAnswer, typedAnswer, setTypedNum,} = value;
    // create seperate functions for increasing digits
    // 1 digit
    Math.floor(Math.random()* 10) + 1 ;
    // 2 digits
    function twoDigits () {
        var min = 10;
        var max = 100;
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    // 3 digits
    function threeDigits () {
        var min = 100;
        var max = 1000;
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    // 4 digits
    function fourDigits () {
        var min = 1000;
        var max = 10000;
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    // 5 digits
    function fiveDigits() {
        var min = 10000;
        var max = 100000;
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    // 6 digits
    function sixDigits() {
        var min = 100000;
        var max = 1000000;
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    return (
        <div>
            <h7>Submit your answer</h7> 
            <form onSubmit={submitAnswer}>
                <textarea placeholder="type answer here" onChange={(n) => setTypedNum(n.target.value)} value ={typedAnswer}></textarea>
                <button type="submit">Submit answer</button>
            </form>
        </div>
       
    );

}
    // add a timer that will make the number disapper after a certain amount of time
    // add text box for answer submissom

// create a function that checks if teh answer is incorrect
    // if correct then add point and got to next number
    // if incorrect then game over
// create a timer that times the
// create a funtion that takes in the high score and add to the highscores page
    // create button to save highscore and it will go to high score page
    // create a play again button