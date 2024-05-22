import React, { Component } from 'react';
import { StringFormatter } from './StringFormatter';
import axios from 'axios';
import './orgdropdown.css'




class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientid: sessionStorage.getItem("clientid"),
      Organize: [],
      // colours: {},
    }
    this.passData = this.passData.bind(this)
  }



  componentDidMount() {

    // my code
    var fd = new FormData();
    let queryString = "[SLCI_Web_proc_Admin_Client_Getlist]"
    let queryArr = []
    var formattedString = StringFormatter(queryString, queryArr)
    fd.append("Query", formattedString);
    console.log(formattedString)
    axios({
      mode: 'cors',
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: `${sessionStorage.getItem('Apipathurl')}fetchrsdata.php`,
      data: fd
    }).then(resp => {
      console.log(resp.data[""])
      this.setState({ Organize: resp.data[""] })
    
    })
    // my code end

  
  }

  passData(e){
    console.log(e.target.value)
    this.props.callback(e.target.value)
  }

  render() {
    const { Organize } = this.state;

   
    return (
      <div className='organization' style={{ position: "absolute",left:"140px", top: "210px" }}>
        <select onChange={(e) => this.passData(e)} value={this.state.clientid}>
          {/* <option value="-1">Select Organization</option> */}
          {
            Organize.length > 0
            && Organize.map((item, i) => {
              return (
                <option key={i} value={item.ClientID} >{item.EstablismentName}</option>
              )
            })
          }
        </select>
        
      </div>
    );
  }
}

export default Organization;