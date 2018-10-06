import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import NavBar from './components/general/NavBar';
import Clients from './components/clients/Clients';
import Actions from './components/actions/Actions';
import Analytics from './components/analytics/Analytics';

import apiUtils from './utils/apiUtils';

import './App.css';

const deepCopyArray = array => {
    return JSON.parse(JSON.stringify(array));
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            clients: [],
            isError: false,
            errorMessage: '',
            closeModal: false,
            resetAddForm: false,
            firstResult: 0,
            lastResult: 0,
            totalItems: 0,
            pageSize: 0
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
        const clients = deepCopyArray(this.state.clients);
        let client = clients.find(c => c._id === clientData._id);
        Object.keys(clientData).forEach(k => client[k] = clientData[k]);
        this.setState({ clients: clients }, alert(`${clientData.name} was updated successfully`));
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
        const clients = deepCopyArray(this.state.clients);
        clients.push(client);
        this.setState({ clients: clients }, alert(`${client.name} was added successfully`));
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
    getClients = async index => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_PAGED_API}/${index}`;
        return await apiUtils.getData(url);
    };

    // Paginating methods
    /**
     * Paginate one page forward
     */
    pageForward = () => {
        this.setState({ firstResult: this.state.lastResult + 1 });
    };

    /**
     * Paginate one page backwards
     */
    pageBackwards = () => {
        this.setState({ firstResult: this.state.firstResult - this.state.pageSize });
    };

    /**
     * Paginate to the first page
     */
    pageToStart = () => {
        this.setState({ firstResult: 0 });
    };
    /**
     * Paginate to the last page
     */
    pageToEnd = () => {
        this.setState({ firstResult: this.state.totalItems - this.state.totalItems % this.state.pageSize});
    };

    /**
     * Get clients from specific page
     */
    componentDidUpdate = async (prevProps, prevState) => {
        const { firstResult } = this.state;
        if (prevState.firstResult !== firstResult) {
            const clients = await this.getClients(firstResult);
            this.setState({
                clients: clients.data,
                lastResult: clients.lastResult,
                pageSize: clients.pageSize,
                totalItems: clients.totalItems
            });
        }
    };

    /**
    * Get clients on app load
    */
    componentDidMount = async () => {
        const clients = await this.getClients(0);
        this.setState({
            clients: clients.data,
            lastResult: clients.lastResult,
            pageSize: clients.pageSize,
            totalItems: clients.totalItems
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
                            firstResult={this.state.firstResult}
                            lastResult={this.state.lastResult}
                            totalItems={this.state.totalItems}
                            pageForward={this.pageForward}
                            pageToStart={this.pageToStart}
                            pageBackwards={this.pageBackwards}
                            pageToEnd={this.pageToEnd}
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