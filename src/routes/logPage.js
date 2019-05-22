import React from 'react'
import {Table, List, Col, Statistic} from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
// import reqwest from 'reqwest';

const columns = [{
    title: '用户',
    dataIndex: 'userName',
    width: '30%'
}, {
    title: '操作',
    dataIndex: 'content',
}];

const cols = {
    leadTime: {
        alias: "前置时间"
    },
    cardTitle: {
        alias: "卡片名称"
    },
    finishDate:{
        alias: "完成日期",
        type:"time",
    }
};

export default class LogPage extends React.Component {
    state = {
        data: [],
        leadTime: '',
        statisticsInfo: []
    };

    componentDidMount() {
        this.fetchLog();
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

    render() {
        console.log(this.state.statisticsInfo)
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}