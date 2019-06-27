/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * App selectors
 */

import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { ApplicationState } from './types';


const getApp = (state: Map<any, any>): ApplicationState => state.get('app', initialState);


export const makeSelectLogin = () => createSelector(
    [ getApp ],
    ( app: ApplicationState ) => app.get("login").toJS()
);

export const makeSelectUser = () => createSelector(
    [ getApp ],
    ( app: ApplicationState ) => app.get('user').toJS()
);

export const makeSelectNotification = () => createSelector(
    [ getApp ],
    ( app: ApplicationState ) => app.get('notification').toJS()
);

export const makeSelectBreadcrumbs = () => createSelector(
    [ getApp ],
    ( app: ApplicationState ) => app.get('breadcrumbs').toJS()
);

export const makeSelectTranslation = () => createSelector(
    [ getApp ],
    ( app: ApplicationState ) => app.get('translation').toJS()
);