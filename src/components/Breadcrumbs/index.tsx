/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { History } from 'history';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon';

import 'antd/lib/breadcrumb/style/index.css';
import 'antd/lib/icon/style/index.css';


export type SingleBreadcrumb = {
    key: string;
    title: string | JSX.Element;
    id?: string;
    url: string;
}


type AppBreadcrumbsProps = {
    breadcrumbs: SingleBreadcrumb[];
    style: React.CSSProperties;
    history: History;
}



class AppBreadcrumbs extends React.Component<AppBreadcrumbsProps> {

    /**
     * Return array of JSX breadcrumb Elements
     */
    getBreadcrumbs = (): JSX.Element[] => {
        let breadcrumbs: JSX.Element[] = [this._getSingleBreadcrumb({ key: 'home', title: <Icon type="home" />, url: '/' })];

        this.props.breadcrumbs.forEach((breadcrumb: SingleBreadcrumb) => {
            breadcrumbs.push(this._getSingleBreadcrumb(breadcrumb));
        });

        return breadcrumbs;
    };

    /**
     * Return single breadcrumb JSX Element
     *
     * @param breadcrumb
     * @private
     */
    _getSingleBreadcrumb = (breadcrumb: SingleBreadcrumb): JSX.Element => {
        const title = breadcrumb.id ? <Translate id={breadcrumb.id}>{breadcrumb.title}</Translate> : breadcrumb.title;

        return (
            <Breadcrumb.Item
                key={breadcrumb.key}><Link to={breadcrumb.url}>{title}</Link></Breadcrumb.Item>
        );
    };

    render() {
        return (
            <Breadcrumb style={this.props.style}>
                { this.getBreadcrumbs() }
            </Breadcrumb>
        )
    }

}


export default AppBreadcrumbs;