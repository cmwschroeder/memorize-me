import React from 'react';

function LoginForm({ switchForm }) {
    return (
        <div id="login" className="w-full flex justify-center">
            <div className="card w-1/3 bg-base-100 shadow-xl my-6 p-3">
                <div className="card-body w-full">
                    <h2 className="card-title text-4xl text-primary">Log in:</h2>

                    <div className="form-control w-5/6 mx-auto">
                        <label className="label">
                            <span className="label-text text-2xl text-primary">Email: </span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Email" className="input input-bordered w-full" id="email" />
                        </label>
                    </div>

                    <div className="form-control w-5/6 mx-auto">
                        <label className="label">
                            <span className="label-text text-2xl text-primary">Password: </span>
                        </label>
                        <label className="input-group">
                            <input type="password" placeholder="Password" className="input input-bordered w-full" id="password" />
                        </label>
                        <p className='my-2 hidden text-error' id='incorrectEmail'>Incorrect Email Format</p>
                    </div>
                </div>
                <div className="w-5/6 mx-auto">
                    <button className="w-full btn btn-primary">Log in</button>
                    <div className="divider w-full">OR</div>
                    <button className="w-full btn btn-secondary" onClick={() => switchForm(false)}>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;