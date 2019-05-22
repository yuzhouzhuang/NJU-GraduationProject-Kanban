import React from 'react';
import {List, Avatar, Icon, Button, Table, Tag, Popconfirm} from 'antd';
import {getUserBoards, getBoards} from "../firebase/boards";


export default class BoardList extends React.Component {

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
                                        <Tag color={'green'} key={id}>创建者</Tag> :
                                        <Tag color={'geekblue'} key={id}>使用者</Tag>}
                                 </span>
                        }, {
                            title: '操作',
                            key: 'action',
                            dataIndex: 'id',
                            render: (id, record) => (
                                <span>
                                    <a onClick={() => this.onClick(record)}>查看</a>
                                </span>
                            ),
                        }]
                    })
                })

            }, error => {

            })
    }

    onClick = (record, e) => {
        this.props.boardNameCallback(record.id);
    }

    render() {
        return (
            <div>
                <Table columns={this.state.columns} dataSource={this.state.data}/>
            </div>
        );
    }
}
