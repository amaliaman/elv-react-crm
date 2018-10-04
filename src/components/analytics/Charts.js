import React, { Component } from 'react';
import TopEmployeesChart from './charts/TopEmployeesChart';

class Charts extends Component {

    render() {
        return (
            <div className="charts-container main-container">
                <TopEmployeesChart />
            </div>
        )
    }
}

export default Charts;
