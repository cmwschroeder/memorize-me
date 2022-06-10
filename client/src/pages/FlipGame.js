import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import '../FlipGame.css';
import { images } from '../images/import';
import { Howl } from 'howler'
import background from '../assets/background.mp3'
import wrong from '../assets/wrong.mp3'
import correct from '../assets/correct.mp3'
import gameover from '../assets/gameover.mp3'

import { addHighscore, updateHighscore } from '../utils/Helpers';

const sound = new Howl({
    src: [background],
    html5: true,
    preload: true,
})
const correctsound = new Howl({
    src: [correct],
    html5: true,
    preload: true,
})
const wrongsound = new Howl({
    src: [wrong],
    html5: true,
    preload: true,
})
const gameoversound = new Howl({
    src: [gameover],
    html5: true,
    preload: true,
})

function FlipGame() {
    //Manage Cards and Initial Input

    // For each Image, generate a Card 
    const [cards, setCards] = useState([]);

    // For the first and second card , check if both are equal or not, check if one of them has been flipped or not. 
    const [firstCard, setFirstCard] = useState({});
    const [secondCard, setSecondCard] = useState({});

    // Contain the cards that need to return to their original position since they didnt match when clicked (backface)
    const [unflippedCards, setUnflippedCards] = useState([]);

    // Contain the cards that need to be disable since they have been match to another card. 
    const [disabledCards, setDisabledCards] = useState([]);

    // Tracks the information of how many Clicks and Matches the user has made.
    const [clicks, setClicks] = useState(0);
    const [match, setMatch] = useState(1)

    // Executes a message when the user matches all the avialable images. Finish the game. 
    const [won, setWon] = useState(false);

    // Create Timer
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    const [game, setGame] = useState({});
    const params = useParams();

    const [score, setScore] = useState(1200)


    const [highscore, setHighscore] = useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(-1);
    const [highscoreId, setHighscoreId] = useState();
    // Algorithm that randomize the images position when starting Game. 
    // Randomize array in-place using Durstenfeld shuffle algorithm extracted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Allows me to execute an effect after the FlipGame.js is renderize.
    //Randomize Image position
    useEffect(() => {
        shuffleArray(images);
        setCards(images);
    }, [])

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

    //Check for a match Only if a Second Card has been clicked (or selected)
    useEffect(() => {
        checkForMatch();
    }, [secondCard]);

    // On card click (Flip)
    const flipCard = (name, number) => {
        // Make sure that the card clicked stays flipped and when clicked again returns the same card. (Event that prevent card for being flipped twice onClicked)
        if (firstCard.name === name && firstCard.number === number) {
            return 0;
        }
        // If the first card does not exist, create the first card (onClicked)
        if (!firstCard.name) {
            setFirstCard({ name, number });
        }
        // If the Second card does not exist, create the Second card (onClicked)
        else if (!secondCard.name) {
            setSecondCard({ name, number });
        }
        // This method is only returns "0" if I'm trying to click on the same card that has been flipped (onClicked) 
        return 1;
    }
    // Function that checks First and Second Card when Clicked. 
    const checkForMatch = () => {
        // Check if the First Card Clicked and Second Card Clicked Match... 
        if (firstCard.name && secondCard.name) {
            const match = firstCard.name === secondCard.name;
            // If a match exists, disable those cards; if they dont match,  flipped them to their original position. 
            match ? disableCards() : unflipCards();
        }

    }

    //Function That Resets Game
    function resetGame() {
        window.location.reload();
    }


    // Disable those cards that has been match and reset the cards
    const disableCards = () => {
        setDisabledCards([firstCard.number, secondCard.number]);
        resetCards();
        correctsound.play()
        // If a disable cards is executed, that means that found a Match.
        // setMatch tracks the value of the images matched
        setMatch(match + 1)
        setScore(score + 10)
        // Since we map the same image twice, match needs to be multiplied by 2.
        // If match equals cards.lenght, finish the game an execute setWon
        if (match * 2 === cards.length) {
            // setWon tracks the value of the Won getter, which executes a <div> on the return and stops the game. 
            setWon(true);
            setTimerOn(false)
            gameoversound.play()
            sound.stop()
        }
    };

    // If first and Second Cards didnt match, return to original position and reset cards
    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards();
        setClicks(clicks + 1)
        setScore(score - 20)
        wrongsound.play()
    };

    // Set the first card and Second Card to empty objects to compare other images (return to initial input after any xyz event)
    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
        // This functions triggers the timer
        if (match && clicks >= 0) {
            setTimerOn(true)
        }
    }
    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);

    const sendHighscore = () => {
        if (highscoreIndex === -1) {
            addHighscore(game.title, score);
            document.getElementById('save').classList.add('modal-open');
        } else {
            updateHighscore(highscoreId, score);
            document.getElementById('save').classList.add('modal-open');
        }
    }
    const closeModal = function () {
        window.location.reload();
    }
    return (
        <div>
            <h1 className="text-5xl font-bold flex justify-center m-5 myscores">Match Cards</h1>
            <div className='app'>
                <div className='grid place-items-center matchcards'>
                    {/* If the user finishes the game, execute this... */}
                    {won && (
                        <div className=" w-11/12 card lg:card-side bg-base-100 shadow-xl">
                            <div class="card-body items-center text-center">
                                <h2 class="text-3xl p-6 text-secondary">Completed on <span className="text-primary">{time / 1000}</span> seconds and <span className="text-primary">{clicks} </span>misses</h2>
                                <p className='text-3xl text-secondary p-9'>Score: <span className="text-primary">{score}</span></p>
                                <div className=" card-actions p-9 flex justify-around">
                                    <button className="btn btn-secondary buttonHov" id="old-btn" onClick={resetGame}>Play Again!</button>
                                    <button className="btn btn-primary buttonHov" id="new-btn" onClick={() => sendHighscore()}>Save Score</button>
                                </div>
                                <p className='text-1xl text-secondary p-9'>Your current highscore is: <span className="text-primary">{highscore} &#127942;</span></p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal modal-bottom sm:modal-middle" id="save">
                    <div className="modal-box">
                        <h3 className="font-bold text-3xl text-secondary">Save</h3>
                        <p className="py-4" id="error-text">Highscore saved, your new highscore is: {score}</p>
                        <div className="modal-action">
                            <label htmlFor="my-modal-6" className="btn btn-accent w-1/3" onClick={() => closeModal()}>Close</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button className=" btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-link border-2 mx-2.5 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200" >Missed: {clicks}</button>
                    <button className=" btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-link border-2 mx-2.5 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200">Matched: {match - 1} / 9</button>
                    <button className=" btn-xs sm:btn-sm md:btn-md lg:btn-lg btn btn-link border-2 mx-2.5 border-purple-600 rounded-lg px-6 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-gray-200" >Time: <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span><span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span><span>{("0" + ((time / 10) % 100)).slice(-2)}</span></button>
                    <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-link border-2 mx-2.5 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200' onClick={resetGame}>Reset</button>
                    {/* {timerOn && (
                        <button className='border-2 mx-2.5 inset-x-2.50 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200' onClick={() => sound.pause()}>Stop Music</button>
                    )} */}
                    <div className='grid grid-cols-6 gap-1 card bg-base-100 w-11/12 shadow-xl my-6 p-3 shadow-xl '>
                        {
                            // For each one of the cards getter  const [cards, setCards] = useState([]); Generate a card.
                            // Component Card acepts Props. 
                            cards.map((card, index) => (
                                <Card key={index}
                                    // Name being the card.icon, number being the positions, frontface being the specific Card to Match.
                                    // FlipCard and unFlippedCards events to generate animations. 
                                    // disableCards event to prevent card  animation onClicked when already being matched with the correct Image.
                                    // unflippedCard event contain those cards that need to return to original position if they dont match.
                                    // disableCard event avoids interacting with cards that have been match with other card.
                                    name={card.icon}
                                    number={index}
                                    frontFace={card.src}
                                    flipCard={flipCard}
                                    unflippedCards={unflippedCards}
                                    disabledCards={disabledCards}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FlipGame;