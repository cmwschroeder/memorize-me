import React, { useState, useEffect } from 'react';
import { getUser, deleteScore } from '../utils/Helpers';
import Auth from '../utils/Auth';
import { Link } from 'react-router-dom';
import { Howl } from 'howler'
import roblox from '../assets/roblox.mp3'

const deletesound = new Howl({
    src: [roblox],
    html5: true,
    preload: true,
})



function Profile() {
    const [userData, setUserData] = useState([]);
    const [games, setGames] = useState([]);
    // use this to determine if `useEffect()` hook needs to run again
    const userDataLength = Object.keys(userData).length;

    const getUserData = async () => {
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            if (!token) {
                return false;
            }

            const response = await getUser(token);

            if (!response.ok) {
                return { hasError: true };
            }

            const userScore = await response.json();
            setUserData(userScore);
        } catch (err) {
            return { hasError: true };
        }
    };
    useEffect(() => {
        getUserData();
    }, [userDataLength]);

    // useEffect(() => {
    //     const getGames = async () => {
    //         const response = await fetch('/api/game', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const gameList = await response.json();
    //         setGames(gameList);
    //     };
    //     getGames();
    //   
    // }, []);
    // console.log(games)

    const handleDeleteScore = async (_id) => {
        fetch(`/api/scores/${_id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((res) => {
                console.log(res)
                getUserData()
            })
        })
    };
    if (!userDataLength) {
        return <button class="btn btn-3xl loading">Loading</button>
    }

    console.log(userData)
    let i = 1;
    return (
        <div>
            <h1 className="text-5xl font-bold flex justify-center m-5 myscores"> My Scores &#127942;</h1>
            <h1 className="text-xl font-bold flex justify-center m-5 userTitle"><span>{userData.username}</span></h1>
            <div className="w-full flex justify-center">
                <table className="table table-zebra card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Game</th>
                            <th>Score</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            userData.highscores.map((userScore, index) => {
                                return (
                                    <tr key={index} className="hover">
                                        <th>{i++}</th>
                                        <td>{userScore.game}</td>
                                        <td>{userScore.score}</td>
                                        <td><button className="btn btn-error gamecards" onClick={() => handleDeleteScore(userScore._id) && deletesound.play()}>Delete</button></td>
                                        <td><Link className="btn btn-glass gamecards" to={'/'}>Play</Link></td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Profile; 