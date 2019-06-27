/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Service } from 'typedi';
import { Constants, Actions } from './types';
import { Models } from "@utils/types/models";
import { ApiValidationErrors } from "@utils/types/api";



@Service()
export class UserActions {

    fetchUser(data: number): Actions.FetchUserAction {
        return {
            type: Constants.FETCH_USER,
            data
        }
    }

    fetchUserSuccess(data: Models.User): Actions.FetchUserSuccessAction {
        return {
            type: Constants.FETCH_USER_SUCCESS,
            data
        }
    }

    fetchUserRoles(): Actions.FetchUserRolesAction {
        return {
            type: Constants.FETCH_USER_ROLES
        }
    }

    fetchUserRolesSuccess(data: Models.UserRole[]): Actions.FetchUserRolesSuccessAction {
        return {
            type: Constants.FETCH_USER_ROLES_SUCCESS,
            data
        }
    }

    fetchPermissions(): Actions.FetchPermissionsAction {
        return {
            type: Constants.FETCH_PERMISSIONS
        }
    }

    fetchPermissionsSuccess(data: Models.Permission[]): Actions.FetchPermissionsSuccessAction {
        return {
            type: Constants.FETCH_PERMISSIONS_SUCCESS,
            data
        }
    }

    createUpdateUser(data: Models.UserCreateData | Models.UserUpdateData): Actions.CreateUpdateUser {
        return {
            type: Constants.CREATE_UPDATE_USER,
            data
        }
    }

    createUpdateUserFailure(data: ApiValidationErrors): Actions.CreateUpdateUserFailure {
        return {
            type: Constants.CREATE_UPDATE_USER_FAILURE,
            data
        }
    }

    createUpdateUserSuccess(data: Models.User): Actions.CreateUpdateUserSuccess {
        return {
            type: Constants.CREATE_UPDATE_USER_SUCCESS,
            data
        }
    }

    resetUserForm(): Actions.ResetUserForm {
        return {
            type: Constants.RESET_USER_FORM
        }
    }

    userNotFound(): Actions.UserNotFoundAction {
        return {
            type: Constants.USER_NOT_FOUND
        }
    }
}