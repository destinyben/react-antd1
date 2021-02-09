import './App.css';
import React, { useState } from 'react';
import { Form, Input, Button, Table, Space, Modal } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 6 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
// TABLE

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const initialValue = [
        {
            id: 1,
            key: 1,
            name: 'AAA',
            detail: 'AAA____AAAA'
        },
        {
            id: 2,
            key: 2,
            name: 'BBB',
            detail: 'BBB_FKEOKFO'
        },
        {
            id: 3,
            key: 3,
            name: 'CCC',
            detail: 'CKCOKOE_KELFKEOKP'
        }
    ];
    const [person, setPerson] = useState(initialValue);
    const onFinish = (values) => {
        let copy = [...initialValue];
        console.log(copy);
        copy = [
            ...person,
            { id: initialValue.length + 1, key: initialValue.length + 1, name: values.name, detail: values.detail }
        ];
        setPerson(copy);
        console.log('Success:', values.name, values.detail);
        form.resetFields();
    };

    const handleRemoveItem = (e) => {
        const newPerson = person.filter((item) => item.id !== e.id);
        setPerson(newPerson);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };

    const columns = [
        {
            title: 'Key',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail'
        },
        {
            title: 'Action',
            key: 'action',
            render: (data) => {
                return (
                    <Space size="middle">
                        <div>
                            <Button type="primary" onClick={showModal}>
                                Open Modal
                            </Button>
                            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </div>
                        <div>
                            <DeleteTwoTone onClick={() => handleRemoveItem(data)} />
                        </div>
                    </Space>
                );
            }
        }
    ];
    return (
        <div className="section">
            <h1>Add Person</h1>
            <Form
                {...layout}
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Detail"
                    name="detail"
                    rules={[{ required: true, message: 'Please input your Detail!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
            <br />
            <h1>Person List</h1>
            <Table columns={columns} dataSource={person} />
            <br />
        </div>
    );
};

export default App;
