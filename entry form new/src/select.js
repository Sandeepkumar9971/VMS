import React, { Component } from 'react';

import './select.css';

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            

        }
    }

    // componentDidMount() {

    //     // let key = Object.keys(obj[0])

    //     var obj =this.props.data
    //     var newselect = [];

    //         for (let i = 0; i < obj.length; i++) {
    //             let select = [];

    //             let name = Object.keys(obj[i])[1]
    //             let value = Object.keys(obj[i])[0]
    //             // console.log(name)
    //             // console.log(value)

    //             select = {
    //                 name: obj[i][name],
    //                 value: obj[i][value]
    //             };
    //             newselect.push(select)
    //         }
    //     this.setState({ selectlistdata: newselect })
    // }


    render() {

        // console.log(this.props.value)
        return (
            <>
                {

                    this.props.inline ?
                        <div className="InlineInput">
                            <div className='InlineFirstBox'>
                                <div className="InlineLabel">
                                    <label htmlFor={this.props.htmlFor} className="col-form-label" style={this.props.labelStyle}>
                                        {this.props.label}
                                        {
                                            this.props.required ?
                                                <span style={{ color: 'red', fontSize: "18px", fontWeight: "600", paddingLeft: "5px" }}>*</span>
                                                : null
                                        }
                                    </label>
                                </div>
                                <div className="InlineInuputBox" id="inlineInputBox">

                                    <select
                                        value={this.props.value}
                                        className="form-control"
                                        onChange={(e) => this.props.onChange && this.props.onChange(e)}
                                        readOnly={this.props.readOnly}
                                        style={this.props.inputStyle}
                                        labelStyle={{ fontWeight: "600" }}
                                        inputStyle={{ color: "red", paddingLeft: "0px" }}
                                        disabled={this.props.disabled}
                                    >

                                        {/* <option value="" Selected disabled>{this.props.defaultset}</option> */}
                                        <option value="" >{this.props.defaultset}</option>

                                        {

                                            this.props.data.map((s, index) => {
                                                console.log()
                                                let newkey = Object.keys(this.props.data[index])
                                                // console.log(newkey)
                                                return (

                                                    <option value={s[newkey[0]]}>
                                                        {s[newkey[1]]}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="form-group">
                            <label htmlFor={this.props.htmlFor} style={this.props.labelStyle}>
                                {this.props.label}
                                {
                                    this.props.required ?
                                        <span style={{ color: 'red', fontSize: "18px", paddingLeft: "5px" }}>*</span>
                                        : null
                                }
                            </label>


                            <select
                                value={this.props.value}
                                className="form-control"
                                onChange={(e) => this.props.onChange && this.props.onChange(e)}
                                style={this.props.inputStyle}
                                readOnly={this.props.readOnly}
                                disabled={this.props.disabled}
                            >
                                {/* <option value="" Selected disabled>{this.props.defaultset}</option> */}
                                <option value="">{this.props.defaultset}</option>

                                {

                                    this.props.data.map((s, index) => {
                                        // console.log(s)
                                        let newkey = Object.keys(this.props.data[index])
                                        // console.log(newkey)
                                        // console.log(s[newkey[0]])
                                        return (

                                            <option value={s[newkey[0]]}>
                                                 {s[newkey[1]]}
                                            </option>
                                        );
                                    })
                                }
                            </select>

                        </div>
                }
            </>
        )
    }
}

