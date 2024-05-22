import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./table.css";
import Hexapi from './HexAPI/Hexapi';
import { Spinner } from 'react-bootstrap'
import TimeFormatter from './TimeFormatter/TimeFormatter'


sessionStorage.setItem('Apipathurl', 'http://Trackhr.trackhr.tech/sandboxvr/')
sessionStorage.setItem('userid', '1')

class Visitorlog extends Component {
    constructor() {
        super()
        this.state = {
            userid: sessionStorage.getItem('userid'),
            header: [],
            tableData: [],
            isApiComplete: false,
            isDataAvailable: false,
        }
        // this.storeuserid = this.storeuserid.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);


    }
    // storeuserid(e) {
    //     console.log(e)
    //     this.setState({ userid: e.target.value })
    // }


    fetchTableData() {
        this.setState({ isApiComplete: false, isDataAvailable: false })
        let obj = {
            'query': `[dbo].[VRApp_Web_Proc_VisitorLogs_GetListV2]@UserID='{0}'`,
            'queryArr': [
                `${this.state.userid}`,
            ]
        }
        Hexapi(obj).then(resp => {

            console.log(resp)
            if (resp[''].length > 0 && resp[''] != null) {
                var keys = Object.keys(resp[''][0]);
                console.log(keys)
                this.setState({ tableData: resp[''], header: Object.keys(resp[''][0]), isDataAvailable: true })
            } else {
                this.setState({ isDataAvailable: false })
            }
            // console.log(resp[""][""][0])
            // this.setState(this.state.userid)
        }).then(resp => {
            this.setState({ isApiComplete: true })
        })

    }
    setDate(date) {
        if (date != undefined) {
          var transformdate = date.split(".")[0];
          console.log(date);
          var exitdate = TimeFormatter(transformdate);
          console.log(exitdate);
          var visitorinfo= this.state.visitorinfo
          console.log(visitorinfo)
          var newReverseDate =
            exitdate.ShiftTime +
            "," +
            exitdate.userSplitedDate[2] +
            " " +
            exitdate.ShiftMonth +
            "`" +
            exitdate.CurYear.toString().slice(-2);
          console.log(newReverseDate);
        //   this.setState({ visitorinfo.intime: newReverseDate })
    
          return newReverseDate;
        }
      }


    componentDidMount() {
        this.fetchTableData()
        // sessionStorage.setItem('apipathurl')
    }




    render() {
        return (

            <div className="container-fulid" style={{ padding: "20px", display: "fixed" }}>
                <div className="row" >
                    <div className="col-md-12" >
                        {
                            this.state.isApiComplete ?
                                this.state.isDataAvailable ?
                                    <div>
                                        <Table responsive className="table ">
                                            <thead scope="row" style={{ whiteSpace: "nowrap" }}>
                                                <tr
                                                    style={{
                                                        background: '#E1563F',
                                                        color: 'var(--bgcolor)',
                                                        position: "sticky",
                                                        top: "0px",
                                                    }}
                                                >


                                                    {
                                                        this.state.header.map((s, index) => {
                                                            // console.log(s)
                                                            {
                                                                if (s != "recid") {
                                                                    if (s == "firstname") {
                                                                        return (
                                                                            <th>First Name</th>
                                                                        )
                                                                    }
                                                                    if (s == "lastname") {
                                                                        return (
                                                                            <th>Last Name</th>
                                                                        )
                                                                    }
                                                                    if (s == "contactnumber") {
                                                                        return (
                                                                            <th>Contact Number</th>
                                                                        )
                                                                    }
                                                                    if (s == "visitorcount") {
                                                                        return (
                                                                            <th>No. Of Visitor</th>
                                                                        )
                                                                    }
                                                                    if (s == "persontomeet") {
                                                                        return (
                                                                            <th>Person to Meet</th>
                                                                        )
                                                                    }
                                                                    if (s == "purpose") {
                                                                        return (
                                                                            <th>Purpose</th>
                                                                        )
                                                                    }
                                                                    if (s == "visitortype") {
                                                                        return (
                                                                            <th>Visitor Type</th>

                                                                        )
                                                                    }
                                                                    if (s == "visitstatus") {
                                                                        return (
                                                                            <th>Visit Status</th>
                                                                        )
                                                                    }
                                                                    if(s == "intime"){
                                                                        return(
                                                                            <th>In Time</th>
                                                                        )
                                                                    }
                                                                    if(s == "outtime"){
                                                                        return(
                                                                            <th>Out Time</th>
                                                                        )
                                                                    }
                                                                    if(s == "companyname"){
                                                                        return(
                                                                            <th>Company Name</th>
                                                                        )
                                                                    }

                                                                    return (
                                                                        <th>{s}</th>

                                                                    )
                                                                }
                                                            }




                                                        })
                                                    }

                                                </tr>
                                            </thead>


                                            <tbody style={{ whiteSpace: "nowrap"}}>
                                                {this.state.tableData.map((s, index) => {
                                                    // console.log(s)
                                                    var keys = Object.keys(this.state.tableData[0]);
                                                    // console.log(s);
                                                    return (

                                                        <tr onClick={(e) => this.vistortableclick(s)} key={index} >
                                                            {
                                                                keys.map((data, key) => {
                                                                   
                                                                    if (data != "recid") {
                                                                        if (s[data] == null) {
                                                                            s[data] = ''
                                                                        }

                                                                        if (typeof s[data] != "object") {
                                                                            if (data == "visitstatus") {
                                                                                if (s[data] == 1) {
                                                                                    s[data] = 'IN';
                                                                                    return <td style={{color:'green'}}key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
        
                                                                                } else if (s[data] == -1) {
                                                                                    s[data] = 'OUT';
                                                                                    return <td style={{color:'#ca0903'}} key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
        
                                                                                } else {
        
                                                                                }
                                                                            }else{
                                                                                return <td key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>

                                                                            }
                                                                            
                                                                           
                                                                        }else{
                                                                            console.log(s)
                                                                                return <td key={key} dangerouslySetInnerHTML={{ __html: this.setDate(s[data].date) }}></td>
                                                                        }
                                                                    }

                                                                }
                                                                )
                                                            }
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>

                                        </Table>
                                    </div>
                                    :
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "50vh",
                                        }}
                                    >
                                        <h3 style={{ fontFamily: "sans-serif", color: "var(--Record)" }}>No Records!</h3>
                                    </div>


                                :
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "50vh",
                                        alignItems: "center"
                                    }}
                                >
                                    <Spinner animation="border" variant="dark" />
                                </div>
                        }
                    </div>
                </div>
            </div>
        );



    }

}

export default Visitorlog;






