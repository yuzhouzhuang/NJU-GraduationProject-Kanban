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
    title: '卡片',
    dataIndex: 'cardTitle',
    width: '30%'
}, {
    title: '结束时间',
    dataIndex: 'finishDate',
    width: '40%'
}, {
    title: '前置时间',
    dataIndex: 'leadTime',
}];

const cols = {
    leadTime: {
        alias: "吞吐量(个/周)",
    },
    finishDate: {
        alias: "日期",
        type: "time",
    }
};

export default class StatisticPage extends React.Component {
    state = {
        data: [],
        leadTime: '',
        statisticsInfo: [],
        throughput: []
    };

    componentDidMount() {
        this.fetchLeadTime();
        this.fetchThroughput();
        this.fetchStatisticsInfo();
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
                if(data.length>5){
                    data = data.substr(0,8)
                }
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
        fetch(`http://101.132.188.238:8080/kanbans/weekThroughput/${this.props.boardId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(this.handleThroughputResponse).then(data => {
                let element = []
                data.forEach(combo => {
                    let combos = combo.split("||")
                    element.push({finishDate: combos[0], leadTime: parseInt(combos[1])})
                })
                this.setState({
                    throughput: element
                })
                // console.log(data)
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

    fetchStatisticsInfo = (params = {}) => {
        // console.log('params:', params);
        this.setState({loading: true});
        fetch(`http://101.132.188.238:8080/kanbans/statisticsInfo/${this.props.boardId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(this.handleStatisticsInfoResponse).then(data => {

                this.setState({
                    statisticsInfo: data
                })
            }
        )
        ;
    }

    handleStatisticsInfoResponse = (response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text)
            console.log(data.result)
            return data.result;
        })
    }

    render() {
        // console.log(this.state.statisticsInfo)
        return (
            <div>
                <h2>每周吞吐量</h2>
                <Chart height={400} data={this.state.throughput} scale={cols} forceFit>
                    <Axis name="finishDate" title/>
                    <Axis name="leadTime" title/>
                    <Geom type="interval" position="finishDate*leadTime"/>
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    {/*<Geom*/}
                    {/*    type="line"*/}
                    {/*    position="finishDate*leadTime"*/}
                    {/*    opacity={0.65}*/}
                    {/*    shape="circle"*/}
                    {/*    size={4}*/}
                    {/*    tooltip={[*/}
                    {/*        "finishDate*leadTime*cardTitle",*/}
                    {/*        (finishDate, leadTime, cardTitle) => {*/}
                    {/*            return {*/}
                    {/*                name: cardTitle,*/}
                    {/*                value: leadTime + "(天)"*/}
                    {/*            };*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*/>*/}
                </Chart>
                {/*<Statistic title="前置时间" value={this.state.leadTime}/>*/}
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.statisticsInfo}
                    title={() => ('平均前置时间:' + this.state.leadTime)}
                />
            </div>
        );
    }
}