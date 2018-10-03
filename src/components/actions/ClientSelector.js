import React, { Component } from 'react'
import Select from 'react-select';

class ClientSelector extends Component {
    constructor() {
        super();
        this.state = {
            selectedClient: '',
            names: []
        };
    };

    handleChange = e => {
        this.setState({ selectedClient: e });
    };

    getOptions = async () => {
        const options = [];
        const names = await this.props.getClientNames();
        names.forEach(c => {
            options.push({ value: c._id, label: c.name })
        });
        this.setState({ names: options });
    };

    componentDidMount = () => {
        this.getOptions();
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
                    options={this.state.names}
                    placeholder="Client Name"
                    className="client-selector"
                    isClearable
                />
            </div>
        )
    }
}

export default ClientSelector;
