/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { createSelector } from 'reselect';
import { Map } from "immutable";

import { initialState } from './reducer';
import { UserState } from "@containers/User/types";


const getUser = (state: Map<any, any>): UserState => state.get('user', initialState);


export const makeSelectUserForm = () => createSelector(
    [ getUser ],
    ( user: UserState ) => user.get('userForm').toJS()
);

export const makeSelectUserRoles = () => createSelector(
    [ getUser ],
    ( user: UserState ) => user.get('userRoles').toJS()
);

export const makeSelectPermissions = () => createSelector(
    [ getUser ],
    ( user: UserState ) => user.get('permissions').toJS()
);

export const makeSelectNotFound = () => createSelector(
    [ getUser ],
    ( user: UserState ) => user.get('notFound')
);