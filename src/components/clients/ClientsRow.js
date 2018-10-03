import React, { Component } from 'react';
import moment from 'moment';

export class ClientsRow extends Component {
    handleClick = () => {
        this.props.openEditDialog(this.props.client);
    }

    render() {
        const EMPTY_CHARACTER = '-';
        const DATE_FORMAT = 'DD/MM/YYYY';
        const CHECK = '✔';

        const { name, emailType, country, owner, sold, firstContact } = this.props.client;
        const nameArray = name.split(' ');
        const firstName = nameArray[0];
        const surname = nameArray[1];

        return (
            <div className="clients-row" onClick={this.handleClick}>
                <span>{firstName}</span>
                <span>{surname}</span>
                <span>{country}</span>
                <span>{firstContact ? moment(firstContact).format(DATE_FORMAT) : EMPTY_CHARACTER}</span>
                <span>{emailType ? emailType : EMPTY_CHARACTER}</span>
                <span>{sold ? CHECK : EMPTY_CHARACTER}</span>
                <span>{owner}</span>
            </div>
        )
    }
}

export default ClientsRow;
