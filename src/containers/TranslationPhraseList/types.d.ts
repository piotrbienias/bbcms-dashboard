/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Map } from 'immutable';
import { Models } from '@utils/types/models';


/**
 * Reducer properties
 */
export interface TPLKeys {
    translationPhrases: {
        data: Models.TranslationPhrase[];
        loading: boolean;
        perPage: number;
        total: number;
        reload: boolean;
        page: number;
    },
    languages: Models.Language[];
    modal: {
        visible: boolean;
        data: Models.TranslationPhrase;
        errors: object[];
    }
}

/**
 * Translation Phrase List State
 */
export type TranslationPhraseListState = Map<keyof TPLKeys, any>;


/**
 * Translation Phrase List Properties
 */
export type TranslationPhraseListProps = TPLKeys & {
    fetchTranslationPhrases(options: FetchOptions): void;
    fetchLanguages(): void;
    deleteTranslationPhrase(data: DeleteRestoreAction['data']): void;
    restoreTranslationPhrase(data: DeleteRestoreAction['data']): void;
    createUpdateTranslation(data: CreateUpdateTranslationAction['data']): void;
    toggleReload(): void;
    setPage(page: number): void;
    showModal(data: Models.TranslationPhrase): void;
    hideModal(): void;
    createUpdateTranslationPhrase(data: Models.TranslationPhrase): void;
    resetModalFormErrors(): void;
}

/**
 * Fetch Phrases API call options
 */
export type FetchOptions = {
    page: number;
    perPage?: number;
}

/**
 * Fetch Phrases API call response
 */
export type FetchResponse = {
    data: Models.TranslationPhrase[];
    total: number;
}

/**
 * Delete/Restore Translation Phrase Action
 */
export type DeleteRestoreAction = {
    type: string;
    data: {
        id: number;
        page: number;
        perPage?: number;
    }
}

/**
 * Create/Update Translation Action
 */
export type CreateUpdateTranslationAction = {
    type: string;
    data: {
        id: number;
        translation: string;
        translationPhrase: number;
        language: number;
    }
}

/**
 * Create/Update Translation Phrase Action
 */
export type CreateUpdateTranslationPhraseAction = {
    type: string;
    data: Models.TranslationPhrase
};