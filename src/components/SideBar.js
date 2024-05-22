import React, { Component } from 'react'
import './SideBar.css'
import menuBtn from './images/menu.png'
import "./HeaderBar.css"
import Leave from './images/leave_icon.png'
import DocumentStack from './images/document_icon.png'
// import AttendanceManipulation from './images/attendance_icon.png'
// import Employee from './images/employee_icon.png'
// import Shift from './images/shift_icon.png'
// import License from './images/license_icon.png'
// import Challan from './images/challan_icon.png'
// import Org from './images/organisation_icon.png'
// import Salary from './images/salarysheet_icon.png'
import Reports from './images/report_icon.png'
import Home from './images/home_icon.png'
import Payslip from './images/payslip_icon.png'
import Logout from './images/logout_icon.png'
// import Holiday from './images/holiday_icon.png'
// import Notifyfb from './Notifyfb'
import GetImage from './GetImage'
import './contentBox.css'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'
import { StringFormatter } from './StringFormatter'
import Organization from './Orgdropdown'
// import Branchdropdown from './Branchdropdown'
// import Addbutton from './Addbutton'
import buildNumber from '../buildNumber.json';
import Axios from 'axios'
import bellIcon from './images/bell.png'
import Notification from './Notification'
import Tint from './ImageTint/Tint'

// sessionStorage.setItem('url', 'http://slci.trackhr.tech/')
// sessionStorage.setItem('empid', '1')
// sessionStorage.setItem('userid', '4')
// sessionStorage.setItem('login', 'true')
// sessionStorage.setItem('Apipathurl', 'http://trackhr.trackhr.tech/Sandboxslci/')
// sessionStorage.setItem("clientid", '2');
// sessionStorage.setItem('usertype', '3')
// sessionStorage.setItem('clientname', 'SLCI')

 sessionStorage.setItem('colors', '{"Primary":"#008a3e","bgcolor":"#fff"}')
 sessionStorage.setItem('apiname', 'GetPhotoV2.php')


export default class SideBar extends Component {
    constructor() {
        super();
        this.state = {
            // userid: "18",
            usercode: '14D9EC',
            usercode: localStorage.getItem('usercode'),
            getPhotoUrl: `${sessionStorage.getItem('Apipathurl')}${sessionStorage.getItem('apiname')}`,
            // fetchRsUrl: 'https://trackhr.trackhr.tech/Sandbox/fetchrsdataV2.php',
            empid: sessionStorage.getItem('empid'),
            userid: sessionStorage.getItem('userid'),
            clientid: sessionStorage.getItem('clientid'),
            clientname: sessionStorage.getItem('clientname'),
            usertype: sessionStorage.getItem('usertype'),
            // clientid:"1",
            // getPhotoUrl:`${sessionStorage.getItem('Apipathurl')}GetPhoto.php`,
            fetchRsUrl: `${sessionStorage.getItem('Apipathurl')}fetchrsdata.php`,
            Clientdetails: navigator.userAgent,
            showWidth: '280px',
            setDisplay: "block",
            contentBoxClass: "col-md-9",
            categoryDataArr: [],
            activeCategoryDataArr: [],
            navIcon: '',
            data: [],
            notifications: [],
            activeLink: '',
            hidenotify: false,
            isdisable: true,
            branches: [],
            branchid: "",
            branchName: "",
            firstname: "",
            lastname: "", isBellClicked: false,
            notificationCount: 0,
            colors: JSON.parse(sessionStorage.getItem('colors'))
            //  selectedBranchid:'',
            //  selectedClientid:""

        }
        this.hideSidebar = this.hideSidebar.bind(this)
        this.showSidebar = this.showSidebar.bind(this)
        this.addActiveClass = this.addActiveClass.bind(this)
        this.setContentBox = this.setContentBox.bind(this)
        this.confirmBox = this.confirmBox.bind(this)
        this.getIframe = this.getIframe.bind(this)
        this.getNotificationCount = this.getNotificationCount.bind(this)
        this.closeNotificationDiv = this.closeNotificationDiv.bind(this)
    }

