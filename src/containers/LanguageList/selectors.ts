/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { LanguageListState } from './types';
import { Map } from "immutable";


const getLanguageList = (state: Map<string, any>): LanguageListState => state.get('languageList', initialState);


export const makeSelectLanguages = () => createSelector(
    [ getLanguageList ],
    ( languageList: LanguageListState ) => languageList.get('languages').toJS()
);

export const makeSelectModal = () => createSelector(
    [ getLanguageList ],
    ( languageList: LanguageListState ) => languageList.get('modal').toJS()
);