import React, { useState, useEffect } from 'react';

function Profile() {
    return (
        <>
            <h1 class="text-5xl font-bold flex justify-center m-5 myscores"> My Scores</h1>
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
                        <tr class="hover">
                            <th>1</th>
                            <td>Match Cards</td>
                            <td>120</td>
                            <td><button class="btn btn-error gamecards">Delete</button></td>
                        </tr>
                        <tr class="hover">
                            <th>2</th>
                            <td>Old Or New</td>
                            <td>600</td>
                            <td><button class="btn btn-error gamecards">Delete</button></td>
                        </tr>
                        <tr class="hover">
                            <th>3</th>
                            <td>Game 3</td>
                            <td>800</td>
                            <td><button class="btn btn-error gamecards">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Profile; 