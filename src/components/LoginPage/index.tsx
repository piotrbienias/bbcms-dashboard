/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * Login Page
 */

import * as React from 'react';

// Login form
import LoginForm from '../LoginForm';


interface LoginPageProps {
    login(data: object): void;
}


class LoginPage extends React.Component<LoginPageProps, any> {

    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoginForm
                    login={this.props.login} />
            </div>
        )
    }

}


export default LoginPage;