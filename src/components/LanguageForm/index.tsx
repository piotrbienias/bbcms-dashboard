/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';


const FormItem = Form.Item;


export interface LanguageFormProps extends FormComponentProps {
    id?: number;
    name?: string;
    code?: string;
    errors: SingleFormError[];
    resetErrors(): void;
}

type SingleFormError = {
    path: string;
    message: string;
}


class LanguageForm extends React.Component<LanguageFormProps> {

    constructor(props: LanguageFormProps) {
        super(props);
    }

    /**
     * If `this.props.errors` length is > 0, show errors in the form
     * and instantly reset the `errors` property due to infinite update loop.
     *
     * Check if current language id is equal to previous id - if not, reset form fields.
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps: Readonly<LanguageFormProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if ( this.props.errors.length > 0 ) {
            let fields: {[key: string]: any} = {};
            this.props.errors.forEach((error: SingleFormError) => {
                if ( error.path ) {
                    fields[error.path] = { errors: [new Error(error.message)], value: this.props.form.getFieldValue(error.path) };
                }
            });

            this.props.resetErrors();
            this.props.form.setFields(fields);
        }

        if ( prevProps.id !== this.props.id ) {
            this.props.form.resetFields();
        }
    }

    /**
     * Reset form fields when unmounting the component.
     */
    componentWillUnmount(): void {
        this.props.form.resetFields();
    }


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
            <Form
                layout="vertical">
                {getFieldDecorator('id', {
                    initialValue: this.props.id
                })(
                    <Input type="hidden" />
                )}
                <FormItem
                    label="Name"
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Name is required' }
                        ],
                        initialValue: this.props.name
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="Code"
                    {...formItemLayout}>
                    {getFieldDecorator('code', {
                        rules: [
                            { required: true, message: 'Code is required' }
                        ],
                        initialValue: this.props.code
                    })(
                        <Input  />
                    )}
                </FormItem>
            </Form>
        )
    }

}


export default Form.create<LanguageFormProps>({})(LanguageForm);