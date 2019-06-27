/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { put, takeLatest } from 'redux-saga/effects';
import { Container } from 'typedi';

import * as actions from './actions';
import { showNotification } from '@containers/App/actions';
import { Constants, Actions } from './types';
import { UserApi } from './api';
import { SuccessNotification, ErrorNotification } from '@utils/notification';



const userAPI = Container.get(UserApi);


function* fetchUsersSaga() {

    try {
        const response = yield userAPI.getUsers();

        yield put(actions.fetchUsersSuccess(response.data.data));
    } catch (e) {

    }

}


function* deleteRestoreUserSaga(action: Actions.DeleteRestoreUserAction) {

    let method = action.data.isDeleted ? userAPI.restoreUser : userAPI.deleteUser,
        notification;

    try {
        yield method(action.data.id);

        notification = new SuccessNotification( 'Users have been updated');
        yield put(actions.deleteRestoreUserSuccess(action.data.id));
    } catch (e) {
        notification = new ErrorNotification('Error while updating users');
    }

    yield put(showNotification(notification));
}


function* activateBlockUserSaga(action: Actions.ActivateBlockUserAction) {

    let method = action.data.isActive ? userAPI.blockUser : userAPI.activateUser,
        notification;

    try {
        yield method(action.data.id);

        notification = new SuccessNotification(action.data.isActive ? 'User has been blocked' : 'User has been activated');
        yield put(actions.activateBlockUserSuccess(action.data.id));
    } catch (e) {
        notification = new ErrorNotification('Error while updating user');
    }

    yield put(showNotification(notification));
}


function* userListSaga() {
    yield takeLatest(Constants.FETCH_USERS, fetchUsersSaga);
    yield takeLatest(Constants.DELETE_RESTORE_USER, deleteRestoreUserSaga);
    yield takeLatest(Constants.ACTIVATE_BLOCK_USER, activateBlockUserSaga);
}


export default userListSaga;