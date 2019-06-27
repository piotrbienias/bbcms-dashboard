/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Container } from 'typedi';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { Models } from "@utils/types/models";

// Ant Design
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

// Components
import UserForm from '@components/UserForm';
import ResourceDoesNotExist from '@components/ResourceDoesNotExist';

// Injectors
import injectReducer from '@utils/injectReducer';
import injectSaga from '@utils/injectSaga';

// Types
import { UserComponent, UserRouteParams } from './types';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Selectors
import { makeSelectUserForm, makeSelectUserRoles, makeSelectPermissions, makeSelectNotFound } from './selectors';

// Actions
import { UserActions } from './actions';


const userActions = Container.get(UserActions);


class User extends React.Component<UserComponent & RouteComponentProps<UserRouteParams>> {

    /**
     * Actions to be dispatched when component gets mounted:
     * - fetch user roles
     * - fetch permissions
     * - if `match.params.id` is set, fetch user
     */
    componentDidMount(): void {
        this.props.fetchUserRoles();
        this.props.fetchPermissions();

        const userId = this.props.match.params.id;
        if ( userId ) {
            this.props.fetchUser(userId);
        }
    }

    /**
     * Actions to be dispatched when component gets updated:
     * - replace location to user edit if new user was created
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<UserComponent & RouteComponentProps<UserRouteParams>>): void {
        if ( !prevProps.userForm.data.id && this.props.userForm.data.id ) {
            this.props.history.replace(`/system/users/${this.props.userForm.data.id}`);
        }
    }

    /**
     * Handle user form submit by calling `props.createUpdateUser`.
     * Depending on the presence of `data.id` update or create API call is made.
     *
     * @param data
     */
    handleUserFormSubmit = (data: Models.UserCreateData | Models.UserUpdateData): void => {
        this.props.createUpdateUser(data);
    };

    render() {
        return (
            <Row>
                <Col>
                    { this.props.notFound ? (
                        <ResourceDoesNotExist
                            description="User does not exist"
                            id="user-does-not-exist" />
                    ) : (
                        <UserForm
                            handleSubmit={this.handleUserFormSubmit}
                            permissions={this.props.permissions}
                            userRoles={this.props.userRoles}
                            errors={this.props.userForm.errors}
                            user={this.props.userForm.data}
                            resetForm={this.props.resetUserForm}/>
                    ) }
                </Col>
            </Row>
        );
    }

}


const mapStateToProps = createStructuredSelector({
    userForm:       makeSelectUserForm(),
    userRoles:      makeSelectUserRoles(),
    permissions:    makeSelectPermissions(),
    notFound:       makeSelectNotFound()
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchUser: userActions.fetchUser,
            fetchUserRoles: userActions.fetchUserRoles,
            fetchPermissions: userActions.fetchPermissions,
            createUpdateUser: userActions.createUpdateUser,
            resetUserForm: userActions.resetUserForm
        },
        dispatch
    )
};

const withReducer = injectReducer('user', reducer);

const withSaga = injectSaga('user', saga);

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    withReducer,
    withSaga,
    withConnect
)(User);