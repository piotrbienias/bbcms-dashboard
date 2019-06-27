/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { fromJS, List, Map } from 'immutable';
import { TranslationPhraseListState } from './types';
import { DefaultActionType } from "@utils/types/index";
import * as constants from './constants';


export const initialState: TranslationPhraseListState = fromJS({
    translationPhrases: {
        data: [],
        loading: false,
        perPage: 5,
        total: null,
        reload: false,
        page: 1
    },
    languages: [],
    modal: {
        visible: false,
        data: {},
        errors: []
    }
});


function translationPhraseListReducer(state = initialState, action: DefaultActionType) {

    switch (action.type) {

        case constants.FETCH_TRANSLATION_PHRASES:
            return state
                .setIn(['translationPhrases', 'loading'], true);

        case constants.FETCH_TRANSLATION_PHRASES_SUCCESS:
            return state
                .setIn(['translationPhrases', 'loading'], false)
                .setIn(['translationPhrases', 'total'], action.data.total)
                .setIn(['translationPhrases', 'data'], List(action.data.data));

        case constants.FETCH_LANGUAGES_SUCCESS:
            return state
                .set('languages', List(action.data));

        case constants.TOGGLE_RELOAD:
            return state
                .set('modal', initialState.get('modal'))
                .setIn(['translationPhrases', 'reload'], !state.getIn(['translationPhrases', 'reload']));

        case constants.SET_PAGE:
            return state
                .setIn(['translationPhrases', 'page'], action.data);

        case constants.SHOW_MODAL:
            return state
                .setIn(['modal', 'visible'], true)
                .setIn(['modal', 'data'], Map(action.data));

        case constants.HIDE_MODAL:
            return state
                .set('modal', initialState.get('modal'));

        case constants.RESET_MODAL_FORM_ERRORS:
            return state
                .setIn(['modal', 'errors'], List([]));

        case constants.CREATE_UPDATE_TRANSLATION_PHRASE_FAILURE:
            return state
                .setIn(['modal', 'errors'], List(action.data));

        default:
            return state;

    }

}


export default translationPhraseListReducer;