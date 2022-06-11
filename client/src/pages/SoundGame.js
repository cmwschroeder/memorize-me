import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
//import all sounds we use
import successSound from '../assets/success-sound-effect.mp3';
import failureSound from '../assets/game-fail-sound-effect.mp3';
import dogSound from '../assets/sound-game/dog-barking.mp3';
import catSound from '../assets/sound-game/cat-meowing.mp3';
import hourseSound from '../assets/sound-game/horse-neigh.mp3';
import cowSound from '../assets/sound-game/cow-moo.mp3';
import duckSound from '../assets/sound-game/duck-quacking.mp3';
import owlSound from '../assets/sound-game/owl-hoo.mp3';
//import all images we use
import dogImage from '../assets/sound-game/dog.jpg';
import catImage from '../assets/sound-game/cat.jpg';
import horseImage from '../assets/sound-game/horse.jpg';
import cowImage from '../assets/sound-game/cow.jpg';
import duckImage from '../assets/sound-game/duck.jpg';
import owlImage from '../assets/sound-game/owl.jpg';
//import helper methods for adding and updating highscores
import { addHighscore, updateHighscore } from '../utils/Helpers';

var correctSound = new Howl({
    src: [successSound],
    html5: true,
});

var incorrectSound = new Howl({
    src: [failureSound],
    html5: true,
});

var dogBarking = new Howl({
    src: [dogSound],
    html5: true,
});

var catMeowing = new Howl({
    src: [catSound],
    html5: true,
});

var horseNeighing = new Howl({
    src: [hourseSound],
    html5: true,
});

var cowMooing = new Howl({
    src: [cowSound],
    html5: true,
});

var duckQuacking = new Howl({
    src: [duckSound],
    html5: true,
});

var owlHooing = new Howl({
    src: [owlSound],
    html5: true,
});

function SoundGame() {


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

    const makeSequence = (sequenceLength) => {
        const sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push(Math.floor(Math.random() * 6));
        }
        return sequence;
    }

    const disableButtons = () => {
        document.getElementById('dog-btn').classList.add('btn-disabled');
        document.getElementById('cat-btn').classList.add('btn-disabled');
        document.getElementById('horse-btn').classList.add('btn-disabled');
        document.getElementById('cow-btn').classList.add('btn-disabled');
        document.getElementById('duck-btn').classList.add('btn-disabled');
        document.getElementById('owl-btn').classList.add('btn-disabled');
    }

    const enableButtons = () => {
        document.getElementById('dog-btn').classList.remove('btn-disabled');
        document.getElementById('cat-btn').classList.remove('btn-disabled');
        document.getElementById('horse-btn').classList.remove('btn-disabled');
        document.getElementById('cow-btn').classList.remove('btn-disabled');
        document.getElementById('duck-btn').classList.remove('btn-disabled');
        document.getElementById('owl-btn').classList.remove('btn-disabled');
    }

    //recursive function that will play one sound, wait 3 seconds, then send the sequence without the 
    //first element in the sequence
    const playSequence = async (sequence) => {
        let sound, animalImage;
        switch (sequence[0]) {
            case 0: sound = dogBarking;
                animalImage = document.getElementById('dog-img');
                break;
            case 1: sound = catMeowing;
                animalImage = document.getElementById('cat-img');
                break;
            case 2: sound = horseNeighing;
                animalImage = document.getElementById('horse-img');
                break;
            case 3: sound = cowMooing;
                animalImage = document.getElementById('cow-img');
                break;
            case 4: sound = duckQuacking;
                animalImage = document.getElementById('duck-img');
                break;
            default: sound = owlHooing;
                animalImage = document.getElementById('owl-img');
                break;
        }
        sound.play();
        animalImage.classList.remove('opacity-40');
        setTimeout(() => {
            sequence.shift();
            animalImage.classList.add('opacity-40');
            setTimeout(() => {
                if (sequence.length !== 0) {
                    playSequence(sequence);
                }
                else {
                    enableButtons();
                }
            }, 500);
        }, 2500);
    }

    const playSound = (number) => {
        disableButtons();
        let sound, animalImage;
        switch (number) {
            case 0: sound = dogBarking;
                animalImage = document.getElementById('dog-img');
                break;
            case 1: sound = catMeowing;
                animalImage = document.getElementById('cat-img');
                break;
            case 2: sound = horseNeighing;
                animalImage = document.getElementById('horse-img');
                break;
            case 3: sound = cowMooing;
                animalImage = document.getElementById('cow-img');
                break;
            case 4: sound = duckQuacking;
                animalImage = document.getElementById('duck-img');
                break;
            default: sound = owlHooing;
                animalImage = document.getElementById('owl-img');
                break;
        }
        sound.play();
        animalImage.classList.remove('opacity-40');
        setTimeout(() => {
            animalImage.classList.add('opacity-40');
            enableButtons();
        }, 2500);
    }

    const startGame = () => {
        disableButtons();
        const currSequence = makeSequence(10);
        playSequence(currSequence);
    }

    const checkAnswer = () => {
        const currScore = score + 1;
        setScore(score + 1);
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

    return (
        <div className="bg-base-200 min-h-screen">
            <div id="login" className="w-full flex justify-center">
                <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body text-center">
                        <div className="flex justify-between">
                            <h2 className="card-title text-4xl text-primary">Sound Sequence:</h2>
                            <h2 className="card-title text-4xl">Score: {score}</h2>
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-secondary w-1/4" onClick={() => startGame()}>Start</button>
                        </div>
                        <p className="text-3xl text-secondary my-20 hidden" id="game-over">Game Over</p>
                        <p className="text-3xl text-secondary mb-10 hidden" id="end-score">Your score was: {score}</p>
                        <p className="text-3xl text-secondary mb-10 hidden" id="curr-highscore">Your current highscore is: {highscore} &#127942;</p>
                        <div className="flex flex-row flex-wrap justify-around">
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="dog-img"><img src={dogImage} alt="Dog" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(0)} id="dog-btn">Dog Sound</button>
                                </div>
                            </div>
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="cat-img"><img src={catImage} alt="Cat" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(1)} id="cat-btn">Cat Sound</button>
                                </div>
                            </div>
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="horse-img"><img className="w-fit" src={horseImage} alt="Horse" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(2)} id="horse-btn">Horse Sound</button>
                                </div>
                            </div>
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="cow-img"><img src={cowImage} alt="Cow" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(3)} id="cow-btn">Cow Sound</button>
                                </div>
                            </div>
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="duck-img"><img src={duckImage} alt="Duck" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(4)} id="duck-btn">Duck Sound</button>
                                </div>
                            </div>
                            <div className="card w-56 lg:w-96 bg-base-100 shadow-xl mt-3">
                                <figure className="h-56 opacity-40" id="owl-img"><img src={owlImage} alt="Owl" /></figure>
                                <div className="card-body">
                                    <button className="btn btn-primary w-full mt-3" onClick={() => playSound(5)} id="owl-btn">Owl Sound</button>
                                </div>
                            </div>

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