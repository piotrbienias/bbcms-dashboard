/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import {Table, Icon} from 'antd';
import {PaginationConfig, ColumnProps} from 'antd/lib/table';
import {Models} from '@utils/types/models';
import {
    CreateUpdateTranslationAction,
    DeleteRestoreAction,
    FetchOptions
} from '@containers/TranslationPhraseList/types';
import { Translate } from 'react-localize-redux';

// Components
import RestoreTableRecordPopconfirm from '@components/RestoreTableRecordPopconfirm';
import DeleteTableRecordPopconfirm from '@components/DeleteTableRecordPopconfirm';
import EditTableRecordIcon from '@components/EditTableRecordIcon';
import TranslationInlineForm from '@components/TranslationInlineForm';


type TranslationPhrasesTableProps = {
    translationPhrases: Models.TranslationPhrase[];
    languages: Models.Language[];
    loading: boolean;
    perPage?: number;
    total: number;
    fetchData(options: FetchOptions): void;
    deletePhrase(data: DeleteRestoreAction['data']): void;
    restorePhrase(data: DeleteRestoreAction['data']): void;
    handleTranslationFormSubmit(data: CreateUpdateTranslationAction['data']): void;
    setPage(page: number): void;
    showModal(data: Models.TranslationPhrase): void;
}

type TranslationForm = {
    language: number;
    translationPhrase: number;
    translation: Models.Translation
}


class TranslationPhrasesTable extends React.Component<TranslationPhrasesTableProps> {

    /**
     * Component state
     */
    state: {
        pagination: PaginationConfig,
        translationForm: TranslationForm
    } = {
        pagination: {pageSize: this.props.perPage || 10, current: 1},
        translationForm: {
            language: null,
            translationPhrase: null,
            translation: null
        }
    };


    /**
     * Return columns for Table
     */
    getColumns = (): Array<ColumnProps<Models.TranslationPhrase>> => {
        let columns: Array<ColumnProps<Models.TranslationPhrase>> = [
            {
                title: <Translate id="phrase">Phrase</Translate>,
                // dataIndex: 'phrase',
                key: 'phrase',
                width: '20%',
                render: (phrase: Models.TranslationPhrase) => {
                    return (
                        <div>
                            {phrase.phrase}<br />
                            <span style={{ fontSize: 10 }}>{phrase.label}</span>
                        </div>
                    )
                }
            }
        ];

        /**
         * Iterate over all available languages. If current language is not deleted
         * use it as a Table Column. In every cell under this column there will be
         * a Translation object for given Language and for given Translation Phrase.
         * If Translation is present - show it, otherwise show + sign to add new one.
         */
        this.props.languages.forEach((language: Models.Language) => {
            let width = 70 / this.props.languages.length;
            if (!language.isDeleted) {
                columns.push({
                    title: `${language.name} (${language.code})`,
                    key: language.code,
                    width: `${width}%`,
                    render: (phrase: Models.TranslationPhrase) => {
                        let translation: Models.Translation = phrase.translations.find((translation: Models.Translation) => {
                            return translation.language === language.id;
                        });

                        translation = translation ? translation : {
                            id: null,
                            translation: phrase.phrase,
                            language: language.id,
                            translationPhrase: phrase.id
                        };

                        const translationForm = this.state.translationForm;
                        return (
                            translationForm.language === language.id && translationForm.translationPhrase === phrase.id
                        ) ? <TranslationInlineForm
                            {...translation}
                            resetForm={this.resetTranslationForm}
                            onSubmit={this.props.handleTranslationFormSubmit}/> : this._getTranslationCell(translation);
                    }
                });
            }
        });

        /**
         * Add manage cells.
         */
        columns.push(this._getManageCell());


        return columns;
    };

