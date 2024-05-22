import React, { Component } from 'react';

import './select.css'

export default class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectlistdata:[]
        }
    }

    componentDidMount() {
        var obj =this.props.data
        var newselect = [];

        for (let i = 0; i < obj.length; i++) {
            let select = [];

            let name = Object.keys(obj[i])[0]
            let value = Object.keys(obj[i])[1]
            console.log(name)
            console.log(value)

            select = {
                name: obj[i][name],
                value: obj[i][value]
            };
            newselect.push(select)
        }
        this.setState({selectlistdata:newselect})
    }


    render() {
        return (
            <>

                {

                    this.props.inline ?
                        <form>
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
                                    <div className="InlineInuputBox">
                                        <select
                                            value={this.props.value}
                                            className="form-control"
                                            onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange && this.props.onChange(e)}
                                            onClick={(e) => this.props.onClick && this.props.onClick(e)}
                                            readOnly={this.props.readOnly}
                                            style={this.props.inputStyle}
                                            disabled={this.props.disabled}
                                        >
                                       <option value="" selected disabled>{this.props.defaultselect}</option>

                                            {

                                                this.state.selectlistdata.map((s, index) => {
                                                    console.log(s)
                                                    return (

                                                        <option key={index} value={s.value}>
                                                            {s.name}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </form>
                        :
                        <form>
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
                                    placeholder={this.props.placeholder}
                                    value={this.props.value}
                                    className="form-control"
                              
                                    // onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange && this.props.onChange(e)}
                                    onClick={(e) => this.props.onClick && this.props.onClick(e)}
                                    onChange={(e) => this.props.onChange && this.props.onChange(e)}

                                    style={this.props.inputStyle}
                                    disabled={this.props.disabled}
                                >
                                    <option value="" selected disabled>{this.props.defaultselect}</option>
                                    {

                                        this.state.selectlistdata.map((s, index) => {
                                            console.log(s)
                                            return (

                                                <option key={index} value={s.value}>
                                                    {s.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>

                            </div>
                        </form>
                }
            </>
        )
    }
}

