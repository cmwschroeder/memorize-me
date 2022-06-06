import React, { useState } from 'react';

function CreateAccountForm({ switchForm }) {

    //this text will be the text we show in our error modal for any wrong inputs
    const [modalText, setModalText] = useState("");

    //sets some css to let user know that username should not be blank
    const checkEmptyUsername = function (e) {
        if (e.target.value === '') {
            e.target.setAttribute('placeholder', 'Username cannot be blank');
            e.target.classList.add('input-error');
        }
    }

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

    //sets style for username input so that it isn't shown as an error when we are focused on it
    const setPlaceholderUsername = function (e) {
        e.target.setAttribute('placeholder', 'Username');
        e.target.classList.remove('input-error');
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

    //This function will handle creating a user with the inputs in the input fields.
    const handleFormSubmit = async () => {
        //get all the values in the field
        const username = document.getElementById('create-username').value;
        const email = document.getElementById('create-email').value;
        const password = document.getElementById('create-password').value;

        var emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        //make sure that all fields were filled in
        if (username && email && password) {
            //make sure email is in the form of an email
            if (!email.match(emailRegex)) {
                setModalText("Email is not in the form of an email");
                document.getElementById('error').classList.add('modal-open');
            }
            //make sure the password is at least 8 characters
            else if (password.length < 8) {
                setModalText("Password must be at least 8 characters long");
                document.getElementById('error').classList.add('modal-open');
            }
            else {
                try {
                    const response = await fetch('/api/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: username, email: email, password: password })
                    });
                    if (response.status === 200) {
                        const { token, user } = await response.json();
                        console.log(user);
                        localStorage.setItem('id_token', token);
                        window.location.assign('/');
                    }
                }
                catch (err) {
                    console.log(err);
                    setModalText("Create Account failed");
                    document.getElementById('error').classList.add('modal-open');
                }
            }

        }
        //if fields weren't filled in then tell user
        else {
            setModalText("Username, Email and/or Password cannot be blank");
            document.getElementById('error').classList.add('modal-open');
        }
    }

    //handles closing the modal that has been opened for an error
    const closeModal = function () {
        document.getElementById('error').classList.remove('modal-open');
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <div id="createAccount" className="w-full flex justify-center">
                <div className="card w-1/3 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body w-full">
                        <h2 className="card-title text-4xl text-primary">Create Account:</h2>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Username: </span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Username" className="input input-bordered w-full" id="create-username" onBlur={checkEmptyUsername} onFocus={setPlaceholderUsername} />
                            </label>
                        </div>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Email: </span>
                            </label>
                            <label className="input-group">
                                <input type="text" placeholder="Email" className="input input-bordered w-full" id="create-email" onBlur={checkEmptyEmail} onFocus={setPlaceholderEmail} onKeyUp={checkValidEmail} />
                            </label>
                            <p className='my-2 hidden text-error' id='incorrectEmail'>Incorrect Email Format</p>
                        </div>

                        <div className="form-control w-5/6 mx-auto">
                            <label className="label">
                                <span className="label-text text-2xl text-primary">Password: </span>
                            </label>
                            <label className="input-group">
                                <input type="password" placeholder="Password" className="input input-bordered w-full" id="create-password" onBlur={checkEmptyPassword} onFocus={setPlaceholderPassword} onKeyUp={checkValidPassword} />
                            </label>
                            <p className='my-2 hidden text-error' id='incorrectPassword'>Password must be at least 8 characters long</p>
                        </div>
                        <div className="w-5/6 mx-auto">
                            <button className="w-full btn btn-primary" onClick={() => handleFormSubmit()}>Create Account</button>
                            <div className="divider w-full">OR</div>
                            <button className="w-full btn btn-secondary" onClick={() => switchForm(true)}>Log in</button>
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

export default CreateAccountForm;