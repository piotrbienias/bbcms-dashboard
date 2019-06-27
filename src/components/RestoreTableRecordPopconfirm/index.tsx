/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Tooltip, Popconfirm, Icon } from 'antd';

// @ts-ignore
import Styles from './style.scss';


type RestoreTableRecordPopconfirmProps = {
    tooltipTitle: string | JSX.Element;
    popconfirmTitle: string | JSX.Element;
    onConfirm(): void;
}


class RestoreTableRecordPopconfirm extends React.Component<RestoreTableRecordPopconfirmProps> {

    render() {
        return (
            <Tooltip
                title={this.props.tooltipTitle}
                placement="bottom">
                <Popconfirm
                    title={this.props.popconfirmTitle}
                    onConfirm={() => this.props.onConfirm()}>
                    <Icon type="reload" className={Styles.RestorePopconfirm} />
                </Popconfirm>
            </Tooltip>
        )
    }

}


export default RestoreTableRecordPopconfirm;