import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "./table.css";

class home extends Component {
    render() {
        return (
            <>
                <div className="container-fulid" style={{ padding: "0px", display: "fixed", style: "overflow-x: auto" }}>
                    <div className="row" >
                        <div className="col-md-12" >
                            <div>
                                <Table responsive className="table table-striped">
                                    <thead scope="row" style={{ whiteSpace: "nowrap" }}>
                                        <tr
                                            style={{
                                                background: "#6c7ae0",
                                                color: "white",
                                                position: "sticky",
                                                top: "0px",
                                            }}
                                        >
                                            <th>Status</th>
                                            <th>CID</th>
                                            <th>Contact Name</th>
                                            <th>Company Name</th>
                                            <th>Contact Number</th>
                                            <th>Designation</th>
                                            <th>Company Size</th>
                                            <th>Email ID</th>
                                            <th>Lead Source</th>
                                            <th>Next Follow Up</th>
                                            <th>Stage</th>
                                            <th>Last Updated On</th>
                                            <th>Last Remark</th>
                                            <th>Next Step</th>
                                            <th>Enquired On</th>
                                            {/* {
                                                this.props.headerkeys.map((s, index) => {
                                                    console.log(s)
                                                    return (
                                                        // <th>{s}</th>
                                                        
                                                    )
                                                   
                                                })
                                            } */}
                                        </tr>
                                    </thead>
                                    {/* <tbody style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
                                        {this.props.header.map((s, index) => {
                                            console.log(s)
                                            // var keys = this.props.headerkeys;
                                            // console.log(s);
                                            // return (
                                            //     <tr key={index} style={{ cursor: "pointer" }}>
                                            //         {
                                            //             keys.map((data, key) => {
                                            //                 if (s[data] == null) {
                                            //                     s[data] = ''
                                            //                 }
                                            //                 if (typeof s[data] != "object") {
                                            //                     return <td key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
                                            //                 }
                                            //             })
                                            //         }
                                            //     </tr>
                                            // );
                                            return (
                                                <>
                                                    <tr onClick={(e) => this.leadstablerowclick(e)} className="hovereffect" >
                                                        <td><img src={box} style={{ height: "35px", width: "30px", padding: "2px", hover: "after" }}/>
                                                        <td>{s.cid}</td>
                                                        <td>{s["contact name"]}</td>
                                                        <td>{s["company name"]}</td>
                                                        <td>{s["contact number"]}</td>
                                                        <td>{s.designation}</td>
                                                        <td>{s["company size"]}</td>
                                                        <td>{s.emailid}</td>
                                                        <td>{s["lead source"]}</td>
                                                        <td>{s["next follow up"]}</td>
                                                        <td>{s.stage}</td>
                                                        <td>{s["last updated on"]}</td>
                                                        <td>{s["last remarks"]}</td>
                                                        <td>{s["next step"]}</td>
                                                        <td>{s["enquired on"]}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody> */}
                                    
                                </Table>
                                
                            </div>
                            </div>
                        </div>
                    </div>
    
    
                </>
            );
    
        }
                                
}