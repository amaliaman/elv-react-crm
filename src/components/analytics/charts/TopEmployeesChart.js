import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import apiUtils from '../../../utils/apiUtils';

export class TopEmployeesChart extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    };

    componentDidMount = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.ANALYTICS_BASE}${apiUtils.CHARTS_TOP_EMPLOYEES}`;
        const data = await apiUtils.getData(url);
        this.setState({ data: data });
    };

    render() {
        return (
            <div className="chart-container">
                <h4>Top Employees</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={this.state.data}
                        layout='vertical'
                    >
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="_id" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sold" fill="#003f5c" barSize={10} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default TopEmployeesChart;
