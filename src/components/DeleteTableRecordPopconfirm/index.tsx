/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Tooltip, Popconfirm, Icon } from 'antd';

// @ts-ignore
import Styles from './style.scss';


type DeleteTableRecordPopconfirmProps = {
    tooltipTitle: string | JSX.Element;
    popconfirmTitle: string | JSX.Element;
    onConfirm(): void;
}


class DeleteTableRecordPopconfirm extends React.Component<DeleteTableRecordPopconfirmProps> {

    render() {
        return (
            <Tooltip
                title={this.props.tooltipTitle}
                placement="bottom">
                <Popconfirm
                    okType="danger"
                    title={this.props.popconfirmTitle}
                    onConfirm={() => this.props.onConfirm()}>
                    <Icon type="delete" className={Styles.DeletePopconfirm} />
                </Popconfirm>
            </Tooltip>
        )
    }

}


export default DeleteTableRecordPopconfirm;