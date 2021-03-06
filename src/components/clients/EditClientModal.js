import React, { Component } from 'react'

class EditClientModal extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            surname: '',
            country: '',
            id: ''
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = () => {
        const clientData = {
            name: `${this.state.firstName} ${this.state.surname}`,
            country: this.state.country,
            _id: this.state.id
        };
        this.props.updateClient(clientData);
    };

    componentDidMount = () => {
        const { name, country, _id } = this.props.client;
        const nameArray = name.split(' ');
        const firstName = nameArray[0];
        const surname = nameArray[1];
        this.setState({
            firstName: firstName,
            surname: surname,
            country: country,
            id: _id
        });
    };

    render() {
        return (
            // VALIDATIONNNNNNNNNNN

            <div className='edit-container client-form'>
                {/* Name row */}
                <span>Name</span>
                <input value={this.state.firstName} name='firstName' onChange={this.handleChange} />
                {/* Surname row */}
                <span>Surname:</span>
                <input value={this.state.surname} name='surname' onChange={this.handleChange} />
                {/* Country row */}
                <span>Country:</span>
                <input value={this.state.country} name='country' onChange={this.handleChange} />
                {/* Update button */}
                <button type="button" onClick={this.handleClick}>Update</button>
            </div>
        );
    };
}

export default EditClientModal;
