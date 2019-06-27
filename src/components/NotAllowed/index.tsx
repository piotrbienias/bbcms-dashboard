/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Icon, Row, Col } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';


// @ts-ignore
import Styles from './styles.scss';


class NotAllowed extends React.Component<RouteComponentProps> {

    render() {
        return (
            <Row>
                <Col className={Styles.NotAllowedCol}>
                    <Icon className={Styles.NotAllowedIcon} type="warning" />
                    <p>You are not allowed to access this section.</p>
                    <a onClick={() => { this.props.history.push('/') }}>Back to home.</a>
                </Col>
            </Row>
        )
    }

}


export default withRouter<RouteComponentProps>(NotAllowed);