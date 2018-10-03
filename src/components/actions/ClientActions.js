import React, { Component } from 'react';

class ClientActions extends Component {
    constructor() {
        super();
        this.state = {};
    };

    setStateFromClient = () => {
        const details = this.props.getClientDetails(this.props.clientId);
        this.setState({
            emailType: details.emailType ? details.emailType : '',
            owner: details.owner ? details.owner : '',
            sold: details.sold
        });
    };

    resetState = () => {
        this.setState({
            emailType: '',
            owner: '',
            sold: false
        });
    };

    handleSale = () => {
        this.setState({ sold: true }, this.handleClick);
    }

    handleClick = () => {
        // only if something changed/////////////////////////////////////
        this.props.updateClient({ ...this.state, _id: this.props.clientId });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount = () => {
        this.setStateFromClient();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.clientId !== this.props.clientId) {
            if (this.props.clientId) {
                this.setStateFromClient();
            }
            else {
                this.resetState();
            }
        }
    };

    render() {
        return (
            <div className='client-actions-container'>
                {/* Owner row */}
                <span>Transfer ownership to:</span>
                <select
                    value={this.state.owner}
                    name='owner'
                    onChange={this.handleChange}
                >
                    <option value="" disabled>Owner</option>
                    {this.props.getOwners().map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <button onClick={this.handleClick}>Transfer</button>

                {/* Email row */}
                <span>Send email:</span>
                <select
                    value={this.state.emailType}
                    name='emailType'
                    onChange={this.handleChange}
                >
                    <option value="" disabled >Email Type</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
                <button onClick={this.handleClick}>Send</button>

                {/* Sale row */}
                <span>{this.state.sold ? 'Already sold!' : 'Declare sale!'}</span>
                <span></span>
                <div onClick={this.handleSale}>{!this.state.sold && <button>Declare</button>}</div>
            </div>
        );
    };
}

export default ClientActions;