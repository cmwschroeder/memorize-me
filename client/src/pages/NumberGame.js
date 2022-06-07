// import react for use context.
import React, {useContext} from "react";
// import app context
import App from "../App";
// create a header
export default function header(props) {
    return (
        <div> 
            <h2>Memorize the Numbers</h2>
        </div> 
    )
};
// set difficulty (easy, medium, hard)
    // export default function 
export default function difficulty(props){
     // cosnt use context in respect to app context
     const value = useContext(App);
    // return html code: 
    return (
        // direction tag
        <div>
            <h6>Choose a difficulty</h6>
            <li>
                <li><button onClick={() => generateRandomNum("easy")}></button></li>
                <li><button onClick={() => generateRandomNum("medium")}></button></li>
                <li><button onClick={() => generateRandomNum("difficult")}></button></li>
            </li>
        </div>
        // list of options for easy medium or hard
        // make them buttons
  
    );
  
}

// create a function that ranomdizes numbers to be displayed
export default function generateRandomNum(props) {
    const value = useContext(App);
    let {submitAnswer, typedAnswer, setTypedNum,} = value;
    Math.floor(Math.random() * 100) + 1;
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
    // if incorrect (take time from timer or keep going)
// create a timer that times the
// create a funtion that takes in the high score and add to the highscores page
