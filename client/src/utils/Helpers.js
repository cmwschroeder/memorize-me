export const addHighscore = async (game, score)=> {
    const token = localStorage.getItem('id_token');
    const response = await fetch('/api/scores/', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({game: game, score: score})
    });
    return await response.json();
}