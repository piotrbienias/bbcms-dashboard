/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Models } from "@utils/types/models";
import { Actions, Constants } from './types';
import { LanguageModalType } from "@containers/LanguageList/types";


/*----------
FETCH LANGUAGES
 ----------*/
export const fetchLanguages = (): Actions.FetchLanguagesAction => {
    return {
        type: Constants.FETCH_LANGUAGES
    }
};

export const fetchLanguagesSuccess = (data: Models.Language[]): Actions.FetchLanguagesSuccessAction => {
    return {
        type: Constants.FETCH_LANGUAGES_SUCCESS,
        data
    }
};



/* -----------
DELETE LANGUAGE
 ------------*/
export const deleteLanguage = (data: number): Actions.DeleteLanguageAction => {
    return {
        type: Constants.DELETE_LANGUAGE,
        data
    }
};

export const restoreLanguage = (data: number): Actions.RestoreLanguageAction => {
    return {
        type: Constants.RESTORE_LANGUAGE,
        data
    }
};




/* ---------
TOGGLE MODAL
 --------- */
export const showModal = (data: LanguageModalType['data']): Actions.ShowModalAction => {
    return {
        type: Constants.SHOW_MODAL,
        data
    }
};

export const hideModal = (): Actions.HideModalAction => {
    return {
        type: Constants.HIDE_MODAL
    }
};




/*----------
UPDATE LANGUAGE
 ----------*/
export const updateLanguage = (data: LanguageModalType['data']): Actions.UpdateLanguageAction => {
    return {
        type: Constants.UPDATE_LANGUAGE,
        data
    }
};

export const createLanguage = (data: LanguageModalType['data']): Actions.CreateLanguageAction => {
    return {
        type: Constants.CREATE_LANGUAGE,
        data
    }
};

export const createUpdateLanguageFailure = (data: object[]): Actions.CreateUpdateLanguageFailureAction => {
    return {
        type: Constants.CREATE_UPDATE_LANGUAGE_FAILURE,
        data
    }
};

export const createUpdateLanguageSuccess = (): Actions.CreateUpdateLanguageSuccessAction => {
    return {
        type: Constants.CREATE_UPDATE_LANGUAGE_SUCCESS
    }
};

export const resetLanguageFormErrors = (): Actions.ResetLanguageFormErrorsAction => {
    return {
        type: Constants.RESET_LANGUAGE_FORM_ERRORS
    }
};