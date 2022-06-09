import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Howl, Howler} from 'howler';
import successSound from '../assets/success-sound-effect.mp3';
import failureSound from '../assets/game-fail-sound-effect.mp3';
import { addHighscore } from '../utils/Helpers';

function OldOrNew() {

    var correctSound = new Howl({
        src: [successSound],
        html5: true,
    });

    var incorrectSound = new Howl({
        src: [failureSound],
        html5: true,
    });

    Howler.volume(0.2)

    const [score, setScore] = useState(0);
    const [currNew, setCurrNew] = useState(true);
    const [currWord, setCurrWord] = useState('');

    const [game, setGame] = useState({});

    const params = useParams();

    const [unusedWords, setUnusedWords] = useState(['Hello', 'Goodbye', 'Computer', 'Programming', 'Javascript', 'Style', 'Sheet', 'Cool', 'Easy', 'Game', 'New', 'Old', 'List', 'Make', 'More', 'Later']);
    const [usedWords, setUsedWords] = useState([]);

    useEffect(() => {
        const selectWord = Math.floor(Math.random() * unusedWords.length);
        setCurrWord(unusedWords[selectWord]);
        const getGame = async () => {
            const response = await fetch('/api/game/' + params.gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const gameData = await response.json();
            setGame(gameData);
        }
        getGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAnswer = (isNew) => {
        let currUnusedWords, currUsedWords;
        if((isNew && currNew) || (!isNew && !currNew) ) {
            setScore(score + 1);
            correctSound.play();
            if(currNew) {
                setUsedWords([ ...usedWords, currWord]);
                setUnusedWords(unusedWords.filter((word) => word === currWord ? false : true));
                currUnusedWords = unusedWords.filter((word) => word === currWord ? false : true);
                currUsedWords = [ ...usedWords, currWord];
            }
            else {
                currUnusedWords = [...unusedWords];
                currUsedWords = [...usedWords];
            }
            var selectType = Math.floor(Math.random() * 2);
            if(score > 5) {
                selectType = Math.floor(Math.random() * 2);
            }
            else {
                selectType = Math.floor(Math.random() * 3);
            }
            if(unusedWords.length !== 0) {
                if(selectType === 1 || selectType === 2) {
                    const selectWord = Math.floor(Math.random() * currUnusedWords.length);
                    setCurrNew(true);
                    setCurrWord(currUnusedWords[selectWord]);
                }
                else {
                    const selectWord = Math.floor(Math.random() * currUsedWords.length);
                    setCurrNew(false);
                    setCurrWord(currUsedWords[selectWord]);
                }
            }
            else {
                //ran out of words do something i guess idk we will figure it out later
            }
        }
        else {
            //game over
            incorrectSound.play();
            document.getElementById('currWord').classList.add('hidden');
            document.getElementById('old-btn').classList.add('hidden');
            document.getElementById('new-btn').classList.add('hidden');
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('end-score').classList.remove('hidden');
            document.getElementById('replay-btn').classList.remove('hidden');
            document.getElementById('add-highscore').classList.remove('hidden');
        }
    }

    const sendHighscore = () => {
        addHighscore(game.title, score);
    }

    const resetGame = () => {
        window.location.reload();
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <div id="login" className="w-full flex justify-center">
                <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body text-center">
                        <div className="flex justify-between">
                            <h2 className="card-title text-4xl text-primary">Old Or New:</h2>
                            <h2 className="card-title text-4xl">Score: {score}</h2>
                        </div>
                        <p className="text-3xl text-secondary my-20" id="currWord">{score + 1}: {currWord}</p>
                        <p className="text-3xl text-secondary my-20 hidden" id="game-over">Game Over</p>
                        <p className="text-3xl text-secondary mb-10 hidden" id="end-score">Your score was: {score}</p>
                        <div className="flex justify-around">
                            <button className="btn btn-secondary w-1/3" onClick={() => checkAnswer(false)} id="old-btn">Old</button>
                            <button className="btn btn-primary w-1/3" onClick={() => checkAnswer(true)} id="new-btn">New</button>
                        </div>
                        <div className="flex justify-around">
                            <button className="btn btn-secondary w-1/3 hidden" id="add-highscore" onClick={() => sendHighscore()}>Save Highscore</button>
                            <button className="btn btn-primary w-1/3 hidden" id="replay-btn" onClick={() => resetGame()}>Play Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OldOrNew;