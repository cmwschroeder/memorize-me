import React, { useEffect, useState } from 'react';

import Auth from '../utils/Auth';

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
            <button class="btn btn-3xl loading">Loading</button>
        )
    }
    else {
        return (
            <>
                <div class="hero min-h-screen bg-base-200">
                    <div class="hero-content flex-col lg:flex-row-reverse">
                        <img src="https://user-images.githubusercontent.com/99919050/172543555-0eeb4525-9c2a-47b6-abe2-4c1ddb18b2d5.png" className="max-w-sm rounded-lg shadow-2xl" alt="logo" />
                        <div>
                            <h1 class="text-5xl font-bold myscores">Memorize.Me</h1>
                            <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            {!Auth.loggedIn()
                                ? (<a class="btn btn-primary gamecards" href="/login" >Get Started</a>)
                                : (<a class="btn btn-primary gamecards" href="#game-list" >Get Started</a>)}
                        </div>
                    </div>
                </div>
                <div className="min-h-screen w-full bg-base-200 " id="game-list">
                    <div className="w-5/6 mx-auto flex flex-row flex-wrap justify-around ">
                        {games.map((game) => {
                            return (
                                <div className="card w-96 glass shadow-xl w-1/3 m-5 gamecards">
                                    <figure className="h-96"><img src={"./preview-images/" + game.image} alt="Game Preview" /></figure>
                                    <div className="card-body w-full">
                                        <h2 className="card-title">{game.title}</h2>
                                        <p>{game.description}</p>
                                        <div className="card-actions justify-end">
                                            {!Auth.loggedIn()
                                                ? (<a href='/login' className="btn btn-primary w-1/2" >Play</a>)
                                                : (<a href={'/game/' + (game._id)} className="btn btn-primary w-1/2" >Play</a>)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default Home; 