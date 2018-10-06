import React, { Component } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import moment from 'moment';

class CrmLineChart extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    /** 
     * fill missing dates in time series with 0 sales
     */
    getAllDates = () => {
        // Create an array with all days
        const now = new Date();
        const from = new Date(this.props.since);
        const dateRange = [];
        for (let d = from; d <= now; d.setDate(d.getDate() + 1)) {
            dateRange.push(moment(d).format('YYYY-MM-DD'));
        }

        // Make a deep copy of the data
        const data = JSON.parse(JSON.stringify(this.props.data));

        // Fill missing dates from array
        dateRange.forEach(d => {
            const dataItem = data.find(i => i._id === d);
            if (!dataItem) {
                data.push({ _id: d, sales: 0 });
            }
        });
        data.sort((a, b) => new Date(a._id) - new Date(b._id));

        // Artificially increase sales so it would look nicer in the demo
        data.forEach(d => {
            d.sales += Math.ceil(Math.random() * 4);
        });

        return data;
    };

    componentDidMount = () => {
        this.setState({ data: this.getAllDates() });
    };

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={this.state.data} layout={this.props.layout}>
                    <Tooltip />
                    <XAxis
                        type='category'
                        dataKey={this.props.axisDataKey}
                        tickFormatter={date => moment(date).format('MMM-DD')}
                    />
                    <YAxis type="number" allowDecimals={false} />
                    <Line
                        dot={false}
                        dataKey={this.props.lineDataKey}
                        name='Sales'
                        type='natural'
                        stroke={this.props.color}
                        strokeWidth={4}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default CrmLineChart;