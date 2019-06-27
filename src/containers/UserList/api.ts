/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import axios from '@config/axios';
import { Service } from 'typedi';
import { System, Response } from '@utils/types/api';
import { Models } from '@utils/types/models';


@Service()
export class UserApi implements System.IUserApi {

    getUsers(): Response {
        return axios.get('/modules/system/users');
    }

    getUser(id: number): Response {
        return axios.get(`/modules/system/users/${id}`);
    }

    deleteUser(id: number): Response {
        return axios.delete(`/modules/system/users/${id}`);
    }

    restoreUser(id: number): Response {
        return axios.put(`/modules/system/users/${id}/restore`);
    }

    activateUser(id: number): Response {
        return axios.put(`/modules/system/users/${id}/activate`);
    }

    blockUser(id: number): Response {
        return axios.put(`/modules/system/users/${id}/block`);
    }

    updateUser(id: number, data: Partial<Models.UserUpdateData>): Response {
        return axios.put(`/modules/system/users/${id}`, data);
    }

    createUser(data: Models.UserCreateData): Response {
        return axios.post('/modules/system/users', data);
    }
}