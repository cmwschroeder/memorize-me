import React from 'react';

function LoginForm({ switchForm }) {

    const checkEmptyEmail = function (e) {
        if (e.target.value === '') {
            e.target.setAttribute('placeholder', 'Email cannot be blank');
            e.target.classList.add('input-error');
        }
    }

    const checkEmptyPassword = function (e) {
        if (e.target.value === '') {
            e.target.setAttribute('placeholder', 'Password cannot be blank');
            e.target.classList.add('input-error');
        }
    }

    const setPlaceholderEmail = function (e) {
        e.target.setAttribute('placeholder', 'Email');
        e.target.classList.remove('input-error');
    }

    const setPlaceholderPassword = function (e) {
        e.target.setAttribute('placeholder', 'Password');
        e.target.classList.remove('input-error');
    }

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