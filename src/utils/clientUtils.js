const getClientById = (clients, id) => {
    return clients.find(c => c._id === id);
};

const updateClient = (stateClients, clientData) => {
    // VALIDATIONNNNNNNNNNN
    const { firstName, surname, country, id } = clientData;

    // Make a deep copy of the state
    const clients = [];
    stateClients.forEach(c => {
        clients.push({ ...getClientById(stateClients, c._id) })
    });

    const client = getClientById(clients, id);
    client.name = `${firstName} ${surname}`;
    client.country = country;
    console.error('TODO: update in DB (updateClient):\n' + JSON.stringify(client));
    return clients;
};

const clientUtils = {
    // Methods
    updateClient: updateClient
};

export default clientUtils;