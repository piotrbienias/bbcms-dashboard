/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App reducer
 */

import { fromJS, Map, List } from 'immutable';
import { AnyAction } from 'redux'
import {
    LOGIN_FAILURE, LOGIN_SUCCESS,
    FETCH_CURRENT_USER_FAILURE, FETCH_CURRENT_USER_SUCCESS,
    SHOW_NOTIFICATION, HIDE_NOTIFICATION,
    SET_BREADCRUMBS,
    FETCH_TRANSLATIONS_SUCCESS, FETCH_LANGUAGES_SUCCESS, SET_CURRENT_LANGUAGE, LOGOUT_SUCCESS
} from './constants';
import { ApplicationState } from './types';
import { getBreadcrumbs } from '@utils/functions';
import { LOCATION_CHANGE } from "connected-react-router";




/**
 * Initial Application state.
 */
export const initialState: ApplicationState = fromJS({
    login: {
        status: null,
        message: null
    },
    user: {},
    notification: {
        show: false,
        message: null,
        description: null,
        icon: null
    },
    language: 'pl_PL',
    breadcrumbs: [],
    translation: {
        currentLanguage: 'en_EN',
        languages: [],
        translations: {}
    }
});


/**
 * Root Application reducer.
 *
 * @param state
 * @param action
 */
function appReducer(state = initialState, action: AnyAction): ApplicationState {

    switch (action.type) {
        case LOGIN_FAILURE:
            return state
                .set('login', Map(action.data));

        case LOGIN_SUCCESS:
            return state
                .set('login', Map({ status: 200, message: null }))
                .set('user', Map(action.data));

        case LOGOUT_SUCCESS:
            return state
                .set('user', Map({}));

        case FETCH_CURRENT_USER_FAILURE:
            return state
                .set('user', Map({}));

        case FETCH_CURRENT_USER_SUCCESS:
            return state
                .set('user', Map(action.data));

        case SHOW_NOTIFICATION:
            return state
                .set('notification', Map(action.data));

        case HIDE_NOTIFICATION:
            return state
                .set('notification', initialState.get('notification'));

        case SET_BREADCRUMBS:
            return state
                .set('breadcrumbs', List(action.data));

        case FETCH_TRANSLATIONS_SUCCESS:
            return state
                .setIn(['translation', 'translations'], Map(action.data));

        case FETCH_LANGUAGES_SUCCESS:
            return state
                .setIn(['translation', 'languages'], List(action.data));

        case SET_CURRENT_LANGUAGE:
            return state
                .setIn(['translation', 'translations'], Map({}))
                .setIn(['translation', 'currentLanguage'], action.data);

        case LOCATION_CHANGE:
            return state
                .set('breadcrumbs', List(getBreadcrumbs(action.payload.location.pathname)));

        default:
            return state;
    }

}


export default appReducer;