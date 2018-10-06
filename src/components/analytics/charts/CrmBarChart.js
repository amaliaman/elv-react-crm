import React, { Component } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

class CrmBarChart extends Component {
    render() {
        const xLabel = { value: this.props.xLabel, offset: 0, position: 'center' };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={this.props.data} layout={this.props.layout}>
                    <Tooltip />
                    <Legend />
                    {this.props.layout === 'horizontal' ?
                        <XAxis type="category" height={60} dataKey={this.props.axisDataKey} /> :
                        <XAxis type="number" height={60} label={xLabel} />}
                    {this.props.layout === 'horizontal' ?
                        <YAxis type="number" /> :
                        <YAxis type="category" dataKey={this.props.axisDataKey} width={80} />}
                    <Bar
                        dataKey={this.props.barDataKey}
                        fill={this.props.color}
                        barSize={this.props.barSize}
                        legendType='none'
                    />
                </BarChart>
            </ResponsiveContainer>
        );
    };
}

export default CrmBarChart;