    componentDidMount() {
        // console.log=()=>{};
        this.getNotificationCount()
        // api hitting for name

        var formData = new FormData();
        var Query = `[dbo].[SLCI_Web_Proc_User_Details]@UserID=${sessionStorage.getItem('userid')}`;
        var queryArr = []
        var formattedString = StringFormatter(Query, queryArr)
        console.log(Query);
        formData.append("Query", formattedString);
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: this.state.fetchRsUrl,
            data: formData
        }).then(res => {
            console.log(res.data)
            console.log(res.data[''][0].FirstName)
            this.setState({ firstname: res.data[''][0].FirstName, lastname: res.data[''][0].LastName })
        });

        // api hitting end for name
    }

    componentDidUpdate() {
        // if (sessionStorage.getItem('usertype') == 3) {
        //     sessionStorage.setItem('clientid', '1')
        // }



        const message = JSON.stringify({
            branchid: this.state.selectedBranchid,
            clientid: this.state.selectedClientid
        })
        if (document.getElementById("Organization")) {
            var dropdownframe = document.getElementById("Organization")
            dropdownframe.contentWindow.postMessage(message, '*');
        }
    }
    hideSidebar() {
        this.setState({
            showWidth: "0px",
            setDisplay: "none",
            contentBoxClass: "col-md-12",
        })
    }
    showSidebar() {
        this.setState({
            showWidth: "280px",
            setDisplay: "block",
            contentBoxClass: "col-md-9",
        })
    }



    addActiveClass(name, icon, hash) {
        this.setState({ activeLink: name, navIcon: icon })
        sessionStorage.setItem('hash', `#${name}`)
        window.location.hash = hash
        if (name == "Organization Manager") {
            sessionStorage.setItem("Organizationtype", "1")
        } else {
            console.log("organization type not set")
        }
    }

    setContentBox(name, targetPage) {
        if (targetPage != undefined) {
            // console.log(name,targetPage)
            var hash = window.location.hash
            if (document.getElementById('contentBox')) {
                var contentBox = document.getElementById('contentBox')
                if (name == "Logout" && hash == "#Logout") {
                    this.confirmBox()
                } else {
                    contentBox.innerHTML = `<iframe class="responsive_iframe" id='${name}' src='${sessionStorage.getItem('loginurl')}${targetPage}' width="100%" height="580px" ></iframe>`
                    // contentBox.innerHTML = `<iframe class="responsive_iframe" id='${name}' src='${sessionStorage.getItem('url')}${targetPage}' width="100%" height="580px" ></iframe>`
                }
            }
        }
    }
    confirmBox() {
        confirmAlert({
            message: 'Are you sure you want to Logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        sessionStorage.removeItem('hash')
                        window.location.href = `${sessionStorage.getItem('loginurl')}login.php#SessionOver?autologin=0`
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        window.location.hash = "#Home"
                        this.addActiveClass("Home", Home, window.location.hash)
                        this.setContentBox("Home")
                    }
                }
            ]
        })
    }

    Organize = (clientid, clientname) => {
        // console.log(clientid, "its click on organization")
        // console.log(clientname,"its click name")
        // this.setState({clientid:clientid})
        // console.log(this.state.clientid)
        // console.log(this.state.clientname)
        // window.location.reload()
    }
    getbranchid(branchid) {
        this.setState({ selectedBranchid: branchid })
    }
    getIframe(el) {
        console.log(el, "hello")
        sessionStorage.setItem('Organizationtype', '0')
        this.setContentBox("OrganizationMaster", "OrganizationMaster")
        // contentBox.innerHTML=`<iframe class="responsive_iframe" id='${name}' src='${sessionStorage.getItem('url')}${targetPage}' width="100%" height="580px" ></iframe>
    }

    getNotificationCount() {
        var formData = new FormData();
        var Query = `SLCI_Web_Proc_User_Notification_GetCount @UserID='{0}',@ClientID='{1}'`;
        var queryArr = [`${this.state.userid}`, `${this.state.clientid}`]
        var formattedString = StringFormatter(Query, queryArr)
        console.log(Query);
        formData.append("Query", formattedString);
        Axios({
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: this.state.fetchRsUrl,
            data: formData
        }).then(res => {
            console.log(res.data)
            if (res.data[''].length > 0 && res.data[''] != null) {
                this.setState({ notificationCount: res.data[''][0].Notifications })
            }
        });
    }

    closeNotificationDiv(value) {
        this.setState({ isBellClicked: value })
    }
    render() {
        // window.onload=()=>{
        //     sessionStorage.setItem("clientid","-1")
        // }
        console.log(`Dashboard-${buildNumber.buildNumber}`)


        // setInterval(() => {
        //     if ((sessionStorage.getItem('clientid') == undefined || sessionStorage.getItem('clientid') == null || sessionStorage.getItem('clientid') == "") || (sessionStorage.getItem('userid') == undefined || sessionStorage.getItem('userid') == null || sessionStorage.getItem('userid') == "") || (sessionStorage.getItem('url') == undefined || sessionStorage.getItem('url') == null || sessionStorage.getItem('url') == "") || (sessionStorage.getItem('login') == undefined || sessionStorage.getItem('login') == null || sessionStorage.getItem('login') == "") || (sessionStorage.getItem('Apipathurl') == undefined || sessionStorage.getItem('Apipathurl') == null || sessionStorage.getItem('Apipathurl') == "") || (sessionStorage.getItem('usertype') == undefined || sessionStorage.getItem('usertype') == null || sessionStorage.getItem('usertype') == "") || (sessionStorage.getItem('hash') == undefined || sessionStorage.getItem('hash') == null || sessionStorage.getItem('hash') == "")) {
        //         window.location.href = `${sessionStorage.getItem('url')}login.php`
        //     } else {
        //         // console.log('interval calling')
        //     }
        // }, 5000);



        // || (sessionStorage.getItem('Leavetype') == undefined || sessionStorage.getItem('Leavetype') == null || sessionStorage.getItem('Leavetype') == "") || (sessionStorage.getItem('checkintype') == undefined || sessionStorage.getItem('checkintype') == null || sessionStorage.getItem('checkintype') == "")


        var usertype = sessionStorage.getItem('usertype')
        var sideBarDetails = []
     {
            sideBarDetails = [
                { name: 'Home', icon: Home, targetPage: 'HomePage', redirect: 0, group: 'top'},
                // { name: 'Employee Master', icon: Leave, targetPage: 'Leave', redirect: 0, group:'My details' },
                // { name: 'Live Visit', icon: Reports, targetPage: 'Report', redirect: 0, group:'My details' },
                { name: 'Entry Form', icon: DocumentStack ,targetPage: 'DocumentStack', redirect: 0, group:'My details' },
                // { name: 'Exit Form', icon: Payslip, targetPage: 'PayslipHistory', redirect: 0, group:'My details' },
                { name: 'Logout', icon: Logout, targetPage: 'none' },
            ]
        // } else if (this.state.usertype == 2) {
        //     sideBarDetails = [
        //         { name: 'Home', icon: Home, targetPage: 'HomePage', redirect: 0, group: 'top' },
        //         { name: 'Leaves', icon: Leave, targetPage: 'Leave', redirect: 0, group: 'My Details' },
        //         { name: 'Reports', icon: Reports, targetPage: 'Report', redirect: 0, group: 'My Details' },
        //         { name: 'Documents', icon: DocumentStack, targetPage: 'DocumentStack', redirect: 0, group: 'My Details' },
        //         { name: 'Attendance Manager', icon: AttendanceManipulation, targetPage: 'AttendanceManipulation', redirect: 0, group: 'Console' },
        //         { name: 'Shift Manager', icon: Shift, targetPage: 'ShiftMaster', redirect: 0, group: 'Console' },
        //         { name: 'Employee Manager', icon: Employee, targetPage: 'EmployeeMaster', redirect: 0, group: 'Console' },
        //         { name: 'Leave Manager', icon: Leave, targetPage: 'LeaveApproval', redirect: 0, group: 'Console' },
        //         { name: 'Assigned Leave Manager', icon: Leave, targetPage: 'LeaveMaster', redirect: 0, group: 'Console' },
        //         { name: 'Holiday Manager', icon: Holiday, targetPage: "Holiday", redirect: 0, group: 'Console' },
        //         { name: 'Document Manager', icon: DocumentStack, targetPage: 'DocumentStackMaster', redirect: 0, group: 'Console' },
        //         { name: 'Payroll Manager', icon: Payslip, targetPage: 'PayrollApproval', redirect: 0, group: 'Console' },
        //         { name: 'Challan Manager', icon: Challan, targetPage: 'ChallanApproval', redirect: 0, group: 'Console' },
        //         { name: 'Licenses', icon: License, targetPage: 'LicenseHistory', redirect: 0, group: 'Console' },
        //         { name: 'Salary Sheet Manager', icon: Salary, targetPage: 'SalarySheetApproval', redirect: 0, group: 'Console' },

        //         { name: 'Logout', icon: Logout, targetPage: 'none' },
        //     ]
        // } else if (this.state.usertype == 3) {
        //     if (this.state.clientid == 1) {
        //         sideBarDetails = [
        //             { name: 'Home', icon: Home, targetPage: 'HomePage' },
        //             { name: 'Employee Manager', icon: Employee, targetPage: 'EmployeeMaster' },
        //             { name: 'Logout', icon: Logout, targetPage: 'none' },
        //         ]
        //     } else {
        //         sideBarDetails = [
        //             { name: 'Home', icon: Home, targetPage: 'HomePage', redirect: 0, group: 'top' },
        //             { name: 'Attendance Manager', icon: AttendanceManipulation, targetPage: 'AttendanceManipulation', redirect: 0, group: 'Console' },
        //             { name: 'Shift Master', icon: Shift, targetPage: 'ShiftMaster', redirect: 0, group: 'Console' },
        //             { name: 'Employee Manager', icon: Employee, targetPage: 'EmployeeMaster', redirect: 0, group: 'Console' },
        //             { name: 'Leave Manager', icon: Leave, targetPage: 'LeaveApproval', redirect: 0, group: 'Console' },
        //             { name: 'Holiday Manager', icon: Holiday, targetPage: "Holiday", redirect: 0, group: 'Console' },
        //             { name: 'Organization Manager', icon: Org, targetPage: "OrganizationMaster", redirect: 0, group: 'Console' },
        //             { name: 'Document Manager', icon: DocumentStack, targetPage: 'DocumentStackMaster', redirect: 0, group: 'Console' },
        //             { name: 'Payroll Manager', icon: Payslip, targetPage: 'PayrollGeneration', redirect: 0, group: 'Console' },
        //             { name: 'Challan Manager', icon: Challan, targetPage: 'ChallanRecording', redirect: 0, group: 'Console' },
        //             { name: 'Assigned Leave Manager', icon: Leave, targetPage: 'LeaveMaster', redirect: 0, group: 'Console' },
        //             { name: 'License Manager', icon: License, targetPage: 'LicenseApproved', redirect: 0, group: 'Console' },
        //             { name: 'Salary Sheet Manager', icon: Salary, targetPage: 'SalarySheetGeneration', redirect: 0, group: 'Console' },
        //             { name: 'Logout', icon: Logout, targetPage: 'none' },
        //         ]
        //     }

        }


        window.onload = () => {
            if (sessionStorage.getItem('login') === "true") {
                var hash = sessionStorage.getItem('hash')
                window.location.hash = hash
                if (hash != '' && hash != null) {
                    var name = hash.split('#')[1]
                    let obj = sideBarDetails.find(o => o.name == name);
                    this.addActiveClass(`${name}`, obj.icon, hash)
                    this.setContentBox(`${name}`, obj.targetPage)
                } else {
                    window.location.hash = "#Home"
                    sessionStorage.setItem("hash", "#Home")
                }
            } else {
                window.location.href = `${sessionStorage.getItem('url')}login.php#SessionOver`
            }
        }
        window.onhashchange = () => {
            var hash = window.location.hash
            var name = hash.split('#')[1]
            let obj = sideBarDetails.find(o => o.name == name);
            if (name == "Logout") {
                this.confirmBox()
            } else {
                this.addActiveClass(`${name}`, obj.icon, hash)
                this.setContentBox(`${name}`, obj.targetPage)
            }
        }
        return (
            <>
                <div className="container-fluid" style={{ padding: "0px", overflow: "hidden" }}>
                    <div className="Dashboard_header" style={{ background: this.state.colors.bgcolor }}>
                        <div className="left_bar">
                            <img src={menuBtn} onClick={() => this.state.showWidth == "0px" ? this.showSidebar() : this.hideSidebar()} />
                        </div>
                        <div className="logo" style={{fontSize:"90px"}}>
                            <img src={process.env.PUBLIC_URL + '/hexbis.jpeg'} alt="hexbis" />
                            <span > Visitor Register  </span>
                        </div>
                        <div className="ActiveIconBox">
                            <img src={this.state.navIcon} style={{filter:Tint(this.state.colors.Primary)}}/>
                            <span>{this.state.activeLink}</span>
                        </div>
                        <div className="OtherBox">
                            <div className="img" style={{ position: "relative", cursor: "pointer" }} onClick={() => this.setState({ isBellClicked: !this.state.isBellClicked, notificationCount: 0 })}>
                                {
                                    this.state.notificationCount != 0 ?
                                        <span className='notificationCount'>{this.state.notificationCount}</span>
                                        : null
                                }
                                <img src={bellIcon} alt="" />
                            </div>
                            {
                                this.state.isBellClicked ?
                                    <Notification
                                        closeNotifyBox={(value) => this.closeNotificationDiv(value)}
                                        getPhotoUrl={this.state.getPhotoUrl}
                                        fetchRsUrl={this.state.fetchRsUrl}
                                        userid={this.state.userid}
                                        clientid={this.state.clientid}
                                    />
                                    : null
                            }
                        </div>
                    </div>
                    <div className="mainBox_Dashboard">
                        <div className="Dashboard_sidebar" style={{width:this.state.showWidth,transition: "0.5s all"}}>
                            {/* <div className="user_descBox">
                                <div className="userBox">
                                    <div className="user_img">
                                        <GetImage getPhotoUrl={this.state.getPhotoUrl} imgID={this.state.userid} />
                                    </div>
                                    <div className="user_desc">
                                        <span>{`${this.state.firstname} ${this.state.lastname}`}</span>
                                        {this.state.usertype == 3 ?
                                            <Organization usertype={this.state.usertype} callback={this.Organize.bind(this)} />
                                            : 
                                            <Organization usertype={this.state.usertype}  callback={this.Organize.bind(this)} />
                                        }
                                    </div>
                                </div>
                            </div> */}
                            {/* {this.state.usertype == 3 && this.state.clientid == 1 ?
                                <div className="addOrganizationBox">
                                    <div className="add">
                                        <div className="description">
                                            <span>Organization</span>
                                        </div>
                                        <div className="iconBox" onClick={(e) => this.getIframe(e)}>
                                            <i className='fa fa-plus'></i>
                                        </div>
                                    </div>
                                </div>
                                : ""
                            } */}

                            <div className="sidebar_list">
                                {sideBarDetails.map((s, index) => {
                                    var hash = `#${s.name}`
                                    return (
                                        <>
                                            {
                                                index != 0 && s.group !== sideBarDetails[index - 1].group ?
                                                    <>
                                                        {/* <hr style={{ marginBottom: "5px", background: "rgba(0,0,0,1)" }} /> */}
                                                        <h5 style={{ fontWeight: '500', fontSize: '13px', paddingLeft: "30px", color: "rgba(0,0,0,0.7)",paddingTop:"10px",borderTop:"1px solid rgba(0,0,0,0.1)",width:"100%" }}>{s.group}</h5>
                                                    </>
                                                    : null
                                            }
                                            <div className={"tilebox"+(s.name == this.state.activeLink ? " active" : "")} onClick={() => {
                                                this.addActiveClass(s.name, s.icon, hash)
                                                this.setContentBox(s.name, s.targetPage)
                                            }}>
                                                <div className="icon">
                                                    <img src={s.icon} style={{filter:s.name == this.state.activeLink ? Tint(this.state.colors.Primary) : ""}} />
                                                </div>
                                                <div className="desc">
                                                    <span>{s.name}</span>
                                                </div>
                                            </div>
                                        </>

                                    )
                                })}
                            </div>
                        </div>
                        <div className="Dashboard_content"  id="contentBox" style={{width:`calc(100% - ${this.state.showWidth})`,transition: "0.5s all"}}>

                        </div>
                    </div>
                    {/* <nav className="navbar fixed-top navbar-light bg-light" style={{ height: "9vh" }}>
                        <div className="container-fluid">
                            <a className="navbar-brand">

                                <img src={process.env.PUBLIC_URL + '/slcilogo.png'} style={{ height: "auto", width: "26px", borderRadius: "50%" }} alt="slcilogo" />
                                <span style={{ color: this.state.colors.Primary, fontSize: "23px", fontWeight: "500" }}>SLCI</span>
                                <div className="curPagePointer">
                                    <img src={this.state.navIcon} />
                                    <span>{this.state.activeLink}</span>
                                </div>

                            </a>
                            <div className="notificationDiv" style={{ justifyContent: this.state.usertype != 3 ? "flex-end" : 'space-between' }}>
                                {usertype == 3 ?
                                    <>
                                        <Addbutton showdata={this.getIframe.bind(this)} />
                                    </>
                                    : ""
                                }
                                <div className="img" style={{ position: "relative", cursor: "pointer" }} onClick={() => this.setState({ isBellClicked: !this.state.isBellClicked, notificationCount: 0 })}>
                                    {
                                        this.state.notificationCount != 0 ?
                                            <span className='notificationCount'>{this.state.notificationCount}</span>
                                            : null
                                    }
                                    <img src={bellIcon} alt="" />
                                </div>
                            </div>
                            {
                                this.state.isBellClicked ?
                                    <Notification
                                        closeNotifyBox={(value) => this.closeNotificationDiv(value)}
                                        getPhotoUrl={this.state.getPhotoUrl}
                                        fetchRsUrl={this.state.fetchRsUrl}
                                        userid={this.state.userid}
                                        clientid={this.state.clientid}
                                    />
                                    : null
                            }
                        </div>
                    </nav> */}
                    {/* <div style={{ display: "flex" }}> */}

                        {/* <div className="col-md-3 col-9" style={{ paddingRight: "0px", marginTop: "-20px" }}>
                            <div className="sidebar" id="mySidebar" style={{ width: this.state.showWidth, display: this.state.setDisplay }}>
                                <div className="row imageContainer">
                                    <div className="col-md-12 col-12 text-center">
                                        <div className="col-md-3 col-3"></div>
                                        <div className="col-md-6 col-6 imageDiv">
                                            <GetImage getPhotoUrl={this.state.getPhotoUrl} imgID={this.state.userid} />
                                            <h5 style={{ marginTop: "5px", fontWeight: "bold", color: "black" }}>{`${this.state.firstname} ${this.state.lastname}`}</h5>
                                            {usertype == 3 ?
                                                <>
                                                    <Organization callback={this.Organize.bind(this)} />
                                                </>
                                                : ""
                                            }
                                        </div>
                                        <div className="col-md-3 col-3"></div>
                                    </div>
                                </div>
                                <div className="row" id="sidebarList">
                                    {sideBarDetails.map((s, index) => {
                                        var hash = `#${s.name}`
                                        return (
                                            <>
                                                {
                                                    index != 0 && s.group !== sideBarDetails[index - 1].group ?
                                                        <>
                                                            <hr style={{ marginBottom: "5px", background: "rgba(0,0,0,0.3)" }} />
                                                            <h5 style={{ textTransform: "uppercase", fontWeight: '500', fontSize: '15px', paddingLeft: "35px", color: 'black' }}>{s.group}</h5>
                                                        </>
                                                        : null
                                                }
                                                <div className="col-md-12" key={index}>
                                                    <div className={'row btnList' + (s.name == this.state.activeLink ? " active" : "")} style={{}} onClick={() => {
                                                        this.addActiveClass(s.name, s.icon, hash)
                                                        this.setContentBox(s.name, s.targetPage)
                                                    }}>
                                                        <div className="col-md-12">
                                                            <img src={s.icon} />
                                                            <span>{s.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div> */}

                        <div className={this.state.contentBoxClass} style={{ paddingRight: "0px", paddingLeft: "0px", backgroundColor: "#e5eaf3", marginTop: "-18px" }}>
                            <div className='container-fluid' id="contentBox" style={{ padding: "0px", paddingTop: "10px", marginTop: "10vh" }}>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
               
            </>
        )
    }
}