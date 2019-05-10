import React from 'react'
import {Table, List} from 'antd';
// import reqwest from 'reqwest';

const columns = [{
    title: '用户',
    dataIndex: 'userName',
    width: '30%'
}, {
    title: '操作',
    dataIndex: 'content',
}];

export default class Statistic extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.fetchLog();
        this.fetchLeadTime();
        this.fetchThroughput();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetchLog({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }

    fetchLog = (params = {}) => {
        // console.log('params:', params);
        this.setState({loading: true});
        fetch(`http://101.132.188.238:8080/kanbans/Logs/get/${this.props.boardId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(this.handleResponse).then(data => {

                const pagination = {...this.state.pagination};
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = 200;
                this.setState({
                    loading: false,
                    data: data,
                    pagination,
                });
            }
        )
        ;
    }

    handleResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            // console.log(data)
            return data
        })
    }


    fetchLeadTime = (params = {}) => {
        // console.log('params:', params);
        this.setState({loading: true});
        fetch(`http://101.132.188.238:8080/kanbans/leadTime/${this.props.boardId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(this.handleLeadTimeResponse).then(data => {

                this.setState({
                    leadTime: data
                })
            }
        )
        ;
    }

    handleLeadTimeResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            // console.log(data)
            return data.result;
        })
    }

    fetchThroughput = (params = {}) => {
        // console.log('params:', params);
        this.setState({loading: true});
        fetch(`http://101.132.188.238:8080/kanbans/throughput/${this.props.boardId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(this.handleThroughputResponse).then(data => {

                this.setState({
                    throughput: data
                })
            }
        )
        ;
    }

    handleThroughputResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            console.log(data.result)
            return data.result;
        })
    }

    render() {
        return (
            <div>
                <span>前置时间:{this.state.leadTime}</span>
                <span>吞吐量:</span>
                <List dataSource={this.state.throughput} renderItem={item => (<List.Item>{item}</List.Item>)}/>
                <Table
                    columns={columns}
                    // rowKey={"userName"}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}