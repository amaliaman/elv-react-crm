import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import NavBar from './components/general/NavBar';
import Clients from './components/clients/Clients';
import Actions from './components/actions/Actions';
import Analytics from './components/analytics/Analytics';

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
            closeModal: false,
            resetAddForm: false
        };
    };

    updateClient = clientData => {
        const newClients = clientUtils.updateClient(this.state.clients, clientData);
        this.setState({ clients: newClients, closeModal: true });
    };

    /**
     * Add a new client to API and state
     */
    addClient = async clientData => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}`;
        const newClient = await apiUtils.postApi(url, clientData);
        console.error('TODO: save new client to state\n', newClient)
        // save new client to state //////////////////////////////////////////
    };

    toggleModal = () => {
        this.setState({ closeModal: !this.state.closeModal });
    }

    toggleResetAddForm = () => {
        this.setState({ resetAddForm: !this.state.resetAddForm });
    }

    /**
     * Get a specific client by its ID
     */
    getClientDetails = async id => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}/${id}`;
        return await apiUtils.getData(url);
    };

    /**
     * Get an array of all client names & IDs, for client selector autocomplete
     */
    getClientNames = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENT_NAMES_API}`;
        return await apiUtils.getData(url);
    };

    /**
     * Get all owners from API, displayed in the 'actions' screen when choosing a client
     */
    getOwners = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.OWNERS_API}`;
        return await apiUtils.getData(url);
    };

    /**
     * Get all/paged amount of clients from API
     */
    getClients = async () => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}`;
        return await apiUtils.getData(url);
    };

    // Get clients on app load
    componentDidMount = async () => {
        const clients = await this.getClients();
        this.setState({
            clients: clients.filter((c, i) => i < 20) // only 20 until paging implemented
        });
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
                        <Actions
                            updateClient={this.updateClient}
                            getOwners={this.getOwners}
                            addClient={this.addClient}
                            resetAddForm={this.state.resetAddForm}
                            toggleResetAddForm={this.toggleResetAddForm}
                            getClientNames={this.getClientNames}
                            getClientDetails={this.getClientDetails}
                        />
                    } />

                    <Route path="/analytics" exact render={() =>
                        <Analytics />
                    } />
                </div>
            </Router>
        );
    }
}

export default App;
