import React, { Component } from 'react';

import Chart from './Chart';
import apiUtils from '../../utils/apiUtils';

class Charts extends Component {
    getCharts = () => {
        const charts = [
            {
                title: 'Top Employees',
                url: apiUtils.CHARTS_TOP_EMPLOYEES,
                color: '#003f5c',
                layout: 'vertical',
                barSize: 20,
                barDataKey: 'sold',
                xLabel: 'Sales'
            },
            {
                title: 'Sales by Country',
                url: apiUtils.CHARTS_SALES_BY_COUNTRY,
                color: '#955196',
                layout: 'horizontal',
                barSize: 50,
                barDataKey: 'sold',
                xLabel: null
            }
        ];
        return charts;
    };

    render() {
        return (
            <div className="charts-container main-container">
                {this.getCharts().map(c =>
                    <Chart
                        key={c.title}
                        title={c.title}
                        url={c.url}
                        color={c.color}
                        layout={c.layout}
                        barSize={c.barSize}
                        barDataKey={c.barDataKey}
                        xLabel={c.xLabel}
                    />
                )}
            </div>
        )
    }
}

export default Charts;
