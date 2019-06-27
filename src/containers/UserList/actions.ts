/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Constants, Actions } from './types';
import { DefaultActionType } from '@utils/types/index';
import { Models } from '@utils/types/models';


/*---------------
FETCH USERS
 ---------------*/
export const fetchUsers = (): DefaultActionType => {
    return {
        type: Constants.FETCH_USERS
    }
};

export const fetchUsersSuccess = (data: Models.User[]): Actions.FetchUsersAction => {
    return {
        type: Constants.FETCH_USERS_SUCCESS,
        data
    }
};




/*-----------------
DELETE/RESTORE USER
 -----------------*/
export const deleteRestoreUser = (data: Models.User): Actions.DeleteRestoreUserAction => {
    return {
        type: Constants.DELETE_RESTORE_USER,
        data
    }
};

export const deleteRestoreUserSuccess = (data: number): Actions.DeleteRestoreUserSuccessAction => {
    return {
        type: Constants.DELETE_RESTORE_USER_SUCCESS,
        data
    }
};



/*-----------------
ACTIVATE/BLOCK USER
 -----------------*/
export const activateBlockUser = (data: Models.User): Actions.ActivateBlockUserAction => {
    return {
        type: Constants.ACTIVATE_BLOCK_USER,
        data
    }
};

export const activateBlockUserSuccess = (data: number): Actions.ActivateBlockUserSuccessAction => {
    return {
        type: Constants.ACTIVATE_BLOCK_USER_SUCCESS,
        data
    }
};