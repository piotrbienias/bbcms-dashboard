/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * Component injecting container's reducer
 */

import * as React from 'react';
import { Reducer } from 'redux';
import { ReactReduxContext } from 'react-redux';
import { AppStore } from '@config/store';
import hoistNonReactStatics from 'hoist-non-react-statics';


type ReducerInjectorProps = {
    [key: string]: any
};



export default (key: string, reducer: Reducer) => (WrappedComponent: React.ComponentType) => {

    class ReducerInjector extends React.Component<ReducerInjectorProps> {

        static contextType = ReactReduxContext;

        constructor(props: object, context: any) {
            super(props, context);

            (context.store as AppStore).injectReducer(key, reducer);
        }

        render() {
            return <WrappedComponent {...this.props} />
        }

    }

    // transfer all static properties from WrappedComponent to ReducerInjector so they will be accessible
    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};