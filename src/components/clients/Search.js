import React, { Component } from 'react';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            localSearchTerm: '',
            localSelectFilter: 'name'
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { localSearchTerm, localSelectFilter } = this.state;
        if (prevState.localSearchTerm !== localSearchTerm ||
            prevState.localSelectFilter !== localSelectFilter) {
            this.props.setSearchTerm(localSearchTerm, localSelectFilter);
        }
    };

    render() {
        return (
            <div className='search-container'>
                <input type='text' name='localSearchTerm' value={this.props.searchTerm} onChange={this.handleChange} placeholder="Search" />
                <select name='localSelectFilter' value={this.props.selectFilter} onChange={this.handleChange}>
                    <option value='name'>Name</option>
                    <option value='owner'>Owner</option>
                    <option value='country'>Country</option>
                    <option value='emailType'>Email</option>
                    <option value='sold'>Sold</option>
                </select>
                {this.state.localSelectFilter === 'sold' && <span>Enter 'y' or 'n' in the search box</span>}
            </div>
        );
    };
}

export default Search;