/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Container } from 'typedi';
import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as constants from './constants';
import { TranslationPhraseApi, TranslationApi } from './api';
import { LanguageApi } from '@containers/LanguageList/api';
import { showNotification } from '@containers/App/actions';
import { DefaultActionType } from '@utils/types/index';
import { ErrorNotification, SuccessNotification } from "@utils/notification";
import {
    CreateUpdateTranslationAction,
    CreateUpdateTranslationPhraseAction,
    DeleteRestoreAction
} from "@containers/TranslationPhraseList/types";


const translationPhraseAPI = Container.get(TranslationPhraseApi);
const languageAPI = Container.get(LanguageApi);
const translationAPI = Container.get(TranslationApi);


function* fetchTranslationPhrasesSaga(action: DefaultActionType) {

    let notification;

    try {
        const response = yield translationPhraseAPI.getTranslationPhrases(action.data);

        yield put(actions.fetchTranslationPhrasesSuccess(response.data.data));
    } catch (e) {
        notification = new ErrorNotification('Error while fetching data');
        yield put(showNotification(notification));
    }

}


function* deleteRestoreTranslationPhraseSaga(action: DeleteRestoreAction) {

    let notification,
        method = action.type === constants.DELETE_TRANSLATION_PHRASE ? translationPhraseAPI.deleteTranslationPhrase : translationPhraseAPI.restoreTranslationPhrase;

    try {
        yield method(action.data.id);

        notification = new SuccessNotification('Translation phrases have been updated');
        yield put(showNotification(notification));
        yield put(actions.fetchTranslationPhrases({ page: action.data.page, perPage: action.data.perPage }));
    } catch (e) {
        notification = new ErrorNotification('Error while updating translation phrases');
        yield put(showNotification(notification));
    }
}

function* fetchLanguagesSaga() {

    try {
        const response = yield languageAPI.getLanguages();


        yield put(actions.fetchLanguagesSuccess(response.data.data));
    } catch (e) {

    }

}


function* createUpdateTranslationSaga(action: CreateUpdateTranslationAction) {

    let response,
        notification;

    try {
        if ( action.data.id ) {
            response = yield translationAPI.updateTranslation(action.data.id, action.data);
        } else {
            response = yield translationAPI.createTranslation(action.data);
        }

        notification = new SuccessNotification(response.data.message);
        yield put(showNotification(notification));
        yield put(actions.toggleReload());
    } catch (e) {
        notification = new ErrorNotification('Error while updating translations');
        yield put(showNotification(notification));
    }

}


function* createUpdateTranslationPhraseSaga(action: CreateUpdateTranslationPhraseAction) {

    let response,
        notification;

    try {
        if ( action.data.id ) {
            response = yield translationPhraseAPI.updateTranslationPhrase(action.data.id, action.data);
        } else {
            response = yield translationPhraseAPI.createTranslationPhrase(action.data);
        }

        notification = new SuccessNotification('Success', response.data.message);
        yield put(showNotification(notification));
        yield put(actions.toggleReload());
    } catch (e) {
        notification = new ErrorNotification('Failure', 'Error while updating translation phrases');
        yield put(showNotification(notification));

        if ( e.response && e.response.data.errors ) {
            yield put(actions.createUpdateTranslationPhraseFailure(e.response.data.errors));
        }
    }

}


function* translationPhraseListSaga() {
    yield takeLatest(constants.FETCH_TRANSLATION_PHRASES, fetchTranslationPhrasesSaga);
    yield takeLatest([constants.DELETE_TRANSLATION_PHRASE, constants.RESTORE_TRANSLATION_PHRASE], deleteRestoreTranslationPhraseSaga);
    yield takeLatest(constants.FETCH_LANGUAGES, fetchLanguagesSaga);
    yield takeLatest(constants.CREATE_UPDATE_TRANSLATION, createUpdateTranslationSaga);
    yield takeLatest(constants.CREATE_UPDATE_TRANSLATION_PHRASE, createUpdateTranslationPhraseSaga);
}


export default translationPhraseListSaga;