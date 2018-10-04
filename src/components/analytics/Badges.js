import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEnvelope, faUserCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Badge from './Badge';
import apiUtils from '../../utils/apiUtils';

class Badges extends Component {
    getBadges = () => {
        const chart = <FontAwesomeIcon icon={faChartLine} />;
        const envelope = <FontAwesomeIcon icon={faEnvelope} />;
        const user = <FontAwesomeIcon icon={faUserCircle} />;
        const globe = <FontAwesomeIcon icon={faGlobeAmericas} />;

        const month = moment().month();
        const monthName = moment().month(month).format('MMMM');

        const badges = [
            {
                label: `New ${monthName} Clients`,
                color: '#2ecc71',
                icon: chart,
                url: apiUtils.ANALYTICS_NEW_COUNT
            },
            {
                label: 'Emails Sent',
                color: '#3498db',
                icon: envelope,
                url: apiUtils.ANALYTICS_EMAILS_COUNT
            },
            {
                label: 'Outstanding Clients',
                color: '#e74c3c',
                icon: user,
                url: apiUtils.ANALYTICS_OUTSTANDING_COUNT
            },
            {
                label: 'Hottest Country',
                color: '#f1c40f',
                icon: globe,
                url: apiUtils.ANALYTICS_COUNTRY_COUNT
            }
        ];
        return badges;
    };

    render() {
        return (
            <div className="badges-container main-container">
                {this.getBadges().map(b =>
                    <Badge
                        key={b.label}
                        color={b.color}
                        label={b.label}
                        icon={b.icon}
                        url={b.url}
                    />)}
            </div>
        );
    }
}

export default Badges;
