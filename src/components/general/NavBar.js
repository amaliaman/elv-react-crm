import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            links: [
                { label: 'Clients', to: '/clients' },
                { label: 'Actions', to: '/actions' },
                { label: 'Analytics', to: '/analytics' }
            ]
        };
    };

    render() {
        return (
            <nav>
                {this.state.links.map(l => {
                    return (
                        <NavLink to={l.to} key={l.label} activeClassName='active-link'>
                            {l.label}
                        </NavLink>
                    );
                })}
            </nav>
        );
    };
}

export default NavBar;