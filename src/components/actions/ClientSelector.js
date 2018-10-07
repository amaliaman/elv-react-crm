import React, { Component } from 'react'
import ReactSelect from 'react-select';

class ClientSelector extends Component {
    constructor() {
        super();
        this.state = {
            selectedClient: ''
        };
    };

    handleChange = e => {
        this.setState({ selectedClient: e });
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { selectedClient } = this.state;
        if (prevState.selectedClient !== selectedClient) {
            const id = selectedClient ? selectedClient.value : '';
            this.props.setClientId(id)
        }
    };

    render() {
        return (
            <div>
                <span className="selector-label">Client:</span>
                <ReactSelect
                    value={this.state.selectedClient}
                    onChange={this.handleChange}
                    options={this.props.names}
                    placeholder="Client Name"
                    className="client-selector"
                    isClearable
                />
            </div>
        )
    }
}

export default ClientSelector;
