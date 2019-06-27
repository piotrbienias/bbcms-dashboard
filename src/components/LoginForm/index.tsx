/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

/**
 * Login Form component
 */

import * as React from 'react';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/index.css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { FormComponentProps } from 'antd/lib/form/Form';
import { FormEvent } from 'react';


interface LoginFormProps {
    login(data: object): void;
}


class LoginForm extends React.Component<LoginFormProps & FormComponentProps> {

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        this.props.form.validateFields((err: Error, values: object) => {
            if ( ! err ) {
                this.props.login(values);
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form style={{ width: 400 }} onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'E-mail is required' }
                        ]
                    })(
                        <Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} placeholder="E-mail" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'Password is required' }
                        ]
                    })(
                        <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button style={{ float: 'right' }} type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        );
    }

}


export default Form.create<LoginFormProps & FormComponentProps>()(LoginForm);