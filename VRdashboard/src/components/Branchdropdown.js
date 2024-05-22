import React, { Component } from 'react';
import './orgdropdown.css'


class Branchdropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      branchid:"",
    }
    this.branchdata = this.branchdata.bind(this)

  }

  branchdata=(e)=>{
      console.log(e.target.value) 
      this.setState({
        branchid:e.target.value
      })
      this.props.getCallback(e.target.value)
      console.log(this.state.branchid)
  }
  render () {
    const { branches } = this.props.state;

    let branchesList = branches.length > 0
    	&& branches.map((item, i) => {
        console.log(item,"mapping console")
      return (
        <option  key={i} value={item.BranchID}>{item.BranchName}</option>
      )
    }, this);

    return (
      <div className='organization' style={{position:"absolute",right:"55px",top:"12px"}}>
        <select onChange={(e) => this.branchdata(e)} disabled={this.props.disable}>
          <option > Select Branch</option>
          {branchesList}
        </select>
      </div>
    );
  }
}

export default Branchdropdown;