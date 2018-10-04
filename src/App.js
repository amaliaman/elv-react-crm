import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import NavBar from './components/general/NavBar';
import Clients from './components/clients/Clients';
import Actions from './components/actions/Actions';
import Analytics from './components/analytics/Analytics';

import apiUtils from './utils/apiUtils';

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

    toggleModal = () => {
        this.setState({ closeModal: !this.state.closeModal });
    }

    toggleResetAddForm = () => {
        this.setState({ resetAddForm: !this.state.resetAddForm });
    }

    /**
    * update newly updated client in state (from API)
    */
    updateClientInState = clientData => {
        const clients = [];
        this.state.clients.forEach(c => {
            clients.push({ ...c })
        });
        let client = clients.find(c => c._id === clientData._id);
        Object.keys(clientData).forEach(k => client[k] = clientData[k]);
        this.setState({ clients: clients });
    };

    /**
     * Update a client in API and state
     */
    updateClient = async clientData => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}/${clientData._id}`;
        const client = await apiUtils.putApi(url, clientData);
        if (client.status === 201) {
            this.setState({ closeModal: true });
            this.updateClientInState(client.data);
        }
        else {
            console.error(client.status, client.statusText);
        }
    };

    /**
     * Add newly created client to state (from API)
     */
    addClientToState = client => {
        const clients = [];
        this.state.clients.forEach(c => {
            clients.push({ ...c })
        });
        clients.unshift(client);///push?
        this.setState({ clients: clients });
    };

    /**
     * Add a new client to API and state
     */
    addClient = async clientData => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}`;
        const client = await apiUtils.postApi(url, clientData);
        if (client.status === 201) {
            this.setState({ resetAddForm: true });
            this.addClientToState(client.data);
        }
        else {
            console.error(client.status, client.statusText);
        }
    };

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
