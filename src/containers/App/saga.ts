/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App saga
 */

import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { Container } from 'typedi';
import {LOGIN, FETCH_CURRENT_USER, FETCH_TRANSLATIONS, FETCH_LANGUAGES, LOGOUT} from './constants';
import {
    loginSuccess,
    loginFailure,
    fetchCurrentUserSuccess,
    fetchCurrentUserFailure,
    fetchTranslationsSuccess, fetchLanguagesSuccess, logoutSuccess
} from './actions';
import { login, logout, getCurrentUser } from './api';
import { AnyAction } from "redux";
import { ApiResponse } from '@utils/types/api';
import { LOCATION_CHANGE } from "connected-react-router";
import { LanguageApi } from '@containers/LanguageList/api';
import { setActiveLanguage, addTranslationForLanguage } from 'react-localize-redux';


const languageAPI = Container.get(LanguageApi);


function* loginSaga(action: AnyAction): IterableIterator<any> {
    
    try {
        const response: ApiResponse = yield login(action.data);

        yield put(loginSuccess(response.data.data));
    } catch (e) {
        yield put(loginFailure(e.response ? e.response.data : {}));
    }

}


function* logoutSaga(): IterableIterator<any> {

    try {
        yield logout();

        yield put(logoutSuccess());
    } catch (e) {

    }

}


function* fetchCurrentUserSaga(): IterableIterator<any> {

    try {
        const response: ApiResponse = yield getCurrentUser();

        yield put(fetchCurrentUserSuccess(response.data.data));
    } catch (e) {
        yield put(fetchCurrentUserFailure(e.response ? e.response.data : null));
    }

}


function* fetchTranslationsSaga(action: AnyAction): IterableIterator<any> {

    try {
        const response: ApiResponse = yield languageAPI.getLanguageTranslations(action.data);

        yield put(fetchTranslationsSuccess(response.data.data));
        yield put(addTranslationForLanguage(response.data.data, action.data));
        yield put(setActiveLanguage(action.data));
    } catch (e) {

    }

}


function* fetchLanguagesSaga(): IterableIterator<any> {

    try {
        const response: ApiResponse = yield languageAPI.getLanguages();

        yield put(fetchLanguagesSuccess(response.data.data));
    } catch (e) {

    }

}


function* appSaga(): IterableIterator<any> {
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(FETCH_CURRENT_USER, fetchCurrentUserSaga);
    yield takeEvery(LOCATION_CHANGE, fetchCurrentUserSaga);
    yield takeLatest(FETCH_TRANSLATIONS, fetchTranslationsSaga);
    yield takeLatest(FETCH_LANGUAGES, fetchLanguagesSaga);
}


export default appSaga;