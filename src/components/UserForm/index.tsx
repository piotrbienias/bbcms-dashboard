/*
 * Author: Piotr Bienias
 * Project: bbcms
 * Copyright (c) 2019.
 */

import * as React from 'react';
import { Form, Input, Select, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Models } from "@utils/types/models";
import { ApiValidationError } from "@utils/types/api";


type UserFormProps = FormComponentProps & {
    user: Models.User;
    errors: ApiValidationError[];
    userRoles: Models.UserRole[];
    permissions: Models.Permission[];
    handleSubmit(data: Models.UserCreateData | Models.UserUpdateData): void;
    resetForm(): void;
}


/**
 * User model form for creating and updating user instances.
 */
class UserForm extends React.Component<UserFormProps> {

    /**
     * Return User Role select HTML options
     */
    getUserRoleOptions = (): Array<JSX.Element> => {
        return this.props.userRoles.map((userRole: Models.UserRole) => {
            return <Select.Option key={userRole.label} value={userRole.label}>{userRole.name}</Select.Option>
        });
    };

    /**
     * Return Permission select HTML options
     */
    getPermissionOptions = (): Array<JSX.Element> => {
        return this.props.permissions.map((permission: Models.Permission) => {
            return <Select.Option key={permission.label} value={permission.label}>{permission.name}</Select.Option>;
        });
    };

    /**
     * Actions to be done when component gets unmounted:
     * - reset form fields
     */
    componentWillUnmount(): void {
        this.props.resetForm();
    }

    /**
     * Handle form submit by validating the form and calling
     * the `props.handleSubmit` method with form values.
     *
     * @param e
     */
    handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) return;

            this.props.handleSubmit(values);
        });
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
            <Form
                onSubmit={this.handleSubmit}>
                {getFieldDecorator('id', {
                    initialValue: this.props.user.id
                })(
                    <Input type="hidden" />
                )}
                <Form.Item
                    label="E-mail"
                    {...formItemLayout}>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'E-mail is required' }
                        ],
                        initialValue: this.props.user.email
                    })(
                        <Input type="email" />
                    )}
                </Form.Item>

                <Form.Item
                    label="Role"
                    {...formItemLayout}>
                    {getFieldDecorator('userRole', {
                        rules: [
                            { required: true, message: 'Role is required' }
                        ],
                        initialValue: this.props.user.userRole ? this.props.user.userRole.label : null
                    })(
                        <Select>{ this.getUserRoleOptions() }</Select>
                    )}
                </Form.Item>

                <Form.Item
                    label="Name"
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: this.props.user.name
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="Last name"
                    {...formItemLayout}>
                    {getFieldDecorator('lastName', {
                        initialValue: this.props.user.lastName
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="Is active"
                    {...formItemLayout}>
                    {getFieldDecorator('isActive', {
                        valuePropName: 'checked',
                        initialValue: this.props.user.isActive,
                    })(
                        <Checkbox />
                    )}
                </Form.Item>

                <Form.Item
                    label="Permissions"
                    {...formItemLayout}>
                    {getFieldDecorator('permissions', {
                        initialValue: this.props.user.permissions
                    })(
                        <Select mode="multiple">{this.getPermissionOptions()}</Select>
                    )}
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Form>
        )
    }

}


export default Form.create<UserFormProps>()(UserForm);