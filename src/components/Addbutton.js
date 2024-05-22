import React, { Component } from 'react'
export default class Addbutton extends Component {
  constructor(props) {
    super(props);
    this.Iframedata = this.Iframedata.bind(this)
  }
  Iframedata(e) {
    this.props.showdata(e.target.value)
  }
  render() {
    return (
      <button onClick={(e) => this.Iframedata(e)} type="button" className="btn" style={{ background: "#008a3e", color: "white", letterSpacing: "1px", padding: "5px", width: "auto" }}>+ Organization</button>
    )
  }
}
