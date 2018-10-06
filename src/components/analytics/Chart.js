import React, { Component } from 'react'
import apiUtils from '../../utils/apiUtils';
import MyLoader from '../general/MyLoader';

import CrmBarChart from './charts/CrmBarChart';
import CrmPieChart from './charts/CrmPieChart';
import CrmLineChart from './charts/CrmLineChart';

export class Chart extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loaded: false
        };
    };

    componentDidMount = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.ANALYTICS_BASE}${this.props.url}`;
        const data = await apiUtils.getData(url);
        this.setState({ data: data, loaded: true });
    };

    /**
     * Generate different charts according to chartType prop
     */
    getChart = () => {
        let chart = null;
        switch (this.props.chartType) {
            case 'bar':
                chart = (<CrmBarChart
                    data={this.state.data}
                    layout={this.props.layout}
                    xLabel={this.props.xLabel}
                    barDataKey={this.props.barDataKey}
                    color={this.props.color}
                    barSize={this.props.barSize}
                    axisDataKey={this.props.axisDataKey}
                />);
                break;
            case 'line':
                chart = (<CrmLineChart
                    data={this.state.data}
                    layout={this.props.layout}
                    xLabel={this.props.xLabel}
                    lineDataKey={this.props.lineDataKey}
                    color={this.props.color}
                    axisDataKey={this.props.axisDataKey}
                    since={this.props.since}
                />);
                break;
            case 'pie':
                chart = (<CrmPieChart
                    data={this.state.data}
                    pieDataKey={this.props.pieDataKey}
                    pieNameKey={this.props.pieNameKey}
                    colors={this.props.colors}
                />);
                break;
            default:
                console.error('Invalid chartType prop');
        }
        return chart;
    };

    render() {
        return (
            <MyLoader loaded={this.state.loaded} wrapperClass="chart-item">
                <p>{this.props.title}</p>
                {this.getChart()}
            </MyLoader>
        );
    }
}

export default Chart;
