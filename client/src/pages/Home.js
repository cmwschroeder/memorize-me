import React, { useEffect, useState } from 'react';

function Home() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const getGames = async () => {
            const response = await fetch('/api/game', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const gameList = await response.json();
            setGames(gameList);
        };
        getGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (games.length === 0) {
        return (
            <p>This is the homepage</p>
        )
    }
    else {
        return (
            <div className="min-h-screen w-full bg-base-200 ">
                <div className="w-5/6 mx-auto flex flex-row flex-wrap justify-around">
                    {games.map((game) => {
                        return (
                            <div className="card bg-base-100 shadow-xl w-2/5 m-5">
                                <figure className="h-96"><img src={"./preview-images/" + game.image} alt="Game Preview" /></figure>
                                <div className="card-body w-full">
                                    <h2 className="card-title">{game.title}</h2>
                                    <p>{game.description}</p>
                                    <div className="card-actions justify-end mt-8">
                                        <a href={'/game/' + (game._id)} className="btn btn-primary w-1/2">Play</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default Home; 