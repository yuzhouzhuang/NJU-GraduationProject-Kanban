import React from 'react'
import styled from 'styled-components'
import {object} from 'prop-types'
import getPaletteColor from '../services/getPaletteColor'
import {prop} from 'styled-tools'
import {Redirect} from 'react-router-dom'
import {Header, BoardHeader, BoardList} from '../components'
import {getBoard, deleteBoard, createList} from '../firebase/boards'
import {Menu, Icon, Table} from 'antd';
import StatisticPage from './statisticPage'
import GroupPage from "./groupInfo";
import LogPage from "./logPage";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// import getPaletteColor from '../services/getPaletteColor'
const columns = [{
    title: '用户',
    dataIndex: 'userName',
    width: '30%'
}, {
    title: '操作',
    dataIndex: 'content',
}];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: ${getPaletteColor('shades', 0)};
`

const Body = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

// const Card = styled.div`
//   height: 56px;
//   border-radius: 3px;
//   background: ${getPaletteColor('shades', 0)};
//   box-shadow: 0 1px 0 ${getPaletteColor('shades', 300)};
//   cursor: pointer;
//   margin-bottom: 8px;
//   &:last-child {
//     margin-bottom: 0;
//   }
// `

class Board extends React.PureComponent {

    state = {
        board: {},
        timer: {},
        editable: false,
        current: '1',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    componentDidMount() {
        this.init()
        let board = this
        this.state.timer = setInterval(() => {
            board.init()
        }, 1000)
        // this.init()
    }

    componentWillUnmount() {
        if (this.state.timer != null) {

            clearInterval(this.state.timer);

        }
    }

    init = () => {
        let boardId = this.props.boardId;

        if (!boardId) {
            this.setState({board: null});
            return
        }

        getBoard(boardId).then(board => {
            this.setState({board: board})
            localStorage.setItem('board', JSON.stringify(board))
            if (board.columns.length === 0) {
                createList({
                    columnName: "初始列表项",
                    boardId: boardId,
                    columnOrder: 1,
                    columnWIP: 1000,
                })
                createList({
                    columnName: "完成列表项",
                    boardId: boardId,
                    columnOrder: 2,
                    columnWIP: 1000,
                })
            }
            // console.log(board)
            // console.log(localStorage.getItem('user'))
        })
    }


    // componentWillReceiveProps = (props) => {
    //   let board = this
    //   this.timer = setInterval(() => {
    //     board.init()
    //   }, 100)
    //
    // }
    // componentWillUnmount() {
    //   document.body.style.background = 'none'
    //   if (typeof this.unsubcribe === 'function') {
    //     this.unsubcribe()
    //   }
    // }

    onLeaveBoard = () => {
        this.state.editable = !this.state.editable
    }


    render() {
        const {board} = this.state

        if (!board) {
            return <Redirect to={{pathname: '/404'}}/>
        }

        // console.log(board)
        return (
            <Container>
                {/*<Header/>*/}
                <div>
                    <Menu
                        className="board-menu"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="1">
                            <Icon type="schedule"/>浏览
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="edit"/>修改
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="bar-chart"/>统计
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="table"/>记录
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="user"/>团队
                        </Menu.Item>
                    </Menu>
                </div>
                <Body className="board-body">
                    {/*<BoardHeader boardName={board.boardName} userList={board.ownerId} onLeaveBoard={this.onLeaveBoard}/>*/}
                    {(this.state.current === "1" || this.state.current === "2") ?
                        <BoardList board={board} editable={this.state.current === "2"}/> : null}
                    {this.state.current === "3" ? <StatisticPage boardId={this.props.boardId}/> : null}
                    {this.state.current === "5" ? <GroupPage boardId={this.props.boardId}/> : null}
                    {this.state.current === "4" ? <LogPage boardId={this.props.boardId}/> : null}
                </Body>
            </Container>
        )
    }
}

export default Board
