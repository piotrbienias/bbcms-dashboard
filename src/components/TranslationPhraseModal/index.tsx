/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Modal } from 'antd';
import { Models } from '@utils/types/models';

import TranslationPhraseForm, { TranslationPhraseFormProps } from '@components/TranslationPhraseForm';


type TranslationPhraseModalProps = {
    visible: boolean;
    data: Models.TranslationPhrase;
    errors: object[];
    hideModal(): void;
    onSubmit(data: object): void;
    resetFormErrors(): void;
}


class TranslationPhraseModal extends React.Component<TranslationPhraseModalProps> {

    private formRef: React.Component<TranslationPhraseFormProps>;

    /**
     * Save Form Reference
     * @param formRef
     */
    saveFormRef = (formRef: React.Component<TranslationPhraseFormProps>): void => {
        this.formRef = formRef;
    };

    /**
     * Handle Translation Phrase Form submit
     */
    handleFormSubmit = (): void => {
        const form = this.formRef.props.form;

        form.validateFields((err: Error, values: object) => {
            if (err) return;

            this.props.onSubmit(values);
        });
    };

    /**
     * Actions to be done when component updates:
     * - if `visible` is false, reset form fields
     * - if `errors` is array with more than 0 elements, show them on the form
     *   and reset instantly to prevent infinite loop
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<TranslationPhraseModalProps>): void {
        if ( ! this.props.visible && this.props.visible !== prevProps.visible ) {
            this.formRef.props.form.resetFields();
        }


        if ( this.props.errors.length > 0 ) {
            let errors: { [key: string]: object } = {};

            this.props.errors.forEach((error: { path: string, message: string }) => {
                errors[error.path] = { errors: [new Error(error.message)], value: this.formRef.props.form.getFieldValue(error.path) }
            });

            this.formRef.props.form.setFields(errors);
            this.props.resetFormErrors();
        }
    }

    render() {
        const title = this.props.data.id ? 'Update translation phrase' : 'Create new translation phrase';

        return (
            <Modal
                title={title}
                okText="Save"
                onOk={this.handleFormSubmit}
                onCancel={this.props.hideModal}
                visible={this.props.visible}>
                <TranslationPhraseForm
                    wrappedComponentRef={this.saveFormRef}
                    {...this.props.data} />
            </Modal>
        )
    }

}


export default TranslationPhraseModal;