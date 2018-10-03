const getClientById = (clients, id) => {
    return clients.find(c => c._id === id);
};

const getClientByIdMinimal = (clients, id) => {
    const client = getClientById(clients, id);
    const { owner, emailType, sold } = client;
    const data = { owner, emailType, sold };
    return data;
};

const getOwners = clients => {
    let owners = [...new Set(clients.map(c => c.owner))];
    return owners;
};

const getClientNames = clients => {
    const clientNames = [];
    clients.forEach(c => clientNames.push({ name: c.name, id: c._id }));
    return clientNames;
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
    // Methods
    updateClient: updateClient,
    addClient: addClient,
    getClientNames: getClientNames,
    getClientByIdMinimal: getClientByIdMinimal,
    getOwners: getOwners
};

export default clientUtils;