/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * Axios instance
 */

import axios, { AxiosInstance } from 'axios';


const axiosInstance: AxiosInstance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8181/api' : 'http://staging.bbcms.pl/api',
    baseURL: 'http://localhost:8181/api',
    withCredentials: true
});


export default axiosInstance;