import React from 'react';
import {List, Avatar, Icon, Button, Skeleton, Table, Tag, Form, Input, Select, Popconfirm} from 'antd';
import {createBoard, getUserBoards} from "../firebase/boards";

const Option = Select.Option;

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

// import { List, Avatar } from 'antd';

// const data = [
//     {
//         title: 'Ant Design Title 1',
//     },
//     {
//         title: 'Ant Design Title 2',
//     },
//     {
//         title: 'Ant Design Title 3',
//     },
//     {
//         title: 'Ant Design Title 4',
//     },
// ];


export default class GroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '用户',
            dataIndex: 'userName',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '邮箱',
            dataIndex: 'userEmail',
            key: 'email',
        }, {
            title: '角色',
            key: 'isOwner',
            dataIndex: 'isOwner',
            render: isOwner =>
                <span>
            {isOwner ? <Tag color={'green'} key={isOwner}>创建者</Tag> : <Tag color={'geekblue'} key={isOwner}>使用者</Tag>}
        </span>
        }, {
            title: '操作',
            key: 'action',
            dataIndex: 'isOwner',
            render: (isOwner, record) => (
                <span>

     {isOwner ? null : <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record)}>
         <a href="javascript:;">删除</a>
     </Popconfirm>}
    </span>
            ),
        }];
    }

    state = {
        data: [],
    }

    handleDelete = (record) => {
        this.deleteUser(this.props.boardId, record.userId).then(user => (this.refreshList()))
        // this.refreshList()
        // console.log(record)
    }

    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        // if (user) {

        // } else {
        //     // history.push('/login')
        //     history.go()
        // }
        this.refreshList()
    }

    refreshList() {
        this.getUserList(this.props.boardId).then(
            list => {
                console.log(list)
                this.setState({data: list})
            }, error => {

            })
    }

    onClick = (e) => {
        // console.log(e.target.text)
        // $(e).siblings("input[type='text']").val();
        this.props.boardNameCallback(e.target.text);
    }

    deleteUser = (boardId, targetId) => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        const requestOptions = {
            method: 'DELETE',
        }

        return fetch(`http://101.132.188.238:8080/kanbans/user/delete/${boardId}/${currentUser.userId}?targetId=${targetId}`, requestOptions).then(this.handleUserDeleteResponse)
    }

    getUserList = (boardId) => {
        const requestOptions = {
            method: 'GET',
        }

        return fetch(`http://101.132.188.238:8080/kanbans/user/userList/${boardId}`, requestOptions).then(this.handleUserListResponse)
    }

    handleUserDeleteResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            // console.log(data.result)
            return data.result
        })
    }

    handleUserListResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            // console.log(data.result)
            return data.result
        })
    }

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
    handleInvite = (targetEmail) => {
        this.inviteUser(targetEmail).then(user => (this.refreshList()))
    }
    inviteUser = (targetEmail) => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        const requestOptions = {
            method: 'POST',
        }

        return fetch(`http://101.132.188.238:8080/kanbans/user/add/${this.props.boardId}/${currentUser.userId}?targetEmail=${targetEmail}`, requestOptions).then(this.handleUserDeleteResponse)
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <Input.Search
                    placeholder="用户邮箱"
                    enterButton="邀请"
                    onSearch={this.handleInvite}
                />
                <Table columns={this.columns} dataSource={this.state.data}/>
            </div>
        );
    }
}
