import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../FlipGame.css';
import { images } from '../images/import';
import { Howl } from 'howler'
import bestsongever from '../assets/bestsongever.mp3'
function FlipGame() {

    //Manage Cards and Initial Input
    const sound = new Howl({
        src: [bestsongever],
        html5: true,
        preload: true,
    })
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

    const [highscore, setHighScore] = useState(1200)
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
        // If a disable cards is executed, that means that found a Match.
        // setMatch tracks the value of the images matched
        setMatch(match + 1)
        // Since we map the same image twice, match needs to be multiplied by 2.
        // If match equals cards.lenght, finish the game an execute setWon
        if (match * 2 === cards.length) {
            // setWon tracks the value of the Won getter, which executes a <div> on the return and stops the game. 
            setWon(true);
            setHighScore(highscore + 10)
            setTimerOn(false)
        }
    };

    // If first and Second Cards didnt match, return to original position and reset cards
    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards();
        setClicks(clicks + 1)
        setHighScore(highscore - 20)
    };

    // Set the first card and Second Card to empty objects to compare other images (return to initial input after any xyz event)
    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
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

    // setHighScore = () => {

    // }
    return (
        <>
            <h1 class="text-5xl font-bold myscores">Memorize.Me</h1>
            <div className='grid place-items-center'>
                <br />
                <br />
                {/* If the user finishes the game, execute this... */}
                {won && (
                    <div className=' grid place-items-center text-xl'>
                        <button className="bg-yellow-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"> It took you {clicks} Clicks! and {time / 1000} seconds!</button>
                        <br />
                        <button className="bg-purple-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Score: {highscore}</button>
                        <br />
                        <div className='grid grid-cols-2 gap-4 '>
                            <button className="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={resetGame}>Play Again!</button>
                            <button className="bg-pink-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onClick={resetGame}>Save Score</button>
                        </div>
                    </div>
                )}
            </div>
            <button className="btn-xs btn-error btn btn-outline " onClick={() => sound.play()}>Don't Click Me</button>
            <div className='app' >
                <div className='grid grid-cols-4 gap-2 ' onClick={() => setTimerOn(true)} >
                    <button className="border-2 border-red-600 rounded-lg px-3 py-2 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200" >Clicks: {clicks}</button>
                    <button className="border-2 border-green-600 rounded-lg px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200">Matched Pairs: {match - 1} / 6</button>
                    <button className="border-2 border-purple-600 rounded-lg px-3 py-2 text-purple-400 cursor-pointer hover:bg-purple-600 hover:text-gray-200">Time: <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span><span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span><span>{("0" + ((time / 10) % 100)).slice(-2)}</span></button>
                    <button className='border-2 border-yellow-600 rounded-lg px-3 py-2 text-yellow-400 cursor-pointer hover:bg-yellow-600 hover:text-yellow-200' onClick={resetGame}>Reset</button>
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
        </>

    );
}

export default FlipGame;