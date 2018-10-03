// import apiUtils from './apiUtils';

const getClientById = (clients, id) => {
    return clients.find(c => c._id === id);
};

const updateClient = (stateClients, clientData) => {
    // VALIDATIONNNNNNNNNNN

    // Make a deep copy of the state
    const clients = [];
    stateClients.forEach(c => {
        clients.push({ ...getClientById(stateClients, c._id) })
    });

    let client = getClientById(clients, clientData._id);
    Object.keys(clientData).forEach(k => client[k] = clientData[k]);

    console.error('TODO: update in DB (updateClient):\n', client);
    return clients;
};

const addClient = (stateClients, clientData) => {
    // VALIDATIONNNNNNNNNNN
    const { firstName, surname, country, owner } = clientData;

    // Make a deep copy of the state
    const clients = [];
    stateClients.forEach(c => {
        clients.push({ ...getClientById(stateClients, c._id) })
    });

    const client = {};
    client.name = `${firstName} ${surname}`;
    client.country = country;
    client.owner = owner;

    clients.push(client);
    console.error('TODO: create in DB (addClient):\n' + JSON.stringify(client));
    return clients;
};

const clientUtils = {
    updateClient: updateClient,
    addClient: addClient,
};

export default clientUtils;