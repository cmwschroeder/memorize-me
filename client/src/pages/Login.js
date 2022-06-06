import React from 'react';

function Login() {

    //hides the log in form and shows the create account form
    const switchToCreate = () => {
        document.getElementById('login').classList.add("hidden");
        document.getElementById('createAccount').classList.remove("hidden");
    };

    const switchToLogin = () => {
        document.getElementById('createAccount').classList.add("hidden");
        document.getElementById('login').classList.remove("hidden");
    }

    return (
        <div className="bg-base-200 min-h-screen">
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
                        <div class="divider w-full">OR</div>
                        <button className="w-full btn btn-secondary" onClick={switchToCreate}>Create Account</button>
                    </div>
                </div>
            </div>

            <div id="createAccount" className="w-full hidden flex justify-center">
                <div className="card w-1/3 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body w-full">
                        <h2 className="card-title text-4xl text-primary">Create Account:</h2>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Username: </span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Username" className="input input-bordered w-full" id="create-username" />
                            </label>
                        </div>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Email: </span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Email" className="input input-bordered w-full" id="create-email" />
                            </label>
                        </div>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Password: </span>
                            </label>
                            <label className="input-group">
                                <input type="password" placeholder="Password" className="input input-bordered w-full" id="create-password" />
                            </label>
                            <p className='my-2 hidden text-error' id='incorrectEmail'>Incorrect Email Format</p>
                        </div>
                    </div>
                    <div className="w-5/6 mx-auto">
                        <button className="w-full btn btn-primary">Create Account</button>
                        <div class="divider w-full">OR</div>
                        <button className="w-full btn btn-secondary" onClick={switchToLogin}>Log in</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login; 