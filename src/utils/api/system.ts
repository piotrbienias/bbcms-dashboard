/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Service } from 'typedi';
import axios from '@config/axios';
import { System, Response } from '@utils/types/api';


@Service()
export class UserRoleAPI implements System.IUserRoleApi {

    getUserRoles(): Response {
        return axios.get('/modules/system/user-roles');
    }

}


@Service()
export class PermissionAPI implements System.IPermissionApi {

    getPermissions(): Response {
        return axios.get('/modules/system/permissions');
    }

}