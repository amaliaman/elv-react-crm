import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import ClientsRow from './ClientsRow';
import MyLoader from '../general/MyLoader'
import EditClient from './EditClient';

const ClientsHeader = () => {
    return (
        <div className='clients-header clients-row'>
            <span>Name</span>
            <span>Surname</span>
            <span>Country</span>
            <span>First Contact</span>
            <span>Email</span>
            <span>Sold</span>
            <span>Owner</span>
        </div>
    )
};

class Clients extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            currentClient: null
        }
    };

    closeEditDialog = () => {
        this.setState({ isEdit: false });
    }

    openEditDialog = client => {
        this.setState({ isEdit: true, currentClient: client });
    };

    componentDidUpdate = () => {
        if (this.props.closeModal) {
            this.closeEditDialog();
            this.props.toggleModal();
        }
    };

    render() {
        const { clients } = this.props;

        return (
            <MyLoader loaded={clients.length > 0}>
                <div className='clients-container'>
                    <Modal
                        open={this.state.isEdit}
                        onClose={this.closeEditDialog}
                        classNames={{ modal: 'modal', closeIcon: 'close-icon' }}
                        center
                    >
                        <EditClient client={this.state.currentClient} updateClient={this.props.updateClient} />
                    </Modal>
                    <ClientsHeader />
                    {clients.map(c => <ClientsRow key={c._id} client={c} openEditDialog={this.openEditDialog} />)}
                </div>
            </MyLoader>
        )
    }
}

export default Clients;
