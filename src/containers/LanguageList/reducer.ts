/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { fromJS, List, Map } from 'immutable';
import { AnyAction } from "redux";
import { Constants, LanguageListState } from './types';


export const initialState: LanguageListState = fromJS({
    languages: [],
    modal: {
        visible: false,
        data: {
            id: null,
            name: null,
            code: null
        },
        errors: []
    }
});


function languageListReducer(state = initialState, action: AnyAction): LanguageListState {

    switch (action.type) {

        case Constants.FETCH_LANGUAGES_SUCCESS:
            return state
                .set('languages', List(action.data));

        case Constants.SHOW_MODAL:
            return state
                .setIn(['modal', 'visible'], true)
                .setIn(['modal', 'data'], Map(action.data));

        case Constants.HIDE_MODAL:
            return state
                .set('modal', initialState.get('modal'));

        case Constants.CREATE_UPDATE_LANGUAGE_SUCCESS:
            return state
                .setIn(['modal', 'errors'], List([]));

        case Constants.CREATE_UPDATE_LANGUAGE_FAILURE:
            return state
                .setIn(['modal', 'errors'], List(action.data));

        case Constants.RESET_LANGUAGE_FORM_ERRORS:
            return state
                .setIn(['modal', 'errors'], List([]));

        default:
            return state;

    }

}


export default languageListReducer;