/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { History } from 'history';
import { Link } from 'react-router-dom';

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Models } from "@utils/types/models";
import { checkUserPermission } from '@utils/functions';
import { LocalizeContextProps, withLocalize, Translate } from 'react-localize-redux';


type MenuItem = {
    key: string;
    title: string
    icon?: JSX.Element;
    url?: string;
    permission?: {
        userRoles?: string[];
        permissions?: string[];
    }
    subMenu?: MenuItem[];
}

type AppMenuProps = {
    history: History;
    user: Models.User;
}

const { SubMenu, Item } = Menu;

const MENU_ITEMS: MenuItem[] = [
    {
        key: 'translation',
        title: 'i18n',
        icon: <Icon type="flag" />,
        subMenu: [
            {
                key: 'languages',
                title: 'Languages',
                url: '/i18n/languages',
                permission: {
                    permissions: ['manage-translations']
                }
            },
            {
                key: 'phrases',
                title: 'Phrases',
                url: '/i18n/phrases',
                permission: {
                    permissions: ['manage-translations']
                }
            }
        ]
    },
    {
        key: 'system',
        title: 'System',
        icon: <Icon type="setting" />,
        subMenu: [
            {
                key: 'users',
                title: 'Users',
                url: '/system/users',
                permission: {
                    userRoles: ['administrator']
                }
            }
        ]
    }
];


class AppMenu extends React.Component<AppMenuProps & LocalizeContextProps> {

    /**
     * Return menu items recursively.
     *
     * @param menuItems
     */
    getMenuItems = (menuItems: MenuItem[]): JSX.Element[]=> {
        return menuItems.map(menuItem => {
            return menuItem.subMenu ? this.getSubMenuItems(menuItem) : (
                this.getMenuItem(menuItem)
            );
        });
    };

    /**
     * Return menu item with sub menu.
     *
     * @param menuItem
     */
    getSubMenuItems = (menuItem: MenuItem): JSX.Element => {
        const title = <span>{menuItem.icon} <Translate id={menuItem.key}>{menuItem.title}</Translate></span>;
        const subMenu = (
            <SubMenu key={menuItem.key} title={title}>
                {this.getMenuItems(menuItem.subMenu)}
            </SubMenu>
        );

        if ( menuItem.permission ) {
            return checkUserPermission(this.props.user, menuItem.permission) ? subMenu : null;
        }

        return subMenu;
    };

    /**
     * Return single menu item.
     *
     * @param menuItem
     */
    getMenuItem = (menuItem: MenuItem) => {
        const title = menuItem.url ? <Link to={menuItem.url}><Translate id={menuItem.key}>{menuItem.title}</Translate></Link> : <Translate id={menuItem.key}>menuItem.title</Translate>;
        const item = <Item key={menuItem.key}>{title}</Item>;

        if ( menuItem.permission ) return checkUserPermission(this.props.user, menuItem.permission) ? item : null;

        return item;
    };

    render() {
        return (
            <Menu
                theme="dark"
                mode="inline">{this.getMenuItems(MENU_ITEMS)}</Menu>
        )
    }

}


export default withLocalize(AppMenu);