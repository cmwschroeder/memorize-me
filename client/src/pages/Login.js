import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import CreateAccountForm from '../components/CreateAccountForm';

function Login() {

    const [loginComp, setLoginComp] = useState(true);

    const renderForm = () => {
        if(loginComp) {
            return <LoginForm switchForm={setLoginComp} />
        }
        else {
            return <CreateAccountForm switchForm={setLoginComp} />
        }
    }

    return (
        <div>
            {renderForm()}
        </div>
    )
}

export default Login; 