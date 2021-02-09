import { Form, Input, Button, Select } from 'antd';
import './Form.css';
import React, { useReducer } from 'react';

const { Option } = Select;

const initialState = {
    loading: true,
    error: '',
    todos: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                loading: false,
                error: '',
                todos: action.payload
            };
        case 'SET_ERROR':
            return {
                loading: false,
                error: 'There are some errors',
                todos: []
            };
        default:
            return state;
    }
};
const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 9
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    }
};

const FormInput = () => {
    const [form] = Form.useForm();
    const [state, dispatch] = useReducer(reducer, initialState);

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!'
                });
                return;

            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!'
                });
                return;

            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!'
                });
                return;
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male'
        });
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
                name="note"
                label="Note"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Select placeholder="Select a option and change input text above" onChange={onGenderChange} allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}>
                {({ getFieldValue }) => {
                    return getFieldValue('gender') === 'other' ? (
                        <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    ) : null;
                }}
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormInput;
