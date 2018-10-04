import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEnvelope, faUserCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import MiniLoader from '../general/MiniLoader';
import apiUtils from '../../utils/apiUtils';

const Badge = (props) => {
    return (
        <div className="badge">
            <div className="badge-icon" style={{ backgroundColor: props.color }}>{props.icon}</div>
            <MiniLoader loaded={props.loaded}><div className="badge-val">{props.value}</div></MiniLoader>
            <div className="badge-label">{props.label}</div>
        </div>
    );
};

class Badges extends Component {
    constructor() {
        super();
        this.state = {
            newCount: 0,
            newCountLoaded: false,
            emailCount: 0,
            emailCountLoaded: false,
            outstandingCount: 0,
            outstandingCountLoaded: false,
            countryCount: 0,
            countryCountLoaded: false
        }
    };

    queryBadgeValue = async (property, url) => {
        const baseUrl = `${apiUtils.SERVER_URL}${apiUtils.ANALYTICS_BASE}`;
        const value = await apiUtils.getData(baseUrl + url);
        this.setState({ [property]: value, [property + 'Loaded']: true });
    };

    componentDidMount = async () => {
        this.queryBadgeValue('emailCount', apiUtils.ANALYTICS_EMAILS_COUNT);
        this.queryBadgeValue('outstandingCount', apiUtils.ANALYTICS_OUTSTANDING_COUNT);
        this.queryBadgeValue('newCount', apiUtils.ANALYTICS_NEW_COUNT);
        this.queryBadgeValue('countryCount', apiUtils.ANALYTICS_COUNTRY_COUNT);
    };

    render() {
        const chart = <FontAwesomeIcon icon={faChartLine} />;
        const envelope = <FontAwesomeIcon icon={faEnvelope} />;
        const user = <FontAwesomeIcon icon={faUserCircle} />;
        const globe = <FontAwesomeIcon icon={faGlobeAmericas} />;

        const month = moment().month();
        const monthName = moment().month(month).format('MMMM');

        return (
            <div className="badges-container main-container">
                <Badge color="#2ecc71" value={this.state.newCount} label={'New ' + monthName + ' Clients'} icon={chart} loaded={this.state.newCountLoaded} />
                <Badge color="#3498db" value={this.state.emailCount} label='Emails Sent' icon={envelope} loaded={this.state.emailCountLoaded} />
                <Badge color="#e74c3c" value={this.state.outstandingCount} label='Outstanding Clients' icon={user} loaded={this.state.outstandingCountLoaded} />
                <Badge color="#f1c40f" value={this.state.countryCount} label='Hottest Country' icon={globe} loaded={this.state.countryCountLoaded} />
            </div>
        )
    }
}

export default Badges
