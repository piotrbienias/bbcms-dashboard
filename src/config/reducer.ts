/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { History } from 'history';
import { localizeReducer } from 'react-localize-redux';


const createReducer = (history: History, reducers?: object) => {
    return combineReducers({
        router: connectRouter(history),
        localize: localizeReducer,
        ...reducers
    });
};


export default createReducer;