import React, { Component } from 'react';
import { StringFormatter } from './StringFormatter';
import axios from 'axios';
import './orgdropdown.css'
import { Modal, Button } from "react-bootstrap";


var olddata = []

class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientid: sessionStorage.getItem("clientid"),
      Organize: [],
      show: false,
      isSearchValue: false,
      search: "",
      selectedclient: sessionStorage.getItem("clientname"),
      UserNotSearched: false

    }
    this.passData = this.passData.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.listclicked = this.listclicked.bind(this);

    this.organizationlist = this.organizationlist.bind(this)


  }

  organizationlist() {
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
      olddata = resp.data['']
    })
  }

  componentDidMount() {
    // my code
    this.organizationlist()
    // my code end
  }

  handleClose = () => {
    this.setState({ show: false, search: "" });
  };

  passData(item) {
    console.log(item.ClientID)

    console.log("hello")
    console.log(this.state.selectedclient, this.state.clientid)
    sessionStorage.setItem("clientid", item.ClientID)
    sessionStorage.setItem("clientname", item.EstablismentName)

    //   this.setState({selectedclient:item.EstablismentName,clientid:item.ClientID,show:false})
    //  setTimeout(() => {
    //   console.log(this.state.selectedclient,this.state.clientid)

    //  }, 2000);

    //   console.log(item.ClientID, "its click on organization")
    window.location.reload()
    // this.props.callback(item.ClientID,item.EstablismentName)
  }

  // search start
  storeSearch = (e) => {
    console.log(e.target.value)
    this.setState({ isSearchValue: true, search: e.target.value })
    if (e.target.value == '') {
      this.setState({ Organize: olddata })
    } else {
      this.setState({ Organize: olddata.filter(Organize => (Organize.EstablismentName).toLowerCase().includes(e.target.value.toLowerCase())) })
    }

    //   if (document.getElementById('searchManagerbox')) {
    //     var value = document.getElementById('searchManagerbox').value
    //     console.log(value)
    //     if (value == '') {
    //       this.setState({Organize:olddata})


    //     } else {
    //         console.log("empty")
    //         // alert(value)
    //         if (olddata.filter(Organize => (Organize.EstablismentName).toLowerCase().includes(e.target.value.toLowerCase())).length > 0) {
    //       this.setState({Organize:olddata.filter(Organize => (Organize.EstablismentName).toLowerCase().includes(e.target.value.toLowerCase()))})

    //           this.setState({UserNotSearched: false})

    //         } else {
    //           this.setState({UserNotSearched:true})
    //         }
    //     }
    // } else {
    //   this.setState({Organize:olddata})

    // }
  }
  // search end

  listclicked() {
    this.setState({ show: true })
    this.organizationlist()

  }
  render() {
    // const { Organize } = this.state;

    return (
      <div className='organization' style={{}}>
        {
          this.props.usertype == 3 ?
            <p onClick={() => this.listclicked()} style={{ cursor: "pointer", color: "black", marginBottom: "0px" }}>{this.state.selectedclient}<span style={{ marginLeft: "8px" }}><i class="fa-solid fa-caret-down"></i></span></p>
            :
            <p style={{ cursor: "pointer", color: "black", marginBottom: "0px" }}>{this.state.selectedclient}</p>
        }

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="row searchBox">
                <div className="col-md-12">
                  <div id="search">
                    <input type="text" placeholder='Search...' id="searchManagerbox" value={this.state.search} className="form-control" onChange={(e) => this.storeSearch(e)} autoFocus={true} />
                  </div>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              this.state.Organize.length > 0
              && this.state.Organize.map((item, i) => {
                return (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer", marginTop: "10px" }} onClick={() => this.passData(item)}>
                      <p key={i} >{item.EstablismentName}</p>
                      {item.Notifications <= 0 ?
                        ""
                        :
                        <p style={{ background: "#48d1cc", borderRadius: "50%", padding: "2px 9px", color: "white" }}>{item.Notifications}</p>
                      }
                    </div>
                  </>
                )
              })
            }
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default Organization;