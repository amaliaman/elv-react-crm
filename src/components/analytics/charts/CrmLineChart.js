import React, { Component } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

class CrmLineChart extends Component {
    render() {
        const xLabel = { value: this.props.xLabel, offset: 0, position: 'bottom' };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={this.props.data} layout={this.props.layout}>
                    <Tooltip />
                    <Legend />
                    {this.props.layout === 'horizontal' ?
                        <XAxis type="category" dataKey={this.props.axisDataKey} label={xLabel} /> :
                        <XAxis type="number" label={xLabel} />}
                    {this.props.layout === 'horizontal' ?
                        <YAxis type="number" /> :
                        <YAxis type="category" dataKey={this.props.axisDataKey} />}
                    <Line
                        dataKey={this.props.lineDataKey}
                        stroke={this.props.color}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default CrmLineChart;