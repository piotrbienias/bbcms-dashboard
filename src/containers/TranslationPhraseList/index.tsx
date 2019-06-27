/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '@utils/injectReducer';
import injectSaga from '@utils/injectSaga';

import { TranslationPhraseListProps } from './types';

// Ant Design
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

import 'antd/lib/button/style/index.css';
import 'antd/lib/tooltip/style/index.css';

// Components
import TranslationPhrasesTable from '@components/TranslationPhrasesTable';
import TranslationPhraseModal from '@components/TranslationPhraseModal';

// Actions
import {
    fetchTranslationPhrases, deleteTranslationPhrase, restoreTranslationPhrase, fetchLanguages,
    createUpdateTranslation, toggleReload, setPage, showModal, hideModal, createUpdateTranslationPhrase,
    resetModalFormErrors
} from './actions';

// Selectors
import { makeSelectLanguages, makeSelectTranslationPhrases, makeSelectModal } from './selectors';

// Reducer
import reducer from './reducer';

// Saga
import saga from './saga';
import {Models} from "@utils/types/models";



class TranslationPhraseList extends React.Component<TranslationPhraseListProps> {

    /**
     * Fetch data when component mounts itself.
     */
    componentDidMount(): void {
        this.props.fetchLanguages();
        this.props.fetchTranslationPhrases({ page: this.props.translationPhrases.page, perPage: this.props.translationPhrases.perPage });
    }

    /**
     * Actions to be done when component updates:
     * - check `reload` property - if it is true and previous value was false
     *   refetch the translation phrases and toggle the `reload` property via `toggleReload` method.
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<TranslationPhraseListProps>): void {
        if ( ! prevProps.translationPhrases.reload && this.props.translationPhrases.reload ) {
            this.props.fetchTranslationPhrases({
                page: this.props.translationPhrases.page,
                perPage: this.props.translationPhrases.perPage
            });

            this.props.toggleReload();
        }
    }

    /**
     * Handle Translation form submit.
     *
     * @param data
     */
    handleTranslationFormSubmit = (data: Models.Translation) => {
        this.props.createUpdateTranslation(data);
    };

    /**
     * Handle Translation Phrase form submit.
     *
     * @param data
     */
    handleTranslationPhraseFormSubmit = (data: Models.TranslationPhrase): void => {
        this.props.createUpdateTranslationPhrase(data);
    };

    showModal = (): void => {
        let data: Models.TranslationPhrase = { id: null, phrase: null, label: null };
        this.props.showModal(data);
    };

    render() {
        return (
            <div>
                <Row style={{ textAlign: 'right', marginBottom: 15 }}>
                    <Tooltip title="Add new phrase">
                        <Button onClick={() => this.showModal()} shape="circle" type="primary" icon="plus" />
                    </Tooltip>
                </Row>
                <TranslationPhrasesTable
                    languages={this.props.languages}
                    translationPhrases={this.props.translationPhrases.data}
                    total={this.props.translationPhrases.total}
                    loading={this.props.translationPhrases.loading}
                    perPage={this.props.translationPhrases.perPage}
                    setPage={this.props.setPage}
                    deletePhrase={this.props.deleteTranslationPhrase}
                    restorePhrase={this.props.restoreTranslationPhrase}
                    fetchData={this.props.fetchTranslationPhrases}
                    showModal={this.props.showModal}
                    handleTranslationFormSubmit={this.handleTranslationFormSubmit} />
                <TranslationPhraseModal
                    {...this.props.modal}
                    resetFormErrors={this.props.resetModalFormErrors}
                    onSubmit={this.handleTranslationPhraseFormSubmit}
                    hideModal={this.props.hideModal} />
            </div>
        )
    }

}


const mapStateToProps = createStructuredSelector({
    translationPhrases:                         makeSelectTranslationPhrases(),
    languages:                                  makeSelectLanguages(),
    modal:                                      makeSelectModal()
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            fetchTranslationPhrases,
            fetchLanguages,

            deleteTranslationPhrase,
            restoreTranslationPhrase,

            createUpdateTranslation,

            toggleReload,

            setPage,

            showModal,
            hideModal,
            resetModalFormErrors,

            createUpdateTranslationPhrase
        },
        dispatch
    )
};

const withReducer = injectReducer('translationPhraseList', reducer);

const withSaga = injectSaga('translationPhraseList', saga);

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    withReducer,
    withSaga,
    withConnect
)(TranslationPhraseList);