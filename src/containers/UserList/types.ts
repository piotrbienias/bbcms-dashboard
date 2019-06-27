/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import { Map } from 'immutable';
import { Models } from "@utils/types/models";


/**
 * Container Constants
 */
export namespace Constants {

    export const FETCH_USERS = 'UserList/FetchUsers';
    export const FETCH_USERS_SUCCESS = 'UserList/FetchUsersSuccess';

    export const DELETE_RESTORE_USER = 'UserList/DeleteRestoreUser';
    export const DELETE_RESTORE_USER_SUCCESS = 'UserList/DeleteRestoreUserSuccess';

    export const ACTIVATE_BLOCK_USER = 'UserList/ActivateBlockUser';
    export const ACTIVATE_BLOCK_USER_SUCCESS = 'UserList/ActivateBlockUserSuccess';
}


/**
 * User List Container Actions
 */
export namespace Actions {

    export type FetchUsersAction = {
        type: string;
        data: Models.User[];
    }

    export type ActivateBlockUserAction = {
        type: string;
        data: Models.User;
    }

    export type ActivateBlockUserSuccessAction = {
        type: string;
        data: number;
    }

    export type DeleteRestoreUserAction = ActivateBlockUserAction;
    export type DeleteRestoreUserSuccessAction = ActivateBlockUserSuccessAction;
}


/**
 * User List Container Properties
 */
export type UserListProperties = {
    user: Models.User;
    users: Models.User[];
}

/**
 * User List State
 */
export type UserListState = Map<keyof UserListProperties, any>;