import React, { Component } from 'react';
import moment from 'moment';

import Chart from './Chart';
import apiUtils from '../../utils/apiUtils';

class Charts extends Component {
    constructor() {
        super();
        this.state = {
            salesBy: 'country'
        };
    }

    setSalesBy = salesBy => {
        this.setState({ salesBy: salesBy });
    }

    getCharts = () => {
        const lastMonth = moment().subtract(29, 'days');
        const lastMonthLabel = lastMonth.format('MMM-DD');

        const charts = [
            {
                id: 'topEmployees',
                title: 'Top Employees',
                url: apiUtils.CHARTS_TOP_EMPLOYEES,
                chartType: 'bar',
                color: '#003f5c',
                layout: 'vertical',
                barSize: 20,
                barDataKey: 'sold',
                xLabel: 'Sales',
                axisDataKey: '_id'
            },
            {
                id: 'salesBy',
                title: `Sales by `,
                url: `${apiUtils.CHARTS_SALES_BY}${this.state.salesBy}`,
                chartType: 'bar',
                color: '#955196',
                layout: 'horizontal',
                barSize: 50,
                barDataKey: 'sold',
                axisDataKey: '_id',
                setSalesBy: this.setSalesBy
            },
            {
                id: 'salesSince',
                title: `Sales since ${lastMonthLabel}`,
                url: `${apiUtils.CHARTS_SINCE_DATE}${lastMonth}`,
                chartType: 'line',
                color: '#ff6e54',
                lineDataKey: 'sales',
                layout: 'horizontal',
                axisDataKey: '_id',
                since: lastMonth
            },
            {
                id: 'cliemtAcquisition',
                title: 'Client Acquisition',
                url: apiUtils.CHARTS_ACQUISITION,
                chartType: 'pie',
                colors: ['#34495e', '#95a5a6', '#795548'],
                pieDataKey: 'clients',
                pieNameKey: 'month'
            }
        ];
        return charts;
    };

    render() {
        return (
            <div className="charts-container main-container">
                {this.getCharts().map(c =>
                    <Chart
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        url={c.url}
                        chartType={c.chartType}
                        color={c.color}
                        colors={c.colors}
                        layout={c.layout}
                        barSize={c.barSize}
                        barDataKey={c.barDataKey}
                        xLabel={c.xLabel}
                        axisDataKey={c.axisDataKey}
                        lineDataKey={c.lineDataKey}
                        pieDataKey={c.pieDataKey}
                        pieNameKey={c.pieNameKey}
                        since={c.since}
                        setSalesBy={c.setSalesBy}
                    />
                )}
            </div>
        )
    }
}

export default Charts;
