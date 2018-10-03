import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faEnvelope, faUserCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

const Badge = (props) => {
    return (
        <div className="badge">
            <div className="badge-icon" style={{ backgroundColor: props.color }}>{props.icon}</div>
            <div className="badge-val">{props.value}</div>
            <div className="badge-label">{props.label}</div>
        </div>
    );
};

class Badges extends Component {
    render() {
        const chart = <FontAwesomeIcon icon={faChartLine} />;
        const envelope = <FontAwesomeIcon icon={faEnvelope} />;
        const user = <FontAwesomeIcon icon={faUserCircle} />;
        const globe = <FontAwesomeIcon icon={faGlobeAmericas} />;

        return (
            <div className="badges-container main-container">
                <Badge color="#2ecc71" value='14' label='New September Clients' icon={chart} />
                <Badge color="#3498db" value='454' label='Emails Sent' icon={envelope} />
                <Badge color="#e74c3c" value='298' label='Outstanding Clients' icon={user} />
                <Badge color="#f1c40f" value='France' label='Hottest Country' icon={globe} />
            </div>
        )
    }
}

export default Badges
