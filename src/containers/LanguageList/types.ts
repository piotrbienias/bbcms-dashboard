/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import { Models } from "@utils/types/models";
import { ActionType } from "@utils/types/index";
import { Map } from "immutable";

/**
 * Language List Container Constants
 */
export namespace Constants {

    export const FETCH_LANGUAGES: string = 'LanguageList/FetchLanguages';
    export const FETCH_LANGUAGES_SUCCESS: string = 'LanguageList/FetchLanguagesSuccess';

    export const DELETE_LANGUAGE: string = 'LanguageList/DeleteLanguage';
    export const RESTORE_LANGUAGE: string = 'LanguageList/RestoreLanguage';

    export const SHOW_MODAL: string = 'LanguageList/ShowModal';
    export const HIDE_MODAL: string = 'LanguageList/HideModal';

    export const UPDATE_LANGUAGE: string = 'LanguageList/UpdateLanguage';
    export const CREATE_LANGUAGE: string = 'LanguageList/CreateLanguage';
    export const CREATE_UPDATE_LANGUAGE_SUCCESS: string = 'LanguageList/CreateUpdateLanguageSuccess';
    export const CREATE_UPDATE_LANGUAGE_FAILURE: string = 'LanguageList/CreateUpdateLanguageFailure';

    export const RESET_LANGUAGE_FORM_ERRORS: string = 'LanguageList/ResetLanguageFormErrors';
}


/**
 * Language List Container Actions
 */
export namespace Actions {

    export type FetchLanguagesAction = ActionType;
    export type FetchLanguagesSuccessAction = ActionType & { data: Models.Language[] };

    export type DeleteLanguageAction = ActionType & { data: number };
    export type RestoreLanguageAction = DeleteLanguageAction;

    export type ShowModalAction = ActionType & { data: LanguageModalType['data'] };
    export type HideModalAction = ActionType;

    export type UpdateLanguageAction = ActionType & { data: LanguageModalType['data'] };
    export type CreateLanguageAction = UpdateLanguageAction;

    export type CreateUpdateLanguageFailureAction = ActionType & { data: object[] };
    export type CreateUpdateLanguageSuccessAction = ActionType;

    export type ResetLanguageFormErrorsAction = ActionType;
}


/**
 * Language Modal data
 */
export type LanguageModalType = {
    visible: boolean,
    data: {
        id?: number;
        name?: string;
        code?: string;
    },
    errors: SingleFormError[]
}


/**
 * Single Form Error from API call
 */
export type SingleFormError = {
    path: string;
    message: string;
}


/**
 * Language List component properties.
 */
export type LanguageListProperties = {
    languages: Models.Language[];
    modal: LanguageModalType;
}

/**
 * Language List state.
 */
export type LanguageListState = Map<keyof LanguageListProperties, any>;