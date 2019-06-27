/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { put, takeLatest } from 'redux-saga/effects';
import { Container } from 'typedi';
import { UserActions } from './actions';
import { Constants, Actions } from './types';
import { UserApi } from '@containers/UserList/api';
import { UserRoleAPI, PermissionAPI } from '@utils/api/system';
import { showNotification } from '@containers/App/actions';

import {ErrorNotification, SuccessNotification} from '@utils/notification';
import {Models} from "@utils/types/models";


const actions = Container.get(UserActions);
const userAPI = Container.get(UserApi);
const userRoleAPI = Container.get(UserRoleAPI);
const permissionAPI = Container.get(PermissionAPI);


function* fetchUserSaga(action: Actions.FetchUserAction) {

    try {
        const response = yield userAPI.getUser(action.data);

        yield put(actions.fetchUserSuccess(response.data.data));
    } catch (e) {
        const notification = new ErrorNotification(e.response ? e.response.data.message : 'Error while fetching data');
        yield put(showNotification(notification));

        if ( e.response && e.response.data.status == '404' ) {
            yield put(actions.userNotFound());
        }
    }

}


function* fetchUserRolesSaga() {

    try {
        const response = yield userRoleAPI.getUserRoles();

        yield put(actions.fetchUserRolesSuccess(response.data.data));
    } catch (e) {

    }

}


function* fetchPermissionsSaga() {

    try {
        const response = yield permissionAPI.getPermissions();

        yield put(actions.fetchPermissionsSuccess(response.data.data));
    } catch (e) {

    }

}


function* createOrUpdateUserSaga(action: Actions.CreateUpdateUser) {

    let notification;

    try {
        const response = yield action.data.id ? userAPI.updateUser(action.data.id, action.data) : userAPI.createUser(<Models.UserCreateData>action.data);

        notification = new SuccessNotification('User has been updated');
        yield put(actions.createUpdateUserSuccess(response.data.data));
    } catch (e) {
        notification = new ErrorNotification('Error while updating user');

        if ( e.response && e.response.data.errors ) {
            yield put(actions.createUpdateUserFailure(e.response.data.errors));
        }
    }

    yield put(showNotification(notification));
}


function* userSaga() {
    yield takeLatest(Constants.FETCH_USER, fetchUserSaga);
    yield takeLatest(Constants.FETCH_USER_ROLES, fetchUserRolesSaga);
    yield takeLatest(Constants.FETCH_PERMISSIONS, fetchPermissionsSaga);
    yield takeLatest(Constants.CREATE_UPDATE_USER, createOrUpdateUserSaga);
}


export default userSaga;