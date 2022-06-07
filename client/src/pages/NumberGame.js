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
// set difficulty (easy, medium, hard)
    // export default function 
// export default function difficulty(props){
//      // cosnt use context in respect to app context
//      const value = useContext(App);
//     // return html code: 
//     return (
//         // direction tag
//         <div>
//             <h6>Choose a difficulty</h6>
//             <li>
//                 <li><button onClick={() => generateRandomNum("easy")}></button></li>
//                 <li><button onClick={() => generateRandomNum("medium")}></button></li>
//                 <li><button onClick={() => generateRandomNum("difficult")}></button></li>
//             </li>
//         </div>
//         // list of options for easy medium or hard
//         // make them buttons
  
//     );
  
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
    Math.floor(Math.random() * 100) + 1;
    // 3 digits
    // 4 digits
    // 5 digits
    // 6 digits

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