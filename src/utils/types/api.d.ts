/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import {
    CreateUpdateTranslationAction,
    CreateUpdateTranslationPhraseAction,
    FetchOptions
} from '@containers/TranslationPhraseList/types'
import {Models} from "@utils/types/models";


/**
 * API call response
 */
export type ApiResponse = {
    status: number;
    data?: any;
    message?: string;
    errors?: object[];
}

export type Response = Promise<ApiResponse>;


export type ApiValidationError = {
    path: string;
    message: string;
    type: string;
}


export type ApiValidationErrors = ApiValidationError[];


/**
 * i18n Module API Interfaces
 */
export namespace i18n {

    /**
     * Language Model API Interface
     */
    export interface ILanguageApi {
        getLanguages(): Response;
        createLanguage(data: object): Response;
        updateLanguage(id: number, data: object): Response;
        deleteLanguage(id: number): Response;
        restoreLanguage(id: number): Response;
    }

    /**
     * Translation Phrase Model API Interface
     */
    export interface ITranslationPhraseApi {
        getTranslationPhrases(options: FetchOptions): Response;
        createTranslationPhrase(data: CreateUpdateTranslationPhraseAction['data']): Response;
        updateTranslationPhrase(id: number, data: CreateUpdateTranslationPhraseAction['data']): Response;
        deleteTranslationPhrase(id: number): Response;
        restoreTranslationPhrase(id: number): Response;
    }

    /**
     * Translation Model API Interface
     */
    export interface ITranslationApi {
        createTranslation(data: CreateUpdateTranslationAction['data']): Response;
        updateTranslation(id: number, data: CreateUpdateTranslationAction['data']): Response;
    }

}


/**
 * System module API interfaces
 */
export namespace System {

    /**
     * User Model API Interface
     */
    export interface IUserApi {
        getUsers(): Response;
        getUser(id: number): Response;
        deleteUser(id: number): Response;
        restoreUser(id: number): Response;
        activateUser(id: number): Response;
        blockUser(id: number): Response;
        updateUser(id: number, data: Models.UserUpdateData): Response;
        createUser(data: Models.UserCreateData): Response;
    }

    /**
     * User Role Model API Interface
     */
    export interface IUserRoleApi {
        getUserRoles(): Response;
    }

    /**
     * Permission Model API Interface
     */
    export interface IPermissionApi {
        getPermissions(): Response;
    }

}