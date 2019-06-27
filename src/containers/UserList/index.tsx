/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import {compose, bindActionCreators, Dispatch} from 'redux';
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import { withLocalize, LocalizeContextProps, Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import permission from '@utils/permission';

// Ant Design
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

import 'antd/lib/button/style/index.css';
import 'antd/lib/tooltip/style/index.css';

// Components
import UsersTable from '@components/UsersTable';

// Injectors
import injectReducer from '@utils/injectReducer';
import injectSaga from '@utils/injectSaga';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Types
import { UserListProperties } from './types';
import { Models } from "@utils/types/models";

// Actions
import {
    fetchUsers, deleteRestoreUser, activateBlockUser
} from './actions';

// Selectors
import { makeSelectUsers } from './selectors';
import { makeSelectUser } from '@containers/App/selectors';


type UserListActions = {
    fetchUsers(): void;
    deleteRestoreUser(user: Models.User): void;
    activateBlockUser(user: Models.User): void;
}


type UserListProps = UserListActions & UserListProperties & LocalizeContextProps;



class UserList extends React.Component<UserListProps> {

    /**
     * Actions to be done when component gets mounted:
     * - fetch users
     */
    componentDidMount(): void {
        this.props.fetchUsers();
    }

    /**
     * Handle delete/restore user popconfirm.
     *
     * @param user
     */
    handlePopconfirm = (user: Models.User): void => {
        this.props.deleteRestoreUser(user);
    };

    /**
     * Handle activate/block user switch.
     *
     * @param user
     */
    handleSwitch = (user: Models.User): void => {
        this.props.activateBlockUser(user);
    };

    render() {
        return (
            <div>
                <Row style={{ textAlign: 'right', marginBottom: 15 }}>
                    <Tooltip title={<Translate id="add-new-user">Add user</Translate>}>
                        <Link to='/system/users/new'>
                            <Button shape="circle" type="primary" icon="plus" />
                        </Link>
                    </Tooltip>
                </Row>
                <UsersTable
                    handleSwitch={this.handleSwitch}
                    handlePopconfirm={this.handlePopconfirm}
                    currentUser={this.props.user}
                    users={this.props.users} />
            </div>
        );
    }

}

const withPermission = permission({ userRoles: ['administrator'] });

const mapStateToProps = createStructuredSelector({
    user:               makeSelectUser(),
    users:              makeSelectUsers()
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchUsers,
            deleteRestoreUser,
            activateBlockUser
        },
        dispatch
    )
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer('userList', reducer);

const withSaga = injectSaga('userList', saga);


export default compose(
    withReducer,
    withSaga,
    withConnect,
    withPermission
)(withLocalize(UserList));