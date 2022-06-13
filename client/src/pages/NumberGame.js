// import react for use context.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { addHighscore, updateHighscore } from '../utils/Helpers';
// create a function that ranomdizes numbers to be displayed
function NumberGame() {

    const [randomNumber, setRandomNumber] = useState("");
    const [highscore, setHighscore] = useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(-1);
    const [highscoreId, setHighscoreId] = useState(0);
    const [game, setGame] = useState({});
    const params = useParams();

    const [score, totScore] = useState(0);
    
    useEffect(() => {
        const username = localStorage.getItem('username');
        // create function to tie to games route to send scores
        const getGame = async () => {
            const response = await fetch('/api/game/' + params.gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const gameData = await response.json();
            setGame(gameData);
            for (let i = 0; i < gameData.highscores.length; i++) {
                if (gameData.highscores[i].username === username) {
                    setHighscoreIndex(i);
                    setHighscore(gameData.highscores[i].score);
                    setHighscoreId(gameData.highscores[i]._id);
                }
            };
        }
        getGame();
    });

    const chooseRandomNumber = (numberLength) => {
        let number = '';
        for (let i = 0; i < numberLength; i++) {
            number = number + (Math.floor(Math.random() * 10)).toString();
        }
        setRandomNumber(number);
        return number;
    }

    // create a function to check answers
    const answer = () => {
        const number = document.getElementById('answer-input').value;
        if (number === randomNumber) {
            document.getElementById('answer-input').value = '';
            totScore(score + 1);
            chooseRandomNumber(score + 3);
            document.getElementById('submit-text').classList.add('hidden');
            document.getElementById('answer-input').classList.add('hidden');
            document.getElementById('submit-button').classList.add('hidden');
            document.getElementById('random-number-text').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('random-number-text').classList.add('hidden');
                document.getElementById('submit-text').classList.remove('hidden');
                document.getElementById('answer-input').classList.remove('hidden');
                document.getElementById('submit-button').classList.remove('hidden');
            }, 3000);
        }
        else {
            // if incoreect, game over and hide all buttons
            document.getElementById('submit-text').classList.add('hidden');
            document.getElementById('answer-input').classList.add('hidden');
            document.getElementById('submit-button').classList.add('hidden');
            // display game over stuff
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('end-score').classList.remove('hidden');
            document.getElementById('curr-highscore').classList.remove('hidden');
            document.getElementById('replay-btn').classList.remove('hidden');
            document.getElementById('add-highscore').classList.remove('hidden');
        }
    }

    // start game
    const startGame = () => {
        chooseRandomNumber(2);
        document.getElementById('start-button').classList.add('hidden');
        document.getElementById('random-number-text').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('random-number-text').classList.add('hidden');
            document.getElementById('submit-text').classList.remove('hidden');
            document.getElementById('answer-input').classList.remove('hidden');
            document.getElementById('submit-button').classList.remove('hidden');
        }, 3000)
    }

    // create a fucniton to send scores
    const sendHighscore = () => {
        if (highscoreIndex === -1) {
            addHighscore(game.title, score);
            document.getElementById('save').classList.add('modal-open');
        } else {
            updateHighscore(highscoreId, score);
            document.getElementById('save').classList.add('modal-open');
        }
    }
    // create a function to display new number after submit is clicked
    return (
        <div className="bg-base-200 min-h-screen">
            <div id="number-game" className="w-full flex justify-center">
                <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body text-center">
                        <div className="flex justify-between">
                            <h2 className="card-title text-4xl text-primary">Number Sequence:</h2>
                            <h2 className="card-title text-4xl">Score: {score}</h2>
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-accent w-1/4 mt-16" onClick={() => startGame()} id='start-button'>Start</button>
                        </div>
                        {/* game */}
                        <h6 className="text-primary text-2xl hidden mt-10" id="submit-text">Submit your answer</h6>
                        <h6 className="text-primary text-2xl hidden" id="game-over">Game Over</h6>
                        <h6 className="text-primary text-2xl hidden" id="end-score">Your score was: {score}</h6>
                        <h6 className="text-primary text-2xl hidden" id="curr-highscore">Your highscore is: {highscore}</h6>
                        <p className="random text-3xl text-accent hidden mt-16" id='random-number-text'>{randomNumber}</p>
                        <input type="text" placeholder="Type answer here" class="input input-bordered input-primary w-1/3 mx-auto hidden mt-10" id='answer-input'/>
                        <div className="flex justify-center">
                            <button className="btn btn-primary w-1/3 hidden" type="submit" onClick={() => answer()} id='submit-button'>Submit answer</button>
                        </div>
                        {/* end of game */}
                        <div className="flex justify-around">
                            <button className="btn btn-secondary w-1/3 hidden" id="add-highscore" onClick={() => sendHighscore()}>Save Highscore</button>
                            <Link className="btn btn-primary w-1/3 hidden" id="replay-btn" to={'/game/' + game._id}>Play Again</Link>
                        </div>
                    </div>
                </div>
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

