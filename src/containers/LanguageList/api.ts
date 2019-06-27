/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import axios from '@config/axios';
import { Service } from 'typedi';
import { ApiResponse, i18n } from '@utils/types/api';


@Service()
export class LanguageApi implements i18n.ILanguageApi {

    createLanguage(data: object): Promise<ApiResponse> {
        return axios.post('/modules/i18n/languages', data);
    }

    deleteLanguage(id: number): Promise<ApiResponse> {
        return axios.delete(`/modules/i18n/languages/${id}`);
    }

    getLanguages(): Promise<ApiResponse> {
        return axios.get('/modules/i18n/languages');
    }

    restoreLanguage(id: number): Promise<ApiResponse> {
        return axios.put(`/modules/i18n/languages/${id}/restore`);
    }

    updateLanguage(id: number, data: object): Promise<ApiResponse> {
        return axios.put(`/modules/i18n/languages/${id}`, data);
    }

    getLanguageTranslations(language: string): Promise<ApiResponse> {
        return axios.get(`/modules/i18n/languages/${language}/translations`);
    }

}