import React, { Component } from 'react';
import MiniLoader from '../general/MiniLoader';
import apiUtils from '../../utils/apiUtils';

class Badge extends Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            loaded: false
        };
    }

    componentDidMount = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.ANALYTICS_BASE}${this.props.url}`;
        const value = await apiUtils.getData(url);
        this.setState({ value: value, loaded: true });
    };

    render() {
        return (
            <div className="badge">
                <div className="badge-icon" style={{ backgroundColor: this.props.color }}>{this.props.icon}</div>
                <MiniLoader loaded={this.state.loaded}>
                    <div className="badge-val">{this.state.value}</div>
                </MiniLoader>
                <div className="badge-label">{this.props.label}</div>
            </div>
        );
    }
}

export default Badge;