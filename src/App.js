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
            pageSize: 0,
            names: []
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
        if (client) {
            Object.keys(clientData).forEach(k => client[k] = clientData[k]);
            this.setState({ clients: clients });
        }
    };

    /**
     * Update a client in API and state
     */
    updateClient = async clientData => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}/${clientData._id}`;
        const client = await apiUtils.putApi(url, clientData);
        if (client.status === 201) {
            alert(`${client.data.name} was updated successfully`)
            this.setState({ closeModal: true });
            this.updateClientInState(client.data);
        }
        else {
            console.error(client.status, client.statusText);
        }
        // Update this.state.names for selector
        const options = deepCopyArray(this.state.names);
        const option = options.find(o => o.value === clientData._id);
        if (option.label !== clientData.name) {
            option.label = clientData.name;
        }
        this.setState({ names: options });
    };

    /**
     * Add newly created client to state (from API)
     */
    addClientToState = client => {
        // Only if on last page
        const isLastPage = this.state.lastResult + 1 >= this.state.totalItems;
        if (isLastPage) {
            const clients = deepCopyArray(this.state.clients);
            clients.push(client);
            this.setState({ clients: clients });
        }
        // Add to names for selector + increase totalItems
        const options = deepCopyArray(this.state.names);
        options.push({ value: client._id, label: client.name });
        this.setState({ names: options, totalItems: this.state.totalItems + 1 });
    };

    /**
     * Add a new client to API and state
     */
    addClient = async clientData => {
        const url = `${apiUtils.SERVER_URL}${apiUtils.CLIENTS_API}`;
        const client = await apiUtils.postApi(url, clientData);
        if (client.status === 201) {
            alert(`${client.data.name} was added successfully`)
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
        const lastPage = this.state.totalItems % this.state.pageSize;
        let firstResult = this.state.totalItems - this.state.pageSize;
        if (lastPage > 0) {
            firstResult = this.state.totalItems - this.state.totalItems % this.state.pageSize;
        }
        this.setState({ firstResult: firstResult });
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
        // Get current page's clients
        const clients = await this.getClients(0);
        this.setState({
            clients: clients.data,
            lastResult: clients.lastResult,
            pageSize: clients.pageSize,
            totalItems: clients.totalItems
        });
        // Get all client names for selector
        const names = await this.getClientNames();
        const options = [];
        names.forEach(c => {
            options.push({ value: c._id, label: c.name })
        });
        this.setState({ names: options });
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
                            names={this.state.names}
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