import React, { useState, useEffect } from 'react';
import { getUser } from '../utils/Helpers';
function Profile() {
    const [user, setUser] = useState({});
    const userDataLength = Object.keys(user).length;
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('id_token');
                if (!token) {
                    return false;
                }
                const response = await getUser(token);
                if (!response.ok) {
                    throw new Error('something went wrong!');
                }
                const user = await response.json();
                console.log(user);
                setUser(user);
            } catch (err) {
                console.log(err)
            }
        };
        getUserData();

    }, [userDataLength])

    const getHighscoreList = (sortedHighscores) => {
        let i = 1;
        return sortedHighscores.map((highscore) => {
            return (
                <tr class="hover">
                    <th>{i++}</th>
                    <td>{highscore.username}</td>
                    <td>{highscore.score}</td>
                </tr>
            )
        });
    }

    return (
        <div>
            <h1 className="text-5xl font-bold flex justify-center m-5 myscores"> My Scores</h1>
            <div className="w-full flex justify-center">
                {getHighscoreList}
                <table className="table table-zebra card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Game</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                    </thead>
                    {/* {user.map((userD) => {
                        return (
                            <h1 key={userD._id}>{userD.username}</h1>
                        )
                    })} */}

                    <tbody>
                        <tr className="hover">
                            <th>1</th>
                            <td>Matching Game</td>
                            <td>120</td>
                            <td><button className="btn btn-error gamecards">Delete</button></td>
                        </tr>
                        <tr className="hover">
                            <th>2</th>
                            <td>Old Or New</td>
                            <td>600</td>
                            <td><button className="btn btn-error gamecards">Delete</button></td>
                        </tr>
                        <tr className="hover">
                            <th>3</th>
                            <td>Game 3</td>
                            <td>800</td>
                            <td><button className="btn btn-error gamecards">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Profile; 