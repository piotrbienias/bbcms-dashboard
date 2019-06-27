/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App actions
 */

import { DefaultActionType } from '@utils/types/index';
import { SuccessNotification, ErrorNotification, AppNotification  } from "@utils/notification";

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION,
    SET_BREADCRUMBS,
    FETCH_TRANSLATIONS,
    FETCH_TRANSLATIONS_SUCCESS, FETCH_LANGUAGES, FETCH_LANGUAGES_SUCCESS, SET_CURRENT_LANGUAGE, LOGOUT, LOGOUT_SUCCESS
} from './constants';
import { SingleBreadcrumb } from "@components/Breadcrumbs";
import { Models } from "@utils/types/models";


/* -----------------
LOGIN/LOGOUT
------------------- */
export const login= (data: object): DefaultActionType => {
    return {
        type: LOGIN,
        data
    }
};

export const loginSuccess = (data: object): DefaultActionType => {
    return {
        type: LOGIN_SUCCESS,
        data
    }
};

export const loginFailure = (data: object): DefaultActionType => {
    return {
        type: LOGIN_FAILURE,
        data
    }
};

export const logout = (): DefaultActionType => {
    return {
        type: LOGOUT
    }
};

export const logoutSuccess = (): DefaultActionType => {
    return {
        type: LOGOUT_SUCCESS
    }
};



/* -----------------
FETCH CURRENT USER
------------------ */
export const fetchCurrentUser = (): DefaultActionType => {
    return {
        type: FETCH_CURRENT_USER
    }
};

export const fetchCurrentUserSuccess = (data: object): DefaultActionType => {
    return {
        type: FETCH_CURRENT_USER_SUCCESS,
        data
    }
};

export const fetchCurrentUserFailure = (data: object): DefaultActionType => {
    return {
        type: FETCH_CURRENT_USER_FAILURE,
        data
    }
};



/* --------------
TOGGLE NOTIFICATION
 ---------------- */
export const showNotification = (data: AppNotification | SuccessNotification | ErrorNotification): DefaultActionType => {
    return {
        type: SHOW_NOTIFICATION,
        data
    }
};

export const hideNotification = (): DefaultActionType => {
    return {
        type: HIDE_NOTIFICATION
    }
};




/*---------------
SET BREADCRUMBS
 ---------------*/
export const setBreadcrumbs = (data: SingleBreadcrumb[]): DefaultActionType => {
    return {
        type: SET_BREADCRUMBS,
        data
    }
};




/*----------------
TRANSLATION ACTIONS
 ----------------*/
export const fetchTranslations = (data: string): DefaultActionType => {
    return {
        type: FETCH_TRANSLATIONS,
        data
    }
};

export const fetchTranslationsSuccess = (data: Array<{[key:string]: string}>): DefaultActionType => {
    return {
        type: FETCH_TRANSLATIONS_SUCCESS,
        data
    }
};

export const fetchLanguages = (): DefaultActionType => {
    return {
        type: FETCH_LANGUAGES
    }
};

export const fetchLanguagesSuccess = (data: Models.Language[]): DefaultActionType => {
    return {
        type: FETCH_LANGUAGES_SUCCESS,
        data
    }
};

export const setCurrentLanguage = (data: string): DefaultActionType => {
    return {
        type: SET_CURRENT_LANGUAGE,
        data
    }
};