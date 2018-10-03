import React, { Component } from 'react';
import AddClient from './AddClient';
import EditClientActions from './EditClientActions';

class Actions extends Component {
    render() {
        return (
            <div className='main-container actions-container'>
                <EditClientActions
                    updateClient={this.props.updateClient}
                    getClientNames={this.props.getClientNames}
                    getClientDetails={this.props.getClientDetails}
                    getOwners={this.props.getOwners}
                />
                <hr />
                <AddClient
                    addClient={this.props.addClient}
                    resetAddForm={this.props.resetAddForm}
                    toggleResetAddForm={this.props.toggleResetAddForm}
                />
            </div>
        );
    };
}

export default Actions;
