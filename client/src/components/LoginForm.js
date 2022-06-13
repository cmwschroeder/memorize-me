import React, { useState } from 'react';

function LoginForm({ switchForm }) {

    //this text will be the text we show in our error modal for any wrong inputs
    const [modalText, setModalText] = useState("");

    //sets some css to let user know that email should not be blank
    const checkEmptyEmail = function (e) {
        if (e.target.value === '') {
            e.target.setAttribute('placeholder', 'Email cannot be blank');
            e.target.classList.add('input-error');
        }
    }

    //sets some css to let user know that password should not be blank
    const checkEmptyPassword = function (e) {
        if (e.target.value === '') {
            e.target.setAttribute('placeholder', 'Password cannot be blank');
            e.target.classList.add('input-error');
        }
    }

    //sets style for email input so that it isn't shown as an error when we are focused on it
    const setPlaceholderEmail = function (e) {
        e.target.setAttribute('placeholder', 'Email');
        e.target.classList.remove('input-error');
    }

    //sets style for password input so that it isn't shown as an error when we are focused on it
    const setPlaceholderPassword = function (e) {
        e.target.setAttribute('placeholder', 'Password');
        e.target.classList.remove('input-error');
    }

    //uses an email regex to compare our current email input to let user know that the email isn't in the correct form
    //or that it is in the correct form
    const checkValidEmail = function (e) {
        var emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        //if the email is in the correct form then we shouldn't tell the user that it isn't
        if (e.target.value.match(emailRegex)) {
            if (!document.getElementById('incorrectEmail').classList.contains('hidden')) {
                document.getElementById('incorrectEmail').classList.add('hidden');
            };
        } else {
            if (document.getElementById('incorrectEmail').classList.contains('hidden')) {
                document.getElementById('incorrectEmail').classList.remove('hidden');
            };
        }
    }

    //lets the user know that the password input must be at least 8 characters if it isn't
    const checkValidPassword = function (e) {
        if (e.target.value.length >= 8) {
            if (!document.getElementById('incorrectPassword').classList.contains('hidden')) {
                document.getElementById('incorrectPassword').classList.add('hidden');
            };
        } else {
            if (document.getElementById('incorrectPassword').classList.contains('hidden')) {
                document.getElementById('incorrectPassword').classList.remove('hidden');
            };
        }
    }

    //this function will run on submit, takes in input and makes sure they are correct, sends them to server in a fetch request
    //gets back a token if the user was able to log in and saves to local storage
    //or if the user wasn't logged in then we will tell the user
    const handleFormSubmit = async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        var emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (email && password) {
            if (!email.match(emailRegex)) {
                setModalText("Email is not in the form of an email");
                document.getElementById('error').classList.add('modal-open');
            }
            else if (password.length < 8) {
                setModalText("Password must be at least 8 characters long");
                document.getElementById('error').classList.add('modal-open');
            }
            else {
                try {
                    const response = await fetch('/api/users/login', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email: email, password: password})
                    });
                    if(response.status === 400) {
                        setModalText("Login failed: incorrect password");
                        document.getElementById('error').classList.add('modal-open');
                    }
                    else if(response.status === 404) {
                        setModalText("Login failed: No user found with that email");
                        document.getElementById('error').classList.add('modal-open');
                    }
                    else if(response.status === 200 ) {
                        const { token, user } = await response.json();
                        console.log(user);
                        localStorage.setItem('id_token', token);
                        localStorage.setItem('username', user.username);
                        window.location.assign('/');
                    }
                }
                catch (err) {
                    console.log(err);
                    setModalText("Login failed");
                    document.getElementById('error').classList.add('modal-open');
                }
            }
        }
        else {
            setModalText("Email and/or Password cannot be blank");
            document.getElementById('error').classList.add('modal-open');
        }
    }

    //handles closing the modal that has been opened for an error
    const closeModal = function () {
        document.getElementById('error').classList.remove('modal-open');
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <div id="login" className="w-full flex justify-center">
                <div className="card w-full md:w-2/3 lg:w-2/5 xl:w-1/3 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body w-full">
                        <h2 className="card-title text-4xl text-primary">Log in:</h2>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Email: </span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Email" className="input input-bordered w-full" id="email" onBlur={checkEmptyEmail} onFocus={setPlaceholderEmail} onKeyUp={checkValidEmail} />
                            </label>
                            <p className='my-2 hidden text-error' id='incorrectEmail'>Incorrect Email Format</p>
                        </div>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Password: </span>
                            </label>
                            <label className="input-group">
                                <input type="password" placeholder="Password" className="input input-bordered w-full" id="password" onBlur={checkEmptyPassword} onFocus={setPlaceholderPassword} onKeyUp={checkValidPassword} />
                            </label>
                            <p className='my-2 hidden text-error' id='incorrectPassword'>Password must be at least 8 characters long</p>
                        </div>
                        <div className="w-5/6 mx-auto">
                            <button className="w-full btn btn-primary" onClick={() => handleFormSubmit()}>Log in</button>
                            <div className="divider w-full">OR</div>
                            <button className="w-full btn btn-secondary" onClick={() => switchForm(false)}>Create Account</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-bottom sm:modal-middle" id="error">
                <div className="modal-box">
                    <h3 className="font-bold text-3xl text-error">Error!</h3>
                    <p className="py-4" id="error-text">{modalText}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn btn-accent w-1/3" onClick={() => closeModal()}>Close</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;