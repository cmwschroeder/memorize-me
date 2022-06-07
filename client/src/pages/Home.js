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

    if(games.length === 0) {
        return (
            <p>This is the homepage</p>
        )
    }
    else {
        return (
            <p>This isn't the homepage</p>
        )
    }
}

export default Home; 