/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { TranslationPhraseListState } from './types';


const getTranslationPhraseList = (state: Map<string, any>): TranslationPhraseListState => state.get('translationPhraseList', initialState);


export const makeSelectTranslationPhrases = () => createSelector(
    [ getTranslationPhraseList ],
    ( translationPhraseList: TranslationPhraseListState ) => translationPhraseList.get('translationPhrases').toJS()
);

export const makeSelectLanguages = () => createSelector(
    [ getTranslationPhraseList ],
    ( translationPhraseList: TranslationPhraseListState ) => translationPhraseList.get('languages').toJS()
);

export const makeSelectModal = () => createSelector(
    [ getTranslationPhraseList ],
    ( translationPhraseList: TranslationPhraseListState ) => translationPhraseList.get('modal').toJS()
);