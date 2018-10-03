import React, { Component } from 'react';
import ClientSelector from './ClientSelector';
import ClientActions from './ClientActions';

export class EditClientActions extends Component {
  constructor() {
    super();
    this.state = {
      clientId: ''
    };
  };

  setClientId = (id) => {
    this.setState({ clientId: id });
  };

  render() {
    return (
      <div>
        <h4>Update</h4>
        <ClientSelector clientNames={this.props.clientNames} setClientId={this.setClientId} />
        {this.state.clientId &&
          <ClientActions
            updateClient={this.props.updateClient}
            clientId={this.state.clientId}
            getClientDetails={this.props.getClientDetails}
            getOwners={this.props.getOwners}
          />
        }
      </div>
    )
  }
}

export default EditClientActions;