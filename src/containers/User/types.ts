/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import { Map } from "immutable";
import { Models } from "@utils/types/models";

import { ActionType } from '@utils/types/index';
import { ApiValidationError, ApiValidationErrors } from "@utils/types/api";


/**
 * User component constants for Redux actions
 */
export namespace Constants {

    export const FETCH_USER = 'User/FetchUser';
    export const FETCH_USER_SUCCESS = 'User/FetchUserSuccess';

    export const FETCH_USER_ROLES = 'User/FetchUserRoles';
    export const FETCH_USER_ROLES_SUCCESS = 'User/FetchUserRolesSuccess';

    export const FETCH_PERMISSIONS = 'User/FetchPermissions';
    export const FETCH_PERMISSIONS_SUCCESS = 'User/FetchPermissionsSuccess';

    export const CREATE_UPDATE_USER = 'User/CreateUpdateUser';
    export const CREATE_UPDATE_USER_FAILURE = 'User/CreateUpdateUserFailure';
    export const CREATE_UPDATE_USER_SUCCESS = 'User/CreateUpdateUserSuccess';

    export const RESET_USER_FORM = 'User/ResetUserForm';

    export const USER_NOT_FOUND = 'User/UserNotFound';
}


/**
 * User component Redux actions
 */
export namespace Actions {

    export type FetchUserAction = ActionType & { data: number };
    export type FetchUserSuccessAction = ActionType & { data: Models.User };

    export type FetchUserRolesAction = ActionType;
    export type FetchUserRolesSuccessAction = ActionType & { data: Models.UserRole[] };

    export type FetchPermissionsAction = ActionType;
    export type FetchPermissionsSuccessAction = ActionType & { data: Models.Permission[] };

    export type CreateUpdateUser = ActionType & { data: Models.UserUpdateData | Models.UserCreateData };
    export type CreateUpdateUserFailure = ActionType & { data: ApiValidationErrors };
    export type CreateUpdateUserSuccess = ActionType & { data: Models.User };

    export type ResetUserForm = ActionType;

    export type UserNotFoundAction = ActionType;
}


/**
 * User component Route params
 */
export type UserRouteParams = {
    id: string;
}


/**
 * User component properties
 */
export type UserProperties = {
    userForm: {
        data: Models.User,
        errors: ApiValidationError[]
    }
    notFound: boolean;
    userRoles: Models.UserRole[];
    permissions: Models.Permission[];
}

/**
 * User component actions
 */
export type UserActions = {
    fetchUser(id: string): void;
    fetchUserRoles(): void;
    fetchPermissions(): void;
    createUpdateUser(data: Models.UserUpdateData | Models.UserCreateData): void;
    resetUserForm(): void;
}


/**
 * Combined properties of User component
 */
export type UserComponent = UserProperties & UserActions;


/**
 * User component state
 */
export type UserState = Map<keyof UserProperties, any>;