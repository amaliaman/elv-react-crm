import React, { Component } from 'react'

class Pager extends Component {
    constructor() {
        super();
        this.state = {
            firstResult: 0,
            lastResult: 0,
            totalItems: 0
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.firstResult !== this.props.firstResult) {
            this.setState({ firstResult: this.props.firstResult });
        }
        if (prevProps.lastResult !== this.props.lastResult) {
            this.setState({ lastResult: this.props.lastResult });
        }
        if (prevProps.totalItems !== this.props.totalItems) {
            this.setState({ totalItems: this.props.totalItems });
        }
    };

    componentDidMount = () => {
        this.setState({
            firstResult: this.props.firstResult,
            lastResult: this.props.lastResult,
            totalItems: this.props.totalItems
        });
    };

    render() {
        const { firstResult, lastResult, totalItems } = this.state;
        return (
            <div className='pager-container'>
                <button onClick={this.props.pageToStart} disabled={firstResult <= 0}>&lt;&lt;</button>
                <button onClick={this.props.pageBackwards} disabled={firstResult <= 0}>&lt;</button>
                <span>{firstResult + 1}-{lastResult + 1} {/* / {totalItems} */}</span>
                <button onClick={this.props.pageForward} disabled={lastResult + 1 >= totalItems}>&gt;</button>
                <button onClick={this.props.pageToEnd} disabled={lastResult + 1 >= totalItems}>&gt;&gt;</button>
            </div>
        )
    }
}

export default Pager;
