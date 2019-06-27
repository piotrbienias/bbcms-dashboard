/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { ApiResponse } from '@utils/types/api';


export interface i18nApiInterface {
    getLanguages(): Promise<ApiResponse>;
    createLanguage(data: object): Promise<ApiResponse>;
    updateLanguage(id: number, data: object): Promise<ApiResponse>;
    deleteLanguage(id: number): Promise<ApiResponse>;
    restoreLanguage(id: number): Promise<ApiResponse>;
}