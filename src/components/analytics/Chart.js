import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import apiUtils from '../../utils/apiUtils';
import MyLoader from '../general/MyLoader';

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

    render() {
        const { layout } = this.props;
        const xLabel = { value: this.props.xLabel, offset: 0, position: 'bottom' };
        
        return (
            <MyLoader loaded={this.state.loaded}>
                <div className="chart-container">
                    <h4>{this.props.title}</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={this.state.data} layout={layout}>
                            {layout === 'horizontal' ?
                                <XAxis type="category" dataKey="_id" label={xLabel} /> :
                                <XAxis type="number" label={xLabel} />
                            }
                            {layout === 'horizontal' ?
                                <YAxis type="number" /> :
                                <YAxis type="category" dataKey="_id" />
                            }
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey={this.props.barDataKey}
                                fill={this.props.color}
                                barSize={this.props.barSize}
                                legendType='none'
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </MyLoader>
        );
    }
}

export default Chart;
