/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Empty } from 'antd';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Translate } from 'react-localize-redux';


type ResourceDoesNotExistProps = RouteComponentProps & {
    description: string;
    id: string;
    history: History;
}


const DEFAULT_MESSAGE = 'Resource does not exist'; // default info message
const DEFAULT_ID = 'resource-does-not-exist'; // default translation phrase id


/**
 * Show icon with text informing that queried resource does not exist
 * with link to go back in browser history.
 */
class ResourceDoesNotExist extends React.Component<ResourceDoesNotExistProps> {

    /**
     * Go back in browser history
     */
    handleBackClick = (): void => {
        this.props.history.goBack();
    };

    render() {
        const message = this.props.description || DEFAULT_MESSAGE;
        const id = this.props.id || DEFAULT_ID;

        return (
            <div style={{ textAlign: 'center' }}>
                <Empty
                    description={<Translate id={id}>{message}</Translate>} />
                <p><a onClick={() => this.handleBackClick()}><Translate id="back">Go back</Translate></a></p>
            </div>
        )
    }

}


export default withRouter<ResourceDoesNotExistProps>(ResourceDoesNotExist);