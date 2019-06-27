/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as constants from './constants';
import { DefaultActionType } from '@utils/types/index';
import {
    FetchOptions,
    FetchResponse,
    DeleteRestoreAction,
    CreateUpdateTranslationAction, CreateUpdateTranslationPhraseAction
} from './types';
import { Models } from "@utils/types/models";
import Language = Models.Language;



/*-----------------------
FETCH TRANSLATION PHRASES
 -----------------------*/
export const fetchTranslationPhrases = (data: FetchOptions): DefaultActionType => {
    return {
        type: constants.FETCH_TRANSLATION_PHRASES,
        data
    }
};

export const fetchTranslationPhrasesSuccess = (data: FetchResponse): DefaultActionType => {
    return {
        type: constants.FETCH_TRANSLATION_PHRASES_SUCCESS,
        data
    }
};



/*-----------------
FETCH LANGUAGES
 -----------------*/
export const fetchLanguages = (): DefaultActionType => {
    return {
        type: constants.FETCH_LANGUAGES
    }
};

export const fetchLanguagesSuccess = (data: Language[]): DefaultActionType => {
    return {
        type: constants.FETCH_LANGUAGES_SUCCESS,
        data
    }
};



/*-----------------------
DELETE TRANSLATION PHRASE
 -----------------------*/
export const deleteTranslationPhrase = (data: DeleteRestoreAction['data']): DeleteRestoreAction => {
    return {
        type: constants.DELETE_TRANSLATION_PHRASE,
        data
    }
};

export const restoreTranslationPhrase = (data: DeleteRestoreAction['data']): DeleteRestoreAction => {
    return {
        type: constants.RESTORE_TRANSLATION_PHRASE,
        data
    }
};




/*-----------------------
CREATE UPDATE TRANSLATION
 -----------------------*/
export const createUpdateTranslation = (data: CreateUpdateTranslationAction['data']): DefaultActionType => {
    return {
        type: constants.CREATE_UPDATE_TRANSLATION,
        data
    }
};




/*-----------------
TOGGLE RELOAD
 -----------------*/
export const toggleReload = (): DefaultActionType => {
    return {
        type: constants.TOGGLE_RELOAD
    }
};




/*--------
SET PAGE
 --------*/
export const setPage = (data: number): DefaultActionType => {
    return {
        type: constants.SET_PAGE,
        data
    }
};



/*-------------
SHOW HIDE MODAL
 -------------*/
export const showModal = (data: Models.TranslationPhrase): DefaultActionType => {
    return {
        type: constants.SHOW_MODAL,
        data
    }
};

export const hideModal = (): DefaultActionType => {
    return {
        type: constants.HIDE_MODAL
    }
};

export const resetModalFormErrors = (): DefaultActionType => {
    return {
        type: constants.RESET_MODAL_FORM_ERRORS
    }
};




/*------------------------------
CREATE/UPDATE TRANSLATION PHRASE
 ------------------------------*/
export const createUpdateTranslationPhrase = (data: CreateUpdateTranslationPhraseAction['data']): CreateUpdateTranslationPhraseAction => {
    return {
        type: constants.CREATE_UPDATE_TRANSLATION_PHRASE,
        data
    }
};

export const createUpdateTranslationPhraseFailure = (data: object[]): DefaultActionType => {
    return {
        type: constants.CREATE_UPDATE_TRANSLATION_PHRASE_FAILURE,
        data
    }
};