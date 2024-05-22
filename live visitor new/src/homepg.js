import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./table.css";
import { Aesencryption } from "./Aes/Aes"
import "./App.css";
import Cardv2 from "./component/cardv2";
import Hexapi from './HexAPI/Hexapi';
import { Spinner, Modal } from 'react-bootstrap'
import "./styles.css";
import buildnumber from './buildNumber.json'
import Swal from "sweetalert2";
import Printcomp from "./component/printtrigger";
import ComponentToPrint from "./component/componenttoprint";
import ReactToPrint from 'react-to-print';
import Example from './component/printtrigger'
import { QrReader } from 'react-qr-reader'
import TimeFormatter from './TimeFormatter/TimeFormatter'





// import QRCode from "react-qr-code";

// import pdf from "React-to-pdf";

const visitordetails = React.createRef();

// sessionStorage.setItem('Apipathurl', 'http://Trackhr.trackhr.tech/sandboxvr/')
// sessionStorage.setItem('Apipathurl', 'https://hexbss.xyz/visitorregistertest/') 
// sessionStorage.setItem('orgdbname', 'VRApp_OrgDB_tester')
// sessionStorage.setItem('url', 'https://hexbss.xyz/visitorregistertest/web/')

sessionStorage.setItem('userid', '1')
const QRcoderef = React.createRef();

class homepg extends Component {
    constructor() {
        super()
        this.state = {
            userid: sessionStorage.getItem('userid'),
            header: [],
            tableData: [],
            livevisitor: [],
            test2visitor: [],
            testvisitor: [],
            remarks: "",
            isApiComplete: false,
            isDataAvailable: false,
            isModalOpen: false,
            isnewModalOpen: false,
            recid: "",
            date: "",
            data: "",
            callBack: false,
            visitorinfo: "",
            visitorid: "",
            showvisitor: "",
            // fetchrsurl: `${sessionStorage.getItem('Apipathurl')}fetchrsdataV3`,

        }
        this.vistortableclick = this.vistortableclick.bind(this);
        this.vistorexit = this.vistorexit.bind(this);
        this.closemodal = this.closemodal.bind(this);
        // this.newclosemodal = this.newclosemodal.bind(this);
        this.fetchTableData = this.fetchTableData.bind(this);
        // this.getqrdata = this.getqrdata.bind(this);
    }

    closemodal() {
        this.setState({ isModalOpen: false })
    }

    newclosemodal() {
        this.setState({ isnewModalOpen: false })
    }

    qrhandle() {
        let obj = {
            'query': `[dbo].[VRApp_Web_Proc_Organisation_GetDetails]`,
            'orgdbname': `${this.state.data.orgdbname}`,
            'queryArr': []
        }
        Hexapi(obj).then(resp => {
            this.setState({ qrconfig: resp[""][0]['qrconfig'] })
            console.log(this.state.qrconfig)
        }).catch(err => { console.error(err) })

    }


    fetchTableData() {
        this.setState({ isApiComplete: false, isDataAvailable: false })
        let obj = {
            'query': `[dbo].[VRApp_Web_Proc_LiveVisitor_GetListV2] @UserID='{0}'`,
            'queryArr': [
                `${this.state.userid}`,
            ]
        }
        Hexapi(obj).then(resp => {

            // console.log(resp)
            if (resp[''].length > 0 && resp[''] != null) {
                var keys = Object.keys(resp[''][0]);
                // console.log(keys)

                // this.setState({  livevisitor :resp['livevisitor'][0], test2visitor:resp['test2visitor'][0], testvisitor:resp['testvisitor'][0], tableData: resp[''], header: Object.keys(resp[''][0]), isDataAvailable: true })
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
    // getqrdata() {
    //     window.location.href = this.state.data
    // }



    vistortableclick(s) {
        this.setState({ isModalOpen: true })
        this.setState({ visitorinfo: s })
        this.setState({ visitorid: s.recid })
        // this.setState({ recid: visitorid })


        // this.setState({ showvisitor: s.recid })

        // this.fetchPhoto(s.recid)



        // setTimeout(() => {
        // console.log(this.state.visitorid)
        // console.log(recid)


        // }, 200);

    }
    vistorexit() {
        console.log(this.state.qrconfig)
        if (this.state.qrconfig == "0") {
            window.location.href = `${sessionStorage.getItem("url")}Exitform?${Aesencryption(`orgdbname=${sessionStorage.getItem('orgdbname')}&apipath=${sessionStorage.getItem('Apipathurl')}&visitorid=${this.state.visitorid}`)}`
        } else {
            this.setState({ isnewModalOpen: true })
        }
        // window.location.href= `${sessionStorage.getItem("url")}Exitform?${Aesencryption(`orgdbname=${sessionStorage.getItem('orgdbname')}&apipath=${sessionStorage.getItem('Apipathurl')}&visitorid=${this.state.visitorid}`)}`
    }
    setDate(date) {
        if (date != undefined) {
            var transformdate = date.split(".")[0];
            //   console.log(date);
            var exitdate = TimeFormatter(transformdate);
            //   console.log(exitdate);
            var visitorinfo = this.state.visitorinfo
            //   console.log(visitorinfo)
            var newReverseDate =
                exitdate.ShiftTime +
                "," +
                exitdate.userSplitedDate[2] +
                " " +
                exitdate.ShiftMonth +
                "`" +
                exitdate.CurYear.toString().slice(-2);
            //   console.log(newReverseDate);

            return newReverseDate;
        }
    }



    printpdf() {
        this.setState({ callBack: true })

    }

    componentDidMount() {
        this.fetchTableData()
        this.qrhandle()

    }

    render() {
        return (
            <>
                <Modal
                    id="modalcss"
                    show={this.state.isnewModalOpen}
                    onHide={() => this.newclosemodal()}
                    style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    this.setState({ data: result?.text })

                                    this.setState({ openscannermodal: false })
                                    console.log(this.state.data)

                                    setTimeout(() => {
                                        <a href={`${sessionStorage.getItem("url")}`}
                                            target="_blank"
                                            style={{ minHeight: "48px" }}>
                                        </a>
                                        this.getqrdata()
                                    }, 100);
                                }

                                if (!!error) {
                                    //   console.info(error);
                                }
                            }}
                            style={{ width: '10%' }}
                            constraints={{
                                facingMode: 'environment'
                            }}
                        />

                    </Modal.Body>

                </Modal>
                <Modal id="ModalisOpen" class="fade" style={{ backgroundColor: 'rgba(0,0,0,0.6)', display: "50px" }} centered show={this.state.isModalOpen} onHide={() => this.setState({ isModalOpen: false })}>

                    <Modal.Body>
                        <div className="Container" style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                            <h2 style={{ fontWeight: "500", fontSize: "20px", color: "black" }} >Card View</h2>

                            <div>
                                <button onClick={(e) => this.vistorexit(e)} style={{ fontSize: "20px", color: "red", border: "none", background: "transparent" }} type="Exit" ><i class="fa fa-sign-out " aria-hidden="true"></i></button>
                                <button type="button" onClick={(e) => this.closemodal(e)} style={{ marginLeft: "3px", top: "15px", border: "none" }} class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times " aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <Example value={this.state.visitorinfo}
                        />
                    </Modal.Body>

                </Modal>

                {/* <Cardv2
                    header={this.state.livevisitor.header}
                    value={this.state.livevisitor.count}
                    color={"#00b4d8"}
                />
                <Cardv2
                    header={this.state.test2visitor.header}
                    value={this.state.test2visitor.count}
                    color={"#ff4d6d"}

                />
                <Cardv2
                    header={this.state.testvisitor.header}
                    value={this.state.testvisitor.count}
                    color={"#adb5bd"}

                /> */}




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
                                                            color: 'var(--bgcolor',
                                                            position: "sticky",
                                                            top: "0px",
                                                        }}
                                                    >


                                                        {
                                                            this.state.header.map((s, index) => {
                                                                // console.log(s)
                                                                {
                                                                    if (s != "outtime") {
                                                                        if (s != "visitorid") {
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
                                                                            if (s == "intime") {
                                                                                return (
                                                                                    <th>In Time</th>
                                                                                )
                                                                            }
                                                                            if (s == "companyname") {
                                                                                return (
                                                                                    <th>Company Name</th>
                                                                                )
                                                                            }

                                                                            if (s != "visitstatus") {
                                                                                return (
                                                                                    <th>{s}</th>

                                                                                )

                                                                            }


                                                                        }
                                                                    }


                                                                    }
                                                                }




                                                            })
                                                        }

                                                    </tr>
                                                </thead>


                                                <tbody style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
                                                    {this.state.tableData.map((s, index) => {
                                                        // console.log(s)
                                                        var keys = Object.keys(this.state.tableData[0]);
                                                        // console.log(s);
                                                        return (
                                                            <tr onClick={(e) => this.vistortableclick(s)} key={index} style={{ cursor: "pointer" }}>
                                                                {
                                                                    keys.map((data, key) => {
                                                                        if (data != "visitorid" && data != "visitstatus" && data != "outtime"  && data != "recid") {
                                                                            if (s[data] == null) {
                                                                                s[data] = ''
                                                                            }
                                                                            if (typeof s[data] != "object") {
                                                                                if (data == "approvalstatus") {
                                                                                    if (s[data] == 1) {
                                                                                        s[data] = 'Approved';
                                                                                        return <td style={{color:'green'}}key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
            
                                                                                    } else if (s[data] == -1) {
                                                                                        s[data] = 'Rejcted';
                                                                                        return <td style={{color:'#ca0903'}} key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
            
                                                                                    } else  if (s[data] == 0) {
                                                                                        s[data] = 'Pending';
                                                                                        return <td style={{color:'#e1563f'}} key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
            
                                                                                    }
                                                                                }else{
                                                                                    return <td key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
    
                                                                                }
                                                                                
                                                                               
                                                                            }else{
                                                                                console.log(s)
                                                                                    return <td key={key} dangerouslySetInnerHTML={{ __html: this.setDate(s[data].date) }}></td>
                                                                            }
                                                                            // } else {
                                                                            //     // console.log(s)
                                                                            //     return <td key={key} dangerouslySetInnerHTML={{ __html: this.setDate(s[data].date) }}></td>
                                                                            // }
                                                                        }
                                                                    })
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
                                            <h3 style={{ fontFamily: "sans-serif", color: 'var(--Record)' }}>No Records!</h3>
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

                {/* <div className="container" style={{ marginTop: "20px", display: "fixed", style: "overflow-x: auto" }}>
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

                                            {
                                                this.state.header.map((s, index) => {
                                                    console.log(s)
                                                    return (
                                                        <th>{s}</th>

                                                    )

                                                })
                                            }
                                        </tr>
                                    </thead>


                                    <tbody style={{ whiteSpace: "nowrap", cursor: "pointer" }}>
                                        {this.state.header.map((s, index) => {
                                            console.log(s)
                                            var keys = this.state.tableData;
                                            console.log(s);
                                            return (
                                                <tr key={index} style={{ cursor: "pointer" }}>
                                                    {
                                                        keys.map((data, key) => {
                                                            if (s[data] == null) {
                                                                s[data] = ''
                                                            }
                                                            if (typeof s[data] != "object") {
                                                                return <td key={key} dangerouslySetInnerHTML={{ __html: s[data] }}></td>
                                                            }
                                                        })
                                                    }
                                                </tr>
                                            );
                                            // return (
                                            // <>
                                            // <tr onClick={(e) => this.leadstablerowclick(e)} className="hovereffect" >
                                            // <td><img src={box} style={{ height: "35px", width: "30px", padding: "2px", hover: "after" }}/>
                                            // <td>{s.cid}</td>
                                            // <td>{s["contact name"]}</td>
                                            // <td>{s["company name"]}</td>
                                            // <td>{s["contact number"]}</td>
                                            // <td>{s.designation}</td>
                                            // <td>{s["company size"]}</td>
                                            // <td>{s.emailid}</td>
                                            // <td>{s["lead source"]}</td>
                                            // <td>{s["next follow up"]}</td>
                                            // <td>{s.stage}</td>
                                            // <td>{s["last updated on"]}</td>
                                            // <td>{s["last remarks"]}</td>
                                            // <td>{s["next step"]}</td>
                                            // <td>{s["enquired on"]}</td>
                                            // </tr>
                                            // </>
                                            // )
                                        })}
                                    </tbody> 

                                </Table>

                            </div>
                        </div>
                    </div>
                </div>
                                    */}

            </>
        );



    }

}

export default homepg;