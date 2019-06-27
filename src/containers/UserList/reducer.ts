/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { fromJS, List } from 'immutable';
import { UserListState, Constants } from './types';
import { AnyAction } from "redux";
import { Models } from '@utils/types/models';



export const initialState: UserListState = fromJS({
    users: []
});


function userListReducer(state = initialState, action: AnyAction): UserListState {

    switch (action.type) {
        case Constants.FETCH_USERS_SUCCESS:
            return state
                .set('users', List(action.data));

        case Constants.DELETE_RESTORE_USER_SUCCESS: {
            let updatedUsers = (state.get('users') as List<Models.User>).map<Models.User>((user: Models.User) => {
                if (action.data === user.id) user.isDeleted = !user.isDeleted;
                return Object.assign({}, user);
            });

            return state
                .set('users', updatedUsers);
        }

        case Constants.ACTIVATE_BLOCK_USER_SUCCESS: {
            let updatedUsers = (state.get('users') as List<Models.User>).map<Models.User>((user: Models.User) => {
                if ( action.data === user.id ) user.isActive = !user.isActive;
                return Object.assign({}, user);
            });

            return state
                .set('users', updatedUsers);
        }

        default:
            return state;
    }

}


export default userListReducer;