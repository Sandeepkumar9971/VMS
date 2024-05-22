import React, { Component } from "react";
import './cardv2.css';

class cardv2 extends Component {
    render() {
        return (
            <div className="container-fuild" >
                <div className="row" >
                    <div className="col-md-2">
                        <div className=" box four-group" style={{ backgroundColor:this.props.color }}>
                            <div className="firstbox">
                                <div className="icon">
                                    <i class="fa fa-smile-o fa-3x" aria-hidden="true"></i>
                                </div>
                                <div className="description">
                                    <span>{this.props.header}</span>
                                    <span>{this.props.value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        )
    }
}

export default cardv2;