import React, { useState, useEffect } from 'react';
// Technology that subsitustes animations made on CSS; In this scneario card flipping.
import ReactCardFlip from 'react-card-flip';
// Importing the backface of the card 
import backFace from '../images/flipcards/questionmark.jpg'

// Card execute my props from Parent component to Child Component
const Card = ({ name, number, frontFace, flipCard, unflippedCards, disabledCards, }) => {
    // UseState Manage if the card is flipped or not. Initial state being false (unFlipped)
    const [isFlipped, setIsFlipped] = useState(false);
    // Check events when clicked, In this case we would like to disable the cards if they match.  
    const [hasEvent, setHasEvent] = useState(true);

    // Execute the unflipped cards and return card to original state after 700ms
    useEffect(() => {
        if (unflippedCards.includes(number)) {
            setTimeout(() => setIsFlipped(false), 700);
        }
    }, [unflippedCards])

    //  Execute the disableCards and return setHasEvent(false) to prevent the card for flipping again when matched. 
    useEffect(() => {
        if (disabledCards.includes(number)) {
            setHasEvent(false);
        }
    }, [disabledCards])

    // When Clicked on the Image, the Card is going to Execute the animation. 
    // Documentation Reference https://www.npmjs.com/package/react-card-flip.
    const handleClick = e => {
        // Call method flipCard from FlipGame
        // If the value is different from zero, flip the card; If not, return. 
        const value = flipCard(name, number);
        if (value !== 0) {
            setIsFlipped(!isFlipped);
        }
    }

    return (
        <div className='cardFlip' >
            {/* The animation itself will be controlled by the property isFlipped. Use this to control whether to show the front or the back of the card. */}
            <ReactCardFlip isFlipped={isFlipped}>
                {/* First position of the card being the backface of the image */}
                <img className='object-cover w-16 md:w-40 lg:w-44 rounded-xl' src={backFace} alt='back-face' onClick={hasEvent ? handleClick : null} />
                {/* Second position of the card (onClick) being the image to match  */}
                <img className=' object-cover w-16 md:w-40 lg:w-44 rounded-xl' src={frontFace} alt='front-face' onClick={hasEvent ? handleClick : null} />

            </ReactCardFlip>
        </div >
    )
}

export default Card