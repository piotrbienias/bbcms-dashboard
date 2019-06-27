/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App - main container
 */

import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { LocalizeContextProps, withLocalize } from 'react-localize-redux';

// Ant Design
import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/index.css';

import { NotificationApi } from 'antd/lib/notification';

// Components
import Dashboard from '@components/Dashboard';
import LoginPage from '@components/LoginPage';

// Injectors
import injectReducer from '@utils/injectReducer';
import injectSaga from '@utils/injectSaga';

// Selectors
import {
    makeSelectLogin, makeSelectUser, makeSelectNotification, makeSelectBreadcrumbs,
    makeSelectTranslation
} from './selectors';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Actions
import {
    login, logout, fetchCurrentUser, hideNotification, fetchTranslations, fetchLanguages,
    setCurrentLanguage
} from './actions';

// Types
import { ApplicationProperties } from './types';

import './styles.scss';


export type AppProps = LocalizeContextProps & ApplicationProperties & {
    translations: any[];
    fetchCurrentUser(): void;
    login(data: object): void;
    logout(): void;
    hideNotification(): void;
    fetchTranslations(code: string): void;
    fetchLanguages(): void;
    setCurrentLanguage(code: string): void;
}


class App extends React.Component<AppProps, any> {

    /**
     * Actions to be done when component mounts itself:
     * - fetch currently logged in user
     */
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    /**
     * Actions to be done when component updates:
     * - show notification if `notification.show` is set
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<AppProps>): void {
        if ( this.props.notification.show ) {
            (notification as NotificationApi)[this.props.notification.type]({
                message: this.props.notification.message,
                description: this.props.notification.description
            });

            this.props.hideNotification();
        }
    }

    render() {
        return this.props.user.id ? <Dashboard {...this.props} /> : <LoginPage login={this.props.login} />;
    }

}


const mapStateToProps = createStructuredSelector({
    loginData:                  makeSelectLogin(),
    user:                       makeSelectUser(),
    notification:               makeSelectNotification(),
    breadcrumbs:                makeSelectBreadcrumbs(),
    translation:                makeSelectTranslation()
});


const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            login,
            logout,
            fetchCurrentUser,
            hideNotification,
            fetchTranslations,
            fetchLanguages,
            setCurrentLanguage
        },
        dispatch
    );
};

const includeConnect = connect(mapStateToProps, mapDispatchToProps);
const includeReducer = injectReducer('app', reducer);
const includeSaga = injectSaga('app', saga);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(withLocalize(App));