/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import axios from '@config/axios';
import { Service } from 'typedi';
import {CreateUpdateTranslationAction, FetchOptions} from './types';
import { i18n, Response } from '@utils/types/api';
import { Models } from "@utils/types/models";


@Service()
export class TranslationPhraseApi implements i18n.ITranslationPhraseApi {

    getTranslationPhrases(options: FetchOptions): Response {
        let query = `?page=${options.page}`;
        query += options.perPage ? `&perPage=${options.perPage}` : '';

        return axios.get(`/modules/i18n/translation-phrases${query}`);
    }

    deleteTranslationPhrase(id: number): Response {
        return axios.delete(`/modules/i18n/translation-phrases/${id}`);
    }

    restoreTranslationPhrase(id: number): Response {
        return axios.put(`/modules/i18n/translation-phrases/${id}/restore`);
    }

    createTranslationPhrase(data: Models.TranslationPhrase): Response {
        return axios.post('/modules/i18n/translation-phrases', data);
    }

    updateTranslationPhrase(id: number, data: Models.TranslationPhrase): Response {
        return axios.put(`/modules/i18n/translation-phrases/${id}`, data);
    }

}

@Service()
export class TranslationApi implements i18n.ITranslationApi {


    createTranslation(data: CreateUpdateTranslationAction['data']): Response {
        return axios.post('/modules/i18n/translations', data);
    }

    updateTranslation(id: number, data: CreateUpdateTranslationAction['data']): Response {
        return axios.put(`/modules/i18n/translations/${id}`, data);
    }

}