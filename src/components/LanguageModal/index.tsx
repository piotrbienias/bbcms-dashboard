/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Modal } from 'antd';

import LanguageForm, { LanguageFormProps } from '@components/LanguageForm';
import { LanguageModalType, SingleFormError } from "@containers/LanguageList/types";


type LanguageModalProps = {
    data: LanguageModalType['data'];
    visible: boolean;
    errors: SingleFormError[];
    hideModal(): void;
    onSubmit(data: LanguageModalType['data']): void;
    resetErrors(): void;
}


class LanguageModal extends React.Component<LanguageModalProps> {

    private formRef: React.Component<LanguageFormProps>;

    /**
     * Save Form reference to get access to the form component.
     *
     * @param formRef
     */
    saveFormRef = (formRef: React.Component<LanguageFormProps>) => {
        this.formRef = formRef;
    };

    /**
     * Handle Form submit by validating the form and calling
     * `this.props.onSubmit` function with form values.
     */
    handleSubmit = () => {
        const form = this.formRef.props.form;

        form.validateFields((err: Error, values: object) => {
            if (err) return;

            if ( this.props.onSubmit && typeof this.props.onSubmit === 'function' ) {
                this.props.onSubmit(values);
            }
        });
    };

    render() {
        const title = this.props.data.id ? <span>Edit language <strong>{this.props.data.code}</strong></span> : 'Add new language';

        return (
            <Modal
                okText="Save"
                onOk={this.handleSubmit}
                onCancel={this.props.hideModal}
                title={title}
                visible={this.props.visible}>
                <LanguageForm
                    resetErrors={this.props.resetErrors}
                    wrappedComponentRef={this.saveFormRef}
                    errors={this.props.errors}
                    {...this.props.data} />
            </Modal>
        )
    }

}


export default LanguageModal;