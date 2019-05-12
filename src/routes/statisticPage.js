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

export default class StatisticPage extends React.Component {
    state = {
        data: [],
        leadTime: '',
        statisticsInfo: []
    };

    componentDidMount() {
        this.fetchLog();
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
        console.log(this.state.statisticsInfo)
        return (
            <div>
                {/*<span>前置时间:{this.state.leadTime}</span>*/}
                <Statistic title="前置时间" value={this.state.leadTime}/>
                <Chart height={400} data={this.state.statisticsInfo} scale={cols} forceFit>
                    <Axis name="finishDate"/>
                    {/*<Axis name="cardTitle" visible={false}/>*/}
                    <Axis name="leadTime"/>
                    {/*<Tooltip*/}
                    {/*    crosshairs={{*/}
                    {/*        type: "y"*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Geom type="line" position="finishDate*leadTime"/>
                    {/*<Geom*/}
                    {/*    type="point"*/}
                    {/*    position="finishDate*leadTime"*/}
                    {/*    size={4}*/}
                    {/*    shape={"circle"}*/}
                    {/*    style={{*/}
                    {/*        stroke: "#fff",*/}
                    {/*        lineWidth: 1*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <Tooltip
                        showTitle={false}
                        crosshairs={{
                            type: "cross"
                        }}
                        //itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
                    />
                    {/*<Axis name="height" />*/}
                    {/*<Axis name="weight" />*/}
                    <Geom
                        type="point"
                        position="finishDate*leadTime"
                        opacity={0.65}
                        shape="circle"
                        size={4}
                        tooltip={[
                            "finishDate*leadTime*cardTitle",
                            (finishDate,leadTime,cardTitle) => {
                                return {
                                    name: cardTitle,
                                    value:  leadTime + "(天)"
                                };
                            }
                        ]}
                    />
                </Chart>
                <Table
                    columns={columns}
                    // rowKey={"userName"}
                    dataSource={this.state.data}
                />
            </div>
        );
    }
}