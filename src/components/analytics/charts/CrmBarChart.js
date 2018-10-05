import React, { Component } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';

class CrmBarChart extends Component {
    render() {
        const xLabel = { value: this.props.xLabel, offset: 0, position: 'bottom' };

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={this.props.data} layout={this.props.layout}>
                    <Tooltip />
                    <Legend />
                    {this.props.layout === 'horizontal' ?
                        <XAxis type="category" dataKey={this.props.axisDataKey} label={xLabel} /> :
                        <XAxis type="number" label={xLabel} />}
                    {this.props.layout === 'horizontal' ?
                        <YAxis type="number" /> :
                        <YAxis type="category" dataKey={this.props.axisDataKey} />}
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
