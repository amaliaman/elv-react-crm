import React, { Component } from 'react'
import Select from 'react-select';

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

    getOptions = () => {
        const options = [];
        this.props.clientNames.forEach(c => {
            options.push({ value: c.id, label: c.name })
        });
        return options;
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
                <Select
                    value={this.state.selectedClient}
                    onChange={this.handleChange}
                    options={this.getOptions()}
                    placeholder="Client Name"
                    className="client-selector"
                    isClearable
                />
            </div>
        )
    }
}

export default ClientSelector;
