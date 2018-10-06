import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import ClientsRow from './ClientsRow';
import MyLoader from '../general/MyLoader';
import EditClientModal from './EditClientModal';
import Search from './Search';
import Pager from './Pager';

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
            currentClient: null,
            searchTerm: '',
            selectFilter: ''
        }
    };

    setSearchTerm = (term, filter) => {
        this.setState({ searchTerm: term, selectFilter: filter });
    };

    closeEditDialog = () => {
        this.setState({ isEdit: false });
    }

    openEditDialog = client => {
        this.setState({ isEdit: true, currentClient: client });
    };

    getFilteredList = () => {
        const { clients } = this.props;
        const { searchTerm, selectFilter } = this.state;
        const list = searchTerm ?
            clients.filter(c => {
                if (selectFilter !== 'sold') {
                    return c[selectFilter] && c[selectFilter].toLowerCase().includes(searchTerm.toLowerCase());
                }
                else {
                    let isSold;
                    if (searchTerm === 'y') { isSold = true }
                    else if (searchTerm === 'n') { isSold = false }
                    return c[selectFilter] === isSold;
                }
            }) :
            clients;
        return list;
    };

    componentDidUpdate = () => {
        if (this.props.closeModal) {
            this.closeEditDialog();
            this.props.toggleModal();
        }
    };

    render() {
        let clientsList = this.getFilteredList();

        return (
            <MyLoader loaded={clientsList.length > 0 || this.state.searchTerm}>
                <div className='main-container'>
                    <Modal
                        open={this.state.isEdit}
                        onClose={this.closeEditDialog}
                        classNames={{ modal: 'modal', closeIcon: 'close-icon' }}
                        center
                    >
                        <EditClientModal client={this.state.currentClient} updateClient={this.props.updateClient} />
                    </Modal>
                    <div className='table-bar'>
                        <Search
                            searchTerm={this.state.searchTerm}
                            selectFilter={this.state.selectFilter}
                            setSearchTerm={this.setSearchTerm}
                        />
                        <Pager
                            firstResult={this.props.firstResult}
                            lastResult={this.props.lastResult}
                            totalItems={this.props.totalItems}
                            pageForward={this.props.pageForward}
                            pageToStart={this.props.pageToStart}
                            pageBackwards={this.props.pageBackwards}
                            pageToEnd={this.props.pageToEnd}
                        />
                    </div>
                    <ClientsHeader />
                    {clientsList.map(c => <ClientsRow key={c._id} client={c} openEditDialog={this.openEditDialog} />)}
                </div>
            </MyLoader>
        )
    }
}

export default Clients;
