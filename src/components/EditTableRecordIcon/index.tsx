/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Icon, Tooltip } from 'antd';

// @ts-ignore
import Styles from './style.scss';


type EditTableRecordIconProps = {
    title: string | JSX.Element;
    onClick(): void;
}


class EditTableRecordIcon extends React.Component<EditTableRecordIconProps> {

    render() {
        return (
            <Tooltip
                placement="bottom"
                title={this.props.title}>
                <Icon
                    onClick={() => this.props.onClick()}
                    type="edit"
                    className={Styles.EditIcon} />
            </Tooltip>
        )
    }

}


export default EditTableRecordIcon;