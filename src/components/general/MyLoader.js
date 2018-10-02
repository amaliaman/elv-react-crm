import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export class MyLoader extends Component {
    render() {
        return (
            <div>
                {this.props.loaded ?
                    <div>{this.props.children}</div>
                    :
                    (<div className="loader-container">
                        <Loader type="Watch" color="#F7CE3E" />
                    </div>)
                }
            </div>
        )
    }
}

export default MyLoader
