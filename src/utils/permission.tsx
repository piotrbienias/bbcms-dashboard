/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */


import * as React from 'react';
import { Models } from '@utils/types/models';
import NotAllowed from '@components/NotAllowed';
import { checkUserPermission } from '@utils/functions';


type PermissionProps = {
    user: Models.User
};



export default (permission: { userRoles?: string[], permissions?: string[] } = { userRoles: [], permissions: [] }) => (WrappedComponent: React.ComponentType) => {

    class Permission extends React.Component<PermissionProps> {

        render() {
            // if current user does not meet permission requirements, return <NotAllowed /> component, otherwise proceed normally
            return checkUserPermission(this.props.user, permission) ? <WrappedComponent {...this.props} /> : <NotAllowed />
        }

    }

    return Permission;
};