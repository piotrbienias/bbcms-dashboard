/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';


interface TranslationInlineFormProps extends FormComponentProps {
    id: number;
    language: number;
    translationPhrase: number;
    translation?: string;
    resetForm(): void;
    onSubmit(data: any): void;
}


class TranslationInlineForm extends React.Component<TranslationInlineFormProps> {

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        this.props.form.validateFields((err: Error, values: object) => {
            if (err) return;

            this.props.onSubmit(values);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form
                onSubmit={this.handleSubmit}
                layout="inline">
                <Form.Item>
                    {getFieldDecorator('translation', {
                        rules: [
                            { required: true, message: ' ' }
                        ],
                        initialValue: this.props.translation
                    })(
                        <Input size="small" />
                    )}
                </Form.Item>
                {getFieldDecorator('id', {
                    initialValue: this.props.id
                })(
                    <Input type="hidden" />
                )}
                {getFieldDecorator('language', {
                    rules: [
                        { required: true }
                    ],
                    initialValue: this.props.language
                })(
                    <Input type="hidden" />
                )}
                {getFieldDecorator('translationPhrase', {
                    rules: [
                        { required: true }
                    ],
                    initialValue: this.props.translationPhrase
                })(
                    <Input type="hidden" />
                )}
                <Form.Item>
                    <Button type="primary" size="small" icon="check" htmlType="submit" />
                    <Button style={{ marginLeft: 10 }} type="default" size="small" icon="close" onClick={() => this.props.resetForm()} />
                </Form.Item>
            </Form>
        )
    }

}


export default Form.create<TranslationInlineFormProps>()(TranslationInlineForm);