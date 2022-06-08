import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GamePage() {
    const [game, setGame] = useState({});
    const params = useParams();

    useEffect(() => {
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

    const renderHighscores = () => {
        if(game.highscores.lenght !== 0) {
            return (
                <p>There are no highscores currently</p>
            )
        }
        else {
            return (
                <p>There are highscores currently</p>
            )
        }
    }

    if (!game?.title) {
        return (
            <p>Loading Game info</p>
        )
    }
    else {
        return (
            <div class="min-h-screen w-full bg-base-200">
                <div className="w-full flex flex-row flex-wrap justify-center">
                    <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                        <div className="flex flex-row justify-around">
                            <div className="w-1/3">
                                <img src={'/preview-gifs/' + game.preview} alt="Game Preview"></img>
                            </div>
                            <div className="w-1/3">
                                <h1 className="text-4xl text-primary my-10">{game.title}</h1>
                                <p className="text-xl">{game.description}</p>
                                <h2 className="text-2xl my-5 text-secondary">How to play: </h2>
                                <p className="text-xl">{game.instructions}</p>
                                <div className="w-full flex justify-center my-10">
                                    <a href={"/game/" + game.title.replace(/\s/g, '') + '/' + game._id} className="btn btn-primary w-1/2">Play</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                        <h3 className="text-4xl text-primary my-3">Highscores:</h3>
                        {renderHighscores()}
                    </div>
                </div>
            </div>
        )
    }
}

export default GamePage;

