import React from 'react';
import {List, Avatar, Icon, Button} from 'antd';
import {getBoards} from "../firebase/boards";

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
    state = {
        data: [],
    }

    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user);
        // if (user) {
        getBoards().then(
            boards => {
                console.log(boards)
                this.setState({data: boards})
            }, error => {

            })
        // } else {
        //     // history.push('/login')
        //     history.go()
        // }
    }

    onClick = (e) => {
        // console.log(e.target.text)
        // $(e).siblings("input[type='text']").val();
        this.props.boardNameCallback(e.target.text);
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item >
                            <List.Item.Meta
                                avatar={<Avatar
                                    style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>{user.userName}</Avatar>}
                                title={<a onClick={this.onClick}>{item.id}</a>}
                                description={item.name}
                            />
                            <div>管理者</div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
