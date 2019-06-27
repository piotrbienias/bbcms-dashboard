/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Container } from 'typedi';
import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './actions';
import { Constants, Actions } from './types';
import { ApiResponse } from "@utils/types/api";
import { showNotification } from '@containers/App/actions';
import { SuccessNotification, ErrorNotification } from '@utils/notification';
import { LanguageApi } from './api';


const api = Container.get(LanguageApi);


function* fetchLanguagesSaga() {

    try {
        const response: ApiResponse = yield api.getLanguages();

        yield put(actions.fetchLanguagesSuccess(response.data.data));
    } catch (e) {

    }

}


function* deleteLanguageSaga(action: Actions.DeleteLanguageAction) {

    let notification;

    try {
        yield api.deleteLanguage(action.data);

        notification = new SuccessNotification('Language has been deleted');
        yield put(showNotification(notification));
        yield put(actions.fetchLanguages());
    } catch (e) {
        notification = new ErrorNotification('Error while deleting language');
        yield put(showNotification(notification));
    }

}


function* restoreLanguageSaga(action: Actions.RestoreLanguageAction) {

    let notification;

    try {
        yield api.restoreLanguage(action.data);

        notification = new SuccessNotification('Language has been restored');
        yield put(showNotification(notification));
        yield put(actions.fetchLanguages());
    } catch (e) {
        notification = new ErrorNotification('Error while restoring language');
        yield put(showNotification(notification));
    }

}


function* createOrUpdateLanguageSaga(action: Actions.CreateLanguageAction | Actions.UpdateLanguageAction) {

    let notification;

    try {
        if ( action.data.id ) {
            yield api.updateLanguage(action.data.id, action.data);
        } else {
            yield api.createLanguage(action.data);
        }

        notification = new SuccessNotification(action.data.id ? 'Language has been updated' : 'Language has been created');
        yield put(actions.createUpdateLanguageSuccess());
        yield put(actions.hideModal());
        yield put(showNotification(notification));
        yield put(actions.fetchLanguages());
    } catch (e) {
        notification = new ErrorNotification('Error while updating languages');
        yield put(showNotification(notification));

        if ( e.response && e.response.data.errors ) {
            yield put(actions.createUpdateLanguageFailure(e.response.data.errors));
        }
    }

}



function* languageListSaga() {
    yield takeLatest(Constants.FETCH_LANGUAGES, fetchLanguagesSaga);
    yield takeLatest(Constants.DELETE_LANGUAGE, deleteLanguageSaga);
    yield takeLatest(Constants.RESTORE_LANGUAGE, restoreLanguageSaga);
    yield takeLatest([Constants.UPDATE_LANGUAGE, Constants.CREATE_LANGUAGE], createOrUpdateLanguageSaga);
}


export default languageListSaga;