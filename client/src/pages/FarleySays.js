import "../FarleySays.css";
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FarleyCard from "../components/FarleyCard";
import { addHighscore, updateHighscore } from '../utils/Helpers';
import gameover from '../assets/sound-game/cat-meowing.mp3';


import { Howl } from 'howler'
import correct from '../assets/correct.mp3'

const correctsound = new Howl({
    src: [correct],
    html5: true,
    preload: true,
})
const gameoversound = new Howl({
    src: [gameover],
    html5: true,
    preload: true,
})

function FarleySays() {

    const [highscore, setHighscore] = useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(-1);
    const [highscoreId, setHighscoreId] = useState();
    const [game, setGame] = useState({});
    const params = useParams();


    ////////////////////

    // State that define if the game is ON or OFF, Initial state "False" (OFF)
    const [isOn, setIsOn] = useState(false);

    //Array that populates the cards on the game. 
    const colorList = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9",];

    //  If the game is ON, we want to display this keys, Else If the game is OFF do not display this keys. 
    const initPlay = {
        isDisplay: false,
        cards: [],
        score: 0,
        userPlay: false,
        userCards: [],
    };
    //All the states the user needs to start playing
    const [play, setPlay] = useState(initPlay);

    // State that tracks if the Cards being selected are Flashed
    const [flashColor, setFlashColor] = useState("");

    // Initiates the Game
    function startHandle() {
        setIsOn(true);
    }


    // When the game turns ON, I want to render this Initial PLAY
    useEffect(() => {
        if (isOn) {
            setPlay({ ...initPlay, isDisplay: true });
        } else {
            //If the game is OFF, set no default value.
            setPlay(initPlay);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOn]);


    // Once the game is ON... 
    useEffect(() => {
        if (isOn && play.isDisplay) {
            // Creates a number between 0-9 that picks One position of my Array of Cards, and states it as Initial Position. 
            let newCard = colorList[Math.floor(Math.random() * 9)];
            // Copies the existing card picked, and adds it to the new Cards
            const copyCards = [...play.cards];
            copyCards.push(newCard);
            // Takes existing Cards and Adds One to it. 
            setPlay({ ...play, cards: copyCards });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOn, play.isDisplay]);


    // Once the game is ON, is Display, and there is Cards...
    useEffect(() => {
        if (isOn && play.isDisplay && play.cards.length) {
            //Triggers Display Cards 
            displayCards();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOn, play.isDisplay, play.cards.length]);

    // Promise that results after a certain Timeout 
    // Algorithm extracted from https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }


    async function displayCards() {
        await timeout(300);
        // For each Card.. 
        for (let i = 0; i < play.cards.length; i++) {
            // When the card is selected, flash it (add the class that styles it). 
            setFlashColor(play.cards[i]);
            await timeout(300);
            // After the Card is selected, unflash it (remove the class that styles it). 
            setFlashColor("");
            await timeout(300);

            // When the last card is display, at that point I want the user starts playing.
            if (i === play.cards.length - 1) {
                // Then takes all the cards that have been added and I want to Copy It
                const copyCards = [...play.cards];

                // So the user can Start Playing
                // State that prepares User Action
                setPlay({
                    ...play,
                    isDisplay: false,
                    userPlay: true,
                    // The Cards that were pick then will be reversed, so that we can use the .pop() method and compare them.
                    // .reverse() Returns a reference to the reversed array items. In our case the cards selected by the USER
                    userCards: copyCards.reverse(),
                });
            }
        }
    }



    // As soon as the User Clicks a Card, it should remove it from UserCard and flash it
    // Once all the cards are done, then I should move to the next pattern (level)
    async function cardClickHandle(cards) {

        // If the user clicks on the cards without Clicking on th START button first, don't do anything. 
        if (!play.isDisplay && play.userPlay) {
            // Store the cards that the user Picks
            const copyUserCards = [...play.userCards];
            // Once the cards are reversed, pop them to compare them. 
            // .pop() Removes the last element from an array and returns that Element
            const lastCard = copyUserCards.pop();
            setFlashColor(cards);
            correctsound.play()

            // If the card is equal to last Card that the USER Clicked...
            if (cards === lastCard) {
                // If all the cards had been selected (from the pattern)
                if (copyUserCards.length) {
                    // Destructure the play and the set the User Card to the CopyUserCard
                    setPlay({ ...play, userCards: copyUserCards });
                    // Move to the next level 
                } else {
                    await timeout(300);
                    setPlay({
                        ...play,
                        isDisplay: true,
                        userPlay: false,
                        score: play.cards.length,
                        // We want to keep adding cards
                        userCards: [],
                    });

                }
                //  Else, we failed the game
                // Keep only the score
            } else {
                await timeout(300);
                setPlay({ ...initPlay, score: play.cards.length });
                gameoversound.play()

            }
            await timeout(300);
            setFlashColor("");
        }
    }


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
    const sendHighscore = () => {
        if (highscoreIndex === -1) {
            addHighscore(game.title, play.score);
            document.getElementById('save').classList.add('modal-open');
        } else {
            updateHighscore(highscoreId, play.score);
            document.getElementById('save').classList.add('modal-open');
        }
    }

    return (

        <div>
            <h1 className="text-5xl font-bold flex justify-center m-6 myscores">Farley Says</h1>
            <div className='app'>
                <div className='grid place-items-center matchcards'>
                    {/* If there is a Game Over execute this... */}
                    {isOn && !play.isDisplay && !play.userPlay && play.score && (
                        <div className=" w-11/12 card lg:card-side bg-base-100 shadow-xl">
                            <div class="card-body items-center text-center">
                                <p className='text-3xl text-secondary p-9'>Score: <span className="text-primary">{play.score}</span></p>
                                <div className=" card-actions p-9 flex justify-around">
                                    <Link to={'/game/' + game._id}> <button className="btn btn-secondary buttonHov" id="old-btn">Play Again!</button></Link>
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
                        <p className="py-4" id="error-text">Highscore saved, your new highscore is: {play.score}</p>
                        <div className="modal-action">
                            <Link className="btn btn-accent w-1/3" to={'/game/' + game._id}>Close</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="content-center">
                        {/* If the game is NOT ON, display the START button to display the game when click */}
                        {!isOn && !play.score && (
                            <button className=" btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={startHandle} >Start</button>
                        )}
                        {/* If the game is ON, display the score of the user  */}
                        {isOn && (play.isDisplay || play.userPlay) && (
                            <button className=" btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"> Score : {play.score}</button>
                        )}
                    </div>
                    <div>
                        <div className='grid grid-cols-3 gap-1 card bg-base-100 w-3/7 shadow-xl my-6 p-3 shadow-xl '>
                            {
                                colorList &&
                                colorList.map((cards, index) => (
                                    <FarleyCard key={index}
                                        onClick={() => {
                                            cardClickHandle(cards);
                                        }}
                                        // if the flash color is equal to cards, then Flash it 
                                        flash={flashColor === cards}
                                        cards={cards}
                                    ></FarleyCard>
                                ))}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default FarleySays;