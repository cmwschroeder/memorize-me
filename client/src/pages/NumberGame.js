// import react for use context.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {addHighscore, updateHighscore} from '../utils/Helpers';
// create a function that ranomdizes numbers to be displayed
function NumberGame(props) {
    const [randomNumber, setRandomNumber] = useState("");
    const chooseRandomNumber = (numberLength) => {
        let number = '';
        for (let i = 0; i < numberLength; i++) {
            number = number + (Math.floor(Math.random() * 10)).toString();
        }
        setRandomNumber(number);
        return number;
    }
    // create a function to check answers
    const [score, totScore] = useState(0);
    const answer = (number) => {
        if (number === randomNumber) {
            totScore(score + 1);
        }
        else {
            // if incoreect, game over
            document.getElementById('random').classList.add('hidden');
            document.getElementById('answer').classList.add('hidden');
            document.getElementById('btn').classList.add('hidden');
            // hide all buttons
        }
    }
  // create fucntion to tie to games route to send scores
    const [highscore, setHighscore] =useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(0);
    const [highscoreId, setHighscoreId] = useState(0);
    const [game, setGame] = useState({});
    const params = useParams();

    useEffect (() => {
        const username = localStorage.getItem('username');
    }, []);

    // create a function to display new number after submit is clicked
    // useEffect for event listners
    return (
        <div>
            <h7>Submit your answer</h7>
            <form>
                <p className="random">{randomNumber}</p>
                <textarea className="answer" placeholder="type answer here"></textarea>
                <button className="btn" type="submit" on onClick={() => chooseRandomNumber()}>Submit answer</button>
            </form>

            <div className="flex justify-around">
                <button className="btn btn-secondary w-1/3 hidden" id="add-highscore" onClick={() => sendHighscore()}>Save Highscore</button>
                <Link className="btn btn-primary w-1/3 hidden" id="replay-btn" to={'/game/' + game._id}>Play Again</Link>
            </div>
            <div className="modal modal-bottom sm:modal-middle" id="save">
                <div className="modal-box">
                    <h3 className="font-bold text-3xl text-secondary">Save</h3>
                    <p className="py-4" id="error-text">Highscore saved, your new highscore is: {score}</p>
                    <div className="modal-action">
                        <Link className="btn btn-accent w-1/3" to={'/game/' + game._id}>Close</Link>
                    </div>
                </div>
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

