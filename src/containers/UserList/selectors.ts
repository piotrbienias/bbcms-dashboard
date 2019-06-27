/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import {createSelector, Selector} from 'reselect';
import { Map } from "immutable";

import { initialState } from './reducer';
import { UserListState } from "@containers/UserList/types";
import { Models } from '@utils/types/models';


const getUserList = (state: Map<any, any>): UserListState => state.get('userList', initialState);


export const makeSelectUsers = (): Selector<UserListState, Models.User[]> => createSelector(
    [ getUserList ],
    ( userList: UserListState ) => userList.get('users').toJS()
);