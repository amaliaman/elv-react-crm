import React, { Component } from 'react';

class AddClient extends Component {
    constructor() {
        super();
        this.state = this.getInitialState();
    };

    getInitialState = () => {
        const stateObject = {
            firstName: '',
            surname: '',
            country: '',
            owner: ''
        };
        return stateObject;
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = () => {
        const { firstName, surname, country, owner } = this.state;
        const name = firstName && surname ? `${firstName} ${surname}` : null;
        const clientData = {
            name,
            country,
            owner
        };
        this.props.addClient(clientData);
        // RESET FORM
    };

    componentDidUpdate = (prevProps) => {
        if (!prevProps.resetAddForm && this.props.resetAddForm) {
            this.setState(this.getInitialState());
            this.props.toggleResetAddForm();
        }
    };

    render() {
        return (
            <div>
                <h4>Add Client</h4>
                <div className='client-form add-container'>
                    {/* Name row */}
                    <span>Name</span>
                    <input value={this.state.firstName} name='firstName' onChange={this.handleChange} />
                    {/* Surname row */}
                    <span>Surname:</span>
                    <input value={this.state.surname} name='surname' onChange={this.handleChange} />
                    {/* Country row */}
                    <span>Country:</span>
                    <input value={this.state.country} name='country' onChange={this.handleChange} />
                    {/* Country row */}
                    <span>Owner:</span>
                    {/* TODO: use data-list //////////////////////////////// */}
                    <input value={this.state.owner} name='owner' onChange={this.handleChange} />
                    {/* Update button */}
                    <button type="button" onClick={this.handleClick}>Add New Client</button>
                </div>
            </div>
        );
    };
}

export default AddClient;
