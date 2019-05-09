import React from 'react';
import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import BoardList from './boardList'
import CreateBoard from './createBoard'
import Home from "./home";
import Board from "./board";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

export default class LayoutPage extends React.Component {

    state = {
        selectSection: "1",
        boardId: "-1",
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({selectSection: e.key})
    }

    boardNameCallback = (id) => {
        this.setState({selectSection: "-1", boardId: id})
    }

    render() {
        return (
            <div>
                <Layout className="layout">
                    <Header className="header">
                        <div className="logo">
                            {/*<div>Kanban 看板</div>*/}
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                onClick={this.handleClick}
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="file"/>看板</span>}>
                                    <Menu.Item key="1">看板列表</Menu.Item>
                                    <Menu.Item key="2">创建看板</Menu.Item>
                                    {/*<Menu.Item key="3">option3</Menu.Item>*/}
                                    {/*<Menu.Item key="4">option4</Menu.Item>*/}
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="pie-chart"/>统计</span>}>
                                    <Menu.Item key="5">统计信息</Menu.Item>
                                    {/*<Menu.Item key="6">option6</Menu.Item>*/}
                                    {/*<Menu.Item key="7">option7</Menu.Item>*/}
                                    {/*<Menu.Item key="8">option8</Menu.Item>*/}
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="user"/>用户</span>}>
                                    <Menu.Item key="9">个人信息</Menu.Item>
                                    <Menu.Item key="10">团队信息</Menu.Item>
                                    <Menu.Item key="11">注销</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                                {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                                {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                            </Breadcrumb>
                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                {this.state.selectSection === "-1" ? (<Board boardId={this.state.boardId}/>) : null}
                                {this.state.selectSection === "1" ? (
                                    <BoardList boardNameCallback={this.boardNameCallback}/>) : null}
                                {this.state.selectSection === "2" ? (<CreateBoard/>) : null}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