    /**
     * Render single cell for single Translation.
     *
     * @param translation
     * @private
     */
    _getTranslationCell = (translation: Models.Translation) => {
        return translation.id ? (
            <span onClick={() => this.setTranslationForm(translation)}
                  style={{cursor: 'pointer'}}>{translation.translation}</span>
        ) : <Icon onClick={() => this.setTranslationForm(translation)} type="plus" style={{cursor: 'pointer'}}/>;
    };

    /**
     * Render manage cell for Translation Phrase.
     *
     * @private
     */
    _getManageCell = (): ColumnProps<Models.TranslationPhrase> => {
        return {
            title: <Translate id="manage-row-record">Manage</Translate>,
            key: 'manage',
            width: '10%',
            render: (phrase: Models.TranslationPhrase) => {
                const actionData: DeleteRestoreAction['data'] = {
                    id: phrase.id,
                    page: this.state.pagination.current,
                    perPage: this.state.pagination.pageSize
                };

                return phrase.isDeleted ? (
                    <RestoreTableRecordPopconfirm
                        tooltipTitle={<Translate id="restore-translation-phrase">Restore phrase</Translate>}
                        popconfirmTitle={<span><Translate id="confirm-restore-phrase">Do you want to restore phrase</Translate> <strong>{phrase.phrase}</strong></span>}
                        onConfirm={() => this.props.restorePhrase(actionData)}/>
                ) : (
                    <div>
                        <EditTableRecordIcon
                            title="Edit phrase" onClick={() => this.props.showModal(phrase)}/>
                        <DeleteTableRecordPopconfirm
                            tooltipTitle="Delete phrase"
                            popconfirmTitle={<span>Do you want to delete phrase <strong>{phrase.phrase}</strong></span>}
                            onConfirm={() => this.props.deletePhrase(actionData)}/>
                    </div>
                )
            }
        }
    };

    /**
     * Set current translation form as active.
     *
     * @param translation
     */
    setTranslationForm = (translation: Models.Translation) => {
        let data = {
            language: translation.language,
            translationPhrase: translation.translationPhrase,
            translation
        };
        this.setState({translationForm: data});
    };

    /**
     * Hide any active translation form.
     */
    resetTranslationForm = () => {
        let data: object = {
            language: null,
            translationPhrase: null,
            translation: null
        };
        this.setState({translationForm: data});
    };

    /**
     * Update the table's `pagination` property when fetching data is finished,
     * as well as update the total number of records.
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<TranslationPhrasesTableProps>): void {
        if (this.props.loading !== prevProps.loading) {
            let pagination: PaginationConfig = {...this.state.pagination};
            pagination.total = this.props.total;
            let translationForm: object = { language: null, translationPhrase: null, translation: null };
            this.setState({ pagination: pagination, translationForm });
        }
    }

    /**
     * Handles table data change.
     *
     * @param pagination
     */
    handleDataChange = (pagination: PaginationConfig): void => {
        const pager: any = {...this.state.pagination};
        pager.current = pagination.current;

        this.props.setPage(pager.current);

        const translationForm: object = { language: null, translationPhrase: null, translation: null };
        this.setState({ pagination: pager, translationForm });

        let fetchOptions: FetchOptions = this._computeFetchOptions(pagination);
        this.props.fetchData(fetchOptions);
    };

    /**
     * Compute fetch data options basing on current pagination object.
     *
     * @param pagination
     * @private
     */
    _computeFetchOptions = (pagination: PaginationConfig): FetchOptions => {
        let fetchOptions: FetchOptions = {page: pagination.current};
        if (this.props.perPage) fetchOptions.perPage = this.props.perPage;

        return fetchOptions;
    };

    render() {
        return (
            <Table
                rowKey={phrase => phrase.phrase}
                rowClassName={phrase => phrase.isDeleted ? 'DeletedRow' : ''}
                pagination={this.state.pagination}
                onChange={this.handleDataChange}
                loading={this.props.loading}
                dataSource={this.props.translationPhrases}
                columns={this.getColumns()}/>
        )
    }

}


export default TranslationPhrasesTable;