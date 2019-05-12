import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import React from 'react';
import {createBoard} from "../firebase/boards";


class CreateBoard extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                createBoard(values).then(board => {
                    alert("成功")
                }, errors => {
                    alert(errors.toString())
                });
            }
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="create-board-form">
                <Form.Item label="看板名称">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入名称!'}],
                    })(
                        <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="毕业设计"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        创建看板
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default CreateBoard = Form.create({name: 'create-board'})(CreateBoard);
