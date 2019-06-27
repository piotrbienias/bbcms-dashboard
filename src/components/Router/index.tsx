/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';

const LanguageList = loadable(() => import('@containers/LanguageList'));
const TranslationPhraseList = loadable(() => import('@containers/TranslationPhraseList'));

const UserList = loadable(() => import('@containers/UserList'));
const User = loadable(() => import('@containers/User'));


const routes = (
    <div>
        <Switch>
            <Route exact path="/system/users/new" component={User} />
            <Route exact path="/system/users" component={UserList} />
            <Route path="/system/users/:id" component={User} />
            <Route path="/i18n/languages" component={LanguageList} />
            <Route path="/i18n/phrases" component={TranslationPhraseList} />
        </Switch>
    </div>
);


export default routes;