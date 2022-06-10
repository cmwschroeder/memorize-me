import React, { useState, useEffect } from 'react';
import { getUser } from '../utils/Helpers';
import Auth from '../utils/Auth';


function Profile() {
    const [userData, setUserData] = useState([]);

    // use this to determine if `useEffect()` hook needs to run again
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
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

        getUserData();
    }, [userDataLength]);

    if (!userDataLength) {
        return <h2>LOADING...{userData.savedBooks}</h2>;
    }

    console.log(userData);

    return (
        <div>
            <h1 className="text-5xl font-bold flex justify-center m-5 myscores"> My Scores</h1>
            <div className="w-full flex justify-center">
                <table className="table table-zebra card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Game</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            userData.highscores.map((userData, index) => {
                                return (
                                    <tr key={index} className="hover">
                                        <th>1</th>
                                        <td>{userData.game}</td>
                                        <td>{userData.score}</td>
                                        <td><button className="btn btn-error gamecards">Delete</button></td>
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