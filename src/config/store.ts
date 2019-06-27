/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { applyMiddleware, compose, Store, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducer';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router/immutable';

import { HotModule } from '@utils/types/index';


export const history = createBrowserHistory();

interface InjectedReducers {
    [key: string]: Function;
}

interface InjectedSagas {
    [key: string]: Function;
}

export type AppStore = Store & {
    injectedReducers?: InjectedReducers;
    injectedSagas?: InjectedSagas;
    runSaga?: Function;
    injectSaga?: Function;
    injectReducer?: Function;
}


const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store: AppStore = createStore(
    createReducer(history),
    composeEnhancer(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history)
        )
    )
);

store.injectedReducers = {};
store.injectedSagas = {};
store.runSaga = sagaMiddleware.run;


store.injectSaga = (key: string, saga: Function) => {
    if ( ! store.injectedSagas[key] ) {
        store.injectedSagas[key] = saga;
        store.runSaga(saga);
    }
};


store.injectReducer = (key: string, reducer: Function) => {
    if ( ! store.injectedReducers[key] ) {
        store.injectedReducers[key] = reducer;
        store.replaceReducer(createReducer(history, store.injectedReducers));
    }
};



if ( (module as HotModule).hot ) {
    (module as HotModule).hot.accept('./reducer', () => {
        store.replaceReducer(createReducer(history, store.injectedReducers));
    });
}


export default store;