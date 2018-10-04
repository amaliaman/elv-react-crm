import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export class MiniLoader extends Component {
    render() {
        return (
            <div>
                {this.props.loaded ?
                    <div>{this.props.children}</div>
                    :
                    (<div className="mini-loader-container">
                        <Loader type="ThreeDots" color="#F7CE3E" height={10} />
                    </div>)
                }
            </div>
        )
    }
}

export default MiniLoader
