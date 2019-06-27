/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * Component injecting container's saga
 */

import * as React from 'react';
import { ReactReduxContext } from 'react-redux';
import { Saga } from 'redux-saga';
import { AppStore } from "@config/store";


export default (key: string, saga: Saga) => (WrappedComponent: React.Component) => {

    const WithSaga = (props: object) => {
        return (
            <ReactReduxContext.Consumer>
                {context => {
                    const store = (context.store as AppStore);
                    store.injectSaga(key, saga);
                    // @ts-ignore
                    return <WrappedComponent {...props} />
                }}
            </ReactReduxContext.Consumer>
        )
    };

    return WithSaga;

};