import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import successSound from '../assets/success-sound-effect.mp3';
import failureSound from '../assets/game-fail-sound-effect.mp3';
import { addHighscore, updateHighscore } from '../utils/Helpers';

function SoundGame() {

    var correctSound = new Howl({
        src: [successSound],
        html5: true,
    });

    var incorrectSound = new Howl({
        src: [failureSound],
        html5: true,
    });

    Howler.volume(0.2);

    const [score, setScore] = useState(0);
    const params = useParams();

    const [highscore, setHighscore] = useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(-1);
    const [highscoreId, setHighscoreId] = useState();

    const [game, setGame] = useState({});

    useEffect(() => {
        const username = localStorage.getItem('username');
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAnswer = () => {
        setScore(score + 1);
        if(score % 2 === 1) {
            correctSound.play();
        }
        else {
            incorrectSound.play();
        }
    }

    const sendHighscore = () => {
        if (highscoreIndex === -1) {
            addHighscore(game.title, score);
            document.getElementById('save').classList.add('modal-open');
        } else {
            updateHighscore(highscoreId, score);
            document.getElementById('save').classList.add('modal-open');
        }
    }

    return(
        <div className="bg-base-200 min-h-screen">
        <div id="login" className="w-full flex justify-center">
            <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                <div className="card-body text-center">
                    <div className="flex justify-between">
                        <h2 className="card-title text-4xl text-primary">Old Or New:</h2>
                        <h2 className="card-title text-4xl">Score: {score}</h2>
                    </div>
                    <p className="text-3xl text-secondary my-20" id="currWord">{score + 1}: Sound</p>
                    <p className="text-3xl text-secondary my-20 hidden" id="game-over">Game Over</p>
                    <p className="text-3xl text-secondary mb-10 hidden" id="end-score">Your score was: {score}</p>
                    <p className="text-3xl text-secondary mb-10 hidden" id="curr-highscore">Your current highscore is: {highscore} &#127942;</p>
                    <div className="flex justify-around">
                        <button className="btn btn-secondary w-1/3" onClick={() => checkAnswer()} id="dog-btn">Dog</button>
                        <button className="btn btn-primary w-1/3" onClick={() => checkAnswer()} id="cat-btn">Cat</button>
                    </div>
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
    )
}

export default SoundGame;