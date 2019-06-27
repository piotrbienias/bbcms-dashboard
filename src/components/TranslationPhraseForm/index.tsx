/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import slugify from 'slugify';


export type TranslationPhraseFormProps = FormComponentProps & {
    id: number;
    phrase: string;
    label: string;
}


class TranslationPhraseForm extends React.Component<TranslationPhraseFormProps> {

    /**
     * When `phrase` field changes it's value, grab it, slugify it and
     * put it to the `label` field.
     *
     * @param e
     */
    handlePhraseChange = (e: React.FormEvent<HTMLInputElement>) => {
        const phrase = e.currentTarget.value;
        const label = slugify(phrase, { lower: true });

        this.props.form.setFieldsValue({ label });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        };

        return (
            <Form>
                {getFieldDecorator('id', {
                    initialValue: this.props.id
                })(
                    <Input type="hidden" />
                )}
                <Form.Item
                    label="Phrase"
                    {...formItemLayout}>
                    {getFieldDecorator('phrase', {
                        rules: [
                            { required: true, message: 'Phrase is required' }
                        ],
                        initialValue: this.props.phrase
                    })(
                        <Input onChange={this.handlePhraseChange}/>
                    )}
                </Form.Item>
                <Form.Item
                    label="Label"
                    {...formItemLayout}>
                    {getFieldDecorator('label', {
                        rules: [
                            { required: true, message: 'Label is required' }
                        ],
                        initialValue: this.props.label
                    })(
                        <Input />
                    )}
                </Form.Item>
            </Form>
        )
    }

}


export default Form.create<TranslationPhraseFormProps>()(TranslationPhraseForm);