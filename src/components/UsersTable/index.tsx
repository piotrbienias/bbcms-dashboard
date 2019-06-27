/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Table, Switch } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Models } from "@utils/types/models";
import { Translate, withLocalize, LocalizeContextProps } from 'react-localize-redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import RestoreTableRecordPopconfirm from '@components/RestoreTableRecordPopconfirm';
import DeleteTableRecordPopconfirm from '@components/DeleteTableRecordPopconfirm';
import EditTableRecordIcon from "@components/EditTableRecordIcon";


type UsersTableProps = LocalizeContextProps & RouteComponentProps & {
    currentUser: Models.User;
    users: Models.User[];
    handlePopconfirm(user: Models.User): void;
    handleSwitch(user: Models.User): void;
}


class UsersTable extends React.Component<UsersTableProps> {

    getColumns = (): ColumnProps<Models.User>[] => {
        return [
            {
                title: 'E-mail',
                key: 'email',
                dataIndex: 'email',
                width: '30%'
            },
            {
                title: <Translate id="user-role">Role</Translate>,
                key: 'userRole',
                dataIndex: 'userRole.name',
                width: '30%'
            },
            {
                title: <Translate id="is-active">Is active</Translate>,
                key: 'isActive',
                width: '30%',
                render: (user: Models.User) => {
                    return (
                        <Switch
                            title={this.props.currentUser.id === user.id ? "You can't block/activate your own account" : "Activate/block this user"}
                            disabled={user.isDeleted || this.props.currentUser.id === user.id}
                            defaultChecked={user.isActive}
                            onChange={() => this.props.handleSwitch(user)} />
                    );
                }
            },
            {
                title: <Translate id="manage-row-record">Manage</Translate>,
                key: 'manage',
                render: (user: Models.User) => {
                    return user.isDeleted ? (
                        <RestoreTableRecordPopconfirm
                            tooltipTitle={<Translate id="restore-user">Restore user</Translate>}
                            popconfirmTitle={<Translate id="restore-user-confirm">Do you want to restore this user?</Translate>}
                            onConfirm={() => this.props.handlePopconfirm(user)} />
                    ) : (
                        <div>
                            <EditTableRecordIcon
                                title={<Translate id="edit-user">Edit user</Translate>}
                                onClick={() => this.props.history.push(`/system/users/${user.id}`)} />
                            { this.props.currentUser.id !== user.id ? (
                                <DeleteTableRecordPopconfirm
                                    tooltipTitle={<Translate id="delete-user">Delete user</Translate>}
                                    popconfirmTitle={<Translate id="delete-user-confirm">Do you want to delete this user?</Translate>}
                                    onConfirm={() => this.props.handlePopconfirm(user)} />
                            ) : null }
                        </div>
                    )
                }
            }
        ]
    };

    render() {
        return (
            <Table
                dataSource={this.props.users}
                columns={this.getColumns()}
                rowClassName={(record: Models.User): string => record.isDeleted ? 'DeletedRow' : ''}
                rowKey={(record: Models.User): string => record.id.toString()} />
        )
    }

}


export default withLocalize(withRouter<UsersTableProps>(UsersTable));