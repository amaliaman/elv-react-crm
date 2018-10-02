import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Clients from './components/clients/Clients';
import NavBar from './components/general/NavBar';
import apiUtils from './utils/apiUtils';
import clientUtils from './utils/clientUtils';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            clients: [],
            isError: false,
            errorMessage: '',
            closeModal: false
        };
    };

    updateClient = clientData => {
        const newClients = clientUtils.updateClient(this.state.clients, clientData)
        this.setState({ clients: newClients, closeModal: true });

    };

    toggleModal = () => {
        this.setState({ closeModal: !this.state.closeModal });
    }

    componentDidMount = async () => {
        try {
            const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}`;
            const response = await apiUtils.queryApi(url);

            if (response.status === 200) {
                this.setState({
                    clients: response.data.filter((c, i) => i < 20)
                });
            }
            else {
                this.setState({
                    isError: true,
                    errorMessage: response.statusText
                });
            }
        }
        catch (error) {
            console.error(error);
            this.setState({
                isError: true,
                errorMessage: error.toString()
            });
        }
    };

    render() {
        // TODO: ERROR HANDLING
        return (
            <Router>
                <div>
                    <NavBar />
                    <Route path="/" exact render={() => <Redirect to="/clients" />} />
                    <Route path="/clients" exact render={() =>
                        <Clients
                            clients={this.state.clients}
                            updateClient={this.updateClient}
                            closeModal={this.state.closeModal}
                            toggleModal={this.toggleModal}
                        />
                    } />
                    <Route path="/actions" exact render={() =>
                        <p>actions</p>
                    } />
                    <Route path="/analytics" exact render={() =>
                        <p>analytics</p>
                    } />
                </div>
            </Router>
        );
    }
}

export default App;
