import React from 'react';
import {List, Avatar, Icon, Button, Table, Tag, Popconfirm} from 'antd';
import {getUserBoards, getBoards} from "../firebase/boards";

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


export default class BoardList extends React.Component {
    constructor(props) {
        super(props);
        //     this.columns = [{
        //         title: '看板名称',
        //         dataIndex: 'name',
        //         key: 'name',
        //     }, {
        //         title: '用户角色',
        //         key: 'id',
        //         dataIndex: 'id',
        //         render: id =>
        //             <span>
        //         {id in this.state.ownerBoardList.keys() ?
        //             <Tag color={'geekblue'} key={id}>使用者</Tag> : <Tag color={'green'} key={id}>创建者</Tag>}
        //     </span>
        //     }, {
        //         title: '操作',
        //         key: 'action',
        //         dataIndex: 'id',
        //         render: (id, record) => (
        //             <span>
        //
        //  {/*{isOwner ? null : <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record)}>*/}
        //                 <a onClick={() => this.onClick(record)}>查看</a>
        //                 {/*</Popconfirm>}*/}
        // </span>
        //         ),
        //     }];
    }

    state = {
        data: [],
        ownerBoardList: [],
        column: [],
    }

    static array_contain(array, obj) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === obj)
                return true;
        }
        return false;
    }

    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        // if (user) {
        const elements = []
        getUserBoards().then(
            boards => {
                // elements.push(boards)
                this.setState({data: boards})
                getBoards().then(ownerBoards => {
                    ownerBoards.forEach(board => {
                            elements.push(board.id)
                        }
                    )
                    this.setState({ownerBoardList: elements})
                    console.log(this.state.ownerBoardList)
                    console.log(this.state.data)
                    this.setState({
                        columns: [{
                            title: '看板名称',
                            dataIndex: 'name',
                            key: 'name',
                        }, {
                            title: '用户角色',
                            key: 'id',
                            dataIndex: 'id',
                            render: id =>
                                <span>
            {BoardList.array_contain(this.state.ownerBoardList, id) ?
                <Tag color={'green'} key={id}>创建者</Tag> : <Tag color={'geekblue'} key={id}>使用者</Tag>}
        </span>
                        }, {
                            title: '操作',
                            key: 'action',
                            dataIndex: 'id',
                            render: (id, record) => (
                                <span>

     {/*{isOwner ? null : <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(record)}>*/}
                                    <a onClick={() => this.onClick(record)}>查看</a>
                                    {/*</Popconfirm>}*/}
    </span>
                            ),
                        }]
                    })
                })
                // this.


            }, error => {

            })
        // } else {
        //     // history.push('/login')
        //     history.go()
        // }
    }

    onClick = (record, e) => {
        // console.log(record)
        // $(e).siblings("input[type='text']").val();
        this.props.boardNameCallback(record.id);
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                {/*<List*/}
                {/*    itemLayout="horizontal"*/}
                {/*    dataSource={this.state.data}*/}
                {/*    renderItem={item => (*/}
                {/*        <List.Item>*/}
                {/*            <List.Item.Meta*/}
                {/*                avatar={<Avatar*/}
                {/*                    style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>{user.userName}</Avatar>}*/}
                {/*                title={<a onClick={this.onClick}>{item.id}</a>}*/}
                {/*                description={item.name}*/}
                {/*            />*/}
                {/*            <div>管理者</div>*/}
                {/*        </List.Item>*/}
                {/*    )}*/}
                {/*/>*/}
                <Table columns={this.state.columns} dataSource={this.state.data}/>
            </div>
        );
    }
}
