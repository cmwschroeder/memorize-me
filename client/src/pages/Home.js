import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/Auth';
import logo from '../images/logo.png'
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
            <p>Loading...</p>
        )
    }
    else {
        return (
            <>
                <div className="hero h-3/6">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={logo} className="w-2/5 md:w-3/6" alt="logo" />
                        <div>
                            <h1 className='neon-text3 text-7xl'>Memorize-ME</h1>
                            <p className="py-6 neontext2">Want to help grow your Hippocampus? Engage your Cerebrum? <br />Train and test your brain with these memory games. Each game is designed to help you increase your memory. How much can you memorize with each game? Test yourself.</p>
                            {!Auth.loggedIn()
                                ? (<Link className="btn btn-primary gamecards neon-text3" to="/login" >Get Started</Link>)
                                : (<a className="btn btn-primary gamecards neon-text3" href="#game-list" >Get Started</a>)}
                        </div>
                    </div>
                </div>
                <div className="min-h-screen w-full bg-base-200 " id="game-list">
                    <div className="w-5/6 mx-auto flex flex-row flex-wrap justify-around ">
                        {games.map((game) => {
                            return (
                                <div className="card w-96  shadow-xl w-1/3 m-5 gamecards">
                                    <figure className="h-96"><img className='rounded-lg' src={"./preview-images/" + game.image} alt="Game Preview" /></figure>
                                    <div className="card-body w-full">
                                        <h2 className="card-title neon-text2 text-error">{game.title}</h2>
                                        <p className='text-accent'>{game.description}</p>
                                        <div className="card-actions justify-end">
                                            {!Auth.loggedIn()
                                                ? (<Link to='/login' className="btn btn-primary w-1/2 neon-text3" >Play</Link>)
                                                : (<Link to={'/game/' + (game._id)} className="btn btn-primary w-1/2 neon-text3" >Play</Link>)}
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