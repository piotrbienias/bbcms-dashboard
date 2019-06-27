/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { fromJS, Map, List } from 'immutable';
import { AnyAction } from "redux";

import { UserState, Constants, Actions } from './types';


export const initialState: UserState = fromJS({
    userForm: {
        data: {
            isActive: true
        },
        errors: []
    },
    notFound: false,
    userRoles: [],
    permissions: []
});


function userReducer(state = initialState, action: AnyAction): UserState {

    switch (action.type) {

        case Constants.FETCH_USER_SUCCESS:
            return state
                .set('notFound', false)
                .setIn(['userForm', 'data'], Map((action as Actions.FetchUserSuccessAction).data));

        case Constants.FETCH_USER_ROLES_SUCCESS:
            return state
                .set('userRoles', List((action as Actions.FetchUserRolesSuccessAction).data));

        case Constants.FETCH_PERMISSIONS_SUCCESS:
            return state
                .set('permissions', List((action as Actions.FetchPermissionsSuccessAction).data));

        case Constants.RESET_USER_FORM:
            return state
                .set('userForm', initialState.get('userForm'));

        case Constants.CREATE_UPDATE_USER_FAILURE:
            return state
                .setIn(['userForm', 'errors'], List(action.data));

        case Constants.CREATE_UPDATE_USER_SUCCESS:
            return state
                .setIn(['userForm', 'errors'], List([]))
                .setIn(['userForm', 'data'], Map((action as Actions.CreateUpdateUserSuccess).data));

        case Constants.USER_NOT_FOUND:
            return state
                .set('notFound', true);

        default:
            return state;

    }

}


export default userReducer;