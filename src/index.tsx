/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import 'reflect-metadata';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from '@config/store';
import { LocalizeProvider } from 'react-localize-redux';

import App from '@containers/App'
import { HotModule } from '@utils/types/index';


const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <LocalizeProvider store={store} getState={state => state.get('localize')}>
                <App history={history} />
            </LocalizeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

render();

if ( process.env.NODE_ENV !== 'production' && (module as HotModule).hot ) {
    (module as HotModule).hot.accept('./containers/App', render);
}