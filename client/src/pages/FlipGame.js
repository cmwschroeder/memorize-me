import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../FlipGame.css';
import { images } from '../images/import';

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

    // Disable those cards that has been match and reset the cards
    const disableCards = () => {
        setDisabledCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    // If first and Second Cards didnt match, return to original position and reset cards
    const unflipCards = () => {
        setUnflippedCards([firstCard.number, secondCard.number]);
        resetCards();
    };

    // Set the first card and Second Card to empty objects to compare other images (return to initial input after any xyz event)
    const resetCards = () => {
        setFirstCard({});
        setSecondCard({});
    }

    return (
        <div className='app'>
            <div className='grid grid-cols-4 gap-4' >
                {
                    // For each one of the cards getter  const [cards, setCards] = useState([]); Generate a card.
                    // Component Card acepts Props. 
                    cards.map((card, index) => (
                        <Card
                            // Name being the card.icon, number being the positions, frontface being the specific Card to Match.
                            // FlipCard and unFlippedCards events to generate animations. 
                            // disableCards event to prevent card  animation onClicked when already being matched with the correct Image.
                            // unflippedCard event that contain those cards that need to return to original position if thet dont match.
                            // disableCard event that avoids interacting with cards that have been match with other card.
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
    );
}

export default FlipGame;