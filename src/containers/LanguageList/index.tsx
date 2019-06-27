/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import { Models } from "@utils/types/models";
import injectReducer from '@utils/injectReducer';
import injectSaga from '@utils/injectSaga';

import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

import 'antd/lib/button/style/index.css';
import 'antd/lib/tooltip/style/index.css';


// Components
import LanguagesTable from '@components/LanguagesTable';
import LanguageModal from '@components/LanguageModal';

// Actions
import {
    fetchLanguages, deleteLanguage, restoreLanguage, showModal, hideModal, updateLanguage, createLanguage,
    resetLanguageFormErrors
} from './actions';

// Selectors
import { makeSelectLanguages, makeSelectModal } from './selectors';
import { makeSelectUser } from '@containers/App/selectors';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';

// Permission
import permission from '@utils/permission';

// Types
import { LanguageModalType } from './types';



type LanguageListProps = RouteComponentProps & {
    languages: Models.Language[];
    modal: LanguageModalType;
    user: Models.User;
    fetchLanguages(): void;
    deleteLanguage(id: number): void;
    restoreLanguage(id: number): void;
    updateLanguage(data: LanguageModalType['data']): void;
    createLanguage(data: LanguageModalType['data']): void;
    showModal(data: LanguageModalType['data']): void;
    hideModal(): void;
    resetLanguageFormErrors(): void;
}



class LanguageList extends React.Component<LanguageListProps> {

    /**
     * Fetch all Languages when component mounts.
     */
    componentDidMount(): void {
        this.props.fetchLanguages();
    }

    /**
     * Handle Language Form submit depending on the form data.
     * If `data.id` is present, call the update method
     * otherwise create new language.
     *
     * @param data
     */
    handleFormSubmit = (data: LanguageModalType['data']) => {
        if ( data.id ) {
            this.props.updateLanguage(data);
        } else {
            this.props.createLanguage(data);
        }
    };

    render() {
        return (
            <div>
                <Row style={{ textAlign: 'right', marginBottom: 30 }}>
                    <Tooltip title="Add new language">
                        <Button type="primary" shape="circle" icon="plus" onClick={() => this.props.showModal({})} />
                    </Tooltip>
                </Row>
                <LanguageModal
                    resetErrors={this.props.resetLanguageFormErrors}
                    onSubmit={this.handleFormSubmit}
                    hideModal={this.props.hideModal}
                    {...this.props.modal} />
                <LanguagesTable
                    showModal={this.props.showModal}
                    restoreLanguage={this.props.restoreLanguage}
                    deleteLanguage={this.props.deleteLanguage}
                    languages={this.props.languages} />
            </div>
        )
    }

}

const mapStateToProps = createStructuredSelector({
    languages:                  makeSelectLanguages(),
    modal:                      makeSelectModal(),
    user:                       makeSelectUser()
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchLanguages,

            deleteLanguage,
            restoreLanguage,

            updateLanguage,
            createLanguage,

            showModal,
            hideModal,

            resetLanguageFormErrors,
        },
        dispatch
    );
};

const withReducer = injectReducer('languageList', reducer);

const withSaga = injectSaga('languageList', saga);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withPermission = permission({ permissions: ['manage-translations'] });


export default compose(
    withReducer,
    withSaga,
    withConnect,
    withPermission
)(withRouter<LanguageListProps>(LanguageList));