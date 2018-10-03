import React, { Component } from 'react';
import ClientSelector from './ClientSelector';
import ClientActions from './ClientActions';

export class EditClientActions extends Component {
  constructor() {
    super();
    this.state = {
      clientId: '',
      owners: []
    };
  };

  setClientId = id => {
    this.setState({ clientId: id });
  };

  componentDidMount = async () => {
    this.setState({ owners: await this.props.getOwners() });
  };

  render() {
    return (
      <div>
        <h4>Update</h4>
        <ClientSelector getClientNames={this.props.getClientNames} setClientId={this.setClientId} />
        {this.state.clientId &&
          <ClientActions
            updateClient={this.props.updateClient}
            clientId={this.state.clientId}
            getClientDetails={this.props.getClientDetails}
            owners={this.state.owners}
          />
        }
      </div>
    )
  }
}

export default EditClientActions;