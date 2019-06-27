/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App API calls
 */

import { AxiosPromise } from 'axios';
import axios from '@config/axios';


type LoginData = {
    email: string;
    password: string;
}


export const login = (data: LoginData): AxiosPromise<any> => {
    return axios.post('/modules/system/auth/login', data);
};

export const logout = (): AxiosPromise<any> => {
    return axios.post('/modules/system/auth/logout');
};

export const getCurrentUser = (): AxiosPromise<any> => {
    return axios.get('/modules/system/auth/me');
};