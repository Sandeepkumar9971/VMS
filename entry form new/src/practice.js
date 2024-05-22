// import React, { Component } from 'react';
// import { Input, Password } from './usefulcomps/HexInput/InputBox';
// import Icon from './usefulcomps/HexInput/icon';
// import Select from './select';
// // import userprofile from "./userprofile.png";
// import './App.css'
// import buildnumber from './buildNumber.json'
// import Hexapi from './usefulcomps/HexAPI/Hexapi'
// import Hexapiotp from './usefulcomps/HexAPI/Hexapiotp'
// import { Aesdecryption, Aesencryption } from './usefulcomps/Aes/Aes'
// import Swal from "sweetalert2";
// import { Button, ModalBody, Spinner } from 'react-bootstrap';
// import hexbis from './hexbis.jpeg'
// import Urlencoder from './usefulcomps/Urlencoder';
// import axios from 'axios';
// import Setimage from './Setimage/setimage'
// import { Modal } from 'react-bootstrap';
// import SearchIcon from '@mui/icons-material/Search';
// import { IconButton } from '@mui/material';
// import { TimeFormatterV2 } from "./newTimeformatter/TimeFormatter";
// import TimeFormatter from './TimeFormatter/TimeFormatter';
// import Paper from './inputotp';
// import { MonthSelection } from '@material-ui/pickers/views/Month/MonthView';


// sessionStorage.setItem('Apipathurl', 'https://hexbss.xyz/visitorregistertest/')      /******Testing build******/
// // sessionStorage.setItem('Apipathurl', 'https://vrms.hexbss.xyz/')                        /*******Main build********/
// sessionStorage.setItem('url', 'https://hexbss.xyz/visitorregistertest/')
// sessionStorage.setItem('orgdbname', 'VRApp_OrgDB_tester')


// class Entryfrom extends Component {
//     constructor() {
//         super();
//         const decodeUrl = (data) => {
//             if (Aesdecryption(data.split('?')[1]) !== "") {
//                 let enctext = data.split('?')[1]
//                 let dectext = `?${btoa(Aesdecryption(enctext))}`
//                 return Urlencoder(data.split('?')[0] + '/' + dectext)
//             } else {
//                 return Urlencoder(data)
//             }
//         }


//         this.state = {
//             data: decodeUrl(window.location.href),
//             organisationname: "",
//             date: new Date(),
//             alertdata: "",
//             visitortypeid: "",
//             visitortype: [],
//             visitortypename: "",
//             personid: "",
//             recid: "",
//             person: [],
//             personname: "",
//             otpverification: [],
//             otp: "",
//             purposename: "",
//             purpose: [],
//             purposeid: "",
//             firstname: "",
//             lastname: "",
//             contactnumber: "",
//             vistorcount: "1",
//             employeename: "",
//             reason: "",
//             isApiComplete: false,
//             isDataAvailable: false,
//             isModalOpen: false,
//             companyname: "",
//             display: false,
//             Isthankscomponent: false,
//             saveimage: [],
//             isbuttonshow: true,
//             requiredate1: "",
//             fetchrsurl: `${sessionStorage.getItem('Apipathurl')}`,
//             // value: `${sessionStorage.getItem("url")}Approvalform?${Aesencryption(`orgdbname=${sessionStorage.getItem('orgdbname') }&visitorid=${this.state.recid}`)}`
//         };
//         this.storedate = this.storedate.bind(this);
//         this.storeorganisationname = this.storeorganisationname.bind(this);
//         this.storefirstname = this.storefirstname.bind(this);
//         this.storelastname = this.storelastname.bind(this);
//         this.storecontactnumber = this.storecontactnumber.bind(this);
//         this.storevist = this.storevist.bind(this);
//         this.storeemployeename = this.storeemployeename.bind(this);
//         this.storereason = this.storereason.bind(this);
//         this.storecompanyname = this.storecompanyname.bind(this);
//         this.storevisitortype = this.storevisitortype.bind(this);
//         this.storeotpverification = this.storeotpverification.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handlevisitorid = this.handlevisitorid.bind(this);
//         this.handleemp = this.handleemp.bind(this);
//         this.handlesearch = this.handlesearch.bind(this);
//         this.handleModal = this.handleModal.bind(this);


//     }

//     componentDidMount() {

//         this.setState({ isApiComplete: false, isDataAvailable: false })

//         let obj = {
//             'query': `[dbo].[VRApp_Web_Proc_EntryForm_FormGetDataV2]`,
//             'orgdbname': `${this.state.data.orgdbname}`,
//             'queryArr': []
//         }
//         Hexapi(obj).then(resp => {
//             console.log(resp)
//             console.log(resp['otpverification'][0]['otpverification'])
//             // console.log(resp.person)
//             // console.log(resp.visitortype)

//             this.setState({ otp: resp['otpverification'][0]['otpverification'] })
//             console.log(this.state.otp)

//             // if (resp.visitortype != undefined && resp.purpose != undefined && resp[''][0]['orgname'] != undefined) {

//             if (resp.visitortype != undefined && resp.purpose != undefined && resp[''][0]['orgname'] != undefined && resp.person != undefined) {
//                 this.setState({ visitortype: resp.visitortype, person: resp.person, purpose: resp.purpose, organisationname: resp[''][0]['orgname'], isDataAvailable: true })
//                 // this.setState({  visitortype: resp.visitortype, purpose: resp.purpose, organisationname: resp[''][0]['orgname'], isDataAvailable: true })


//             }

//             else {

//                 this.setState({ isDataAvailable: false })
//             }


//         }).then(resp => {
//             this.setState({ isApiComplete: true })
//         })

//         this.storedate()
//     }

//     handlesearch(e) {
//         console.log(this.state.contactnumber)
//         if (e.target.value.length == 10) {
//             let obj = {
//                 'query': `[dbo].[VRApp_Web_Proc_EntryForm_FetchData] @ContactNumber='{0}'`,
//                 'orgdbname': `${this.state.data.orgdbname}`,
//                 'queryArr': [
//                     `${this.state.contactnumber}`,
//                 ]
//             }
//             Hexapi(obj).then(resp => {
//                 // console.log(resp)
//                 if (
//                     this.state.contactnumber.length == 10 || !this.state.contactnumber.length > 0
//                 ) {
//                     // Swal.fire({

//                     //     // title: 'Oops...',  
//                     //     text: 'Enter Contact Number ',
//                     // })
//                 }

//                 this.setState({ firstname: resp[""][0]['firstname'] })
//                 this.setState({ lastname: resp[""][0]['lastname'] })
//                 this.setState({ companyname: resp[""][0]['companyname'] })


//             }).catch(err => { console.error(err) })
//         }

//     }

//     handleSubmit(otp) {
//         let obj = {
//             'query': `[dbo].[VRApp_Web_Proc_EntryForm_SubmitV3]
//             @FirstName='{0}',
//             @LastName='{1}',
//             @ContactNumber='{2}',
//             @VisitorCount='{3}',
//             @PersonToMeet ='{4}',
//             @VisitorTypeID='{5}',
//             @PurposeID='{6}',
//             @CompanyName ='{7}',
//             @Photo=$%$File$%$,
//             @OTP='{9}'`,

//             'orgdbname': `${this.state.data.orgdbname}`,
//             'queryArr': [
//                 `${this.state.firstname}`,
//                 `${this.state.lastname}`,
//                 `${this.state.contactnumber}`,
//                 `${this.state.vistorcount}`,
//                 `${this.state.personid}`,
//                 `${this.state.visitortypeid}`,
//                 `${this.state.purposeid}`,
//                 `${this.state.companyname}`,
//                 `${this.state.saveimage}`,
//                 `${otp}`,

//             ],
//             'file': this.state.saveimage,
//         }
//         Hexapi(obj).then(resp => {
//             console.log(resp)
//             // console.log(resp[""][0]["command"])
//             if (resp[''][0]['command'] == 1) {

//                 //MOEAL FALSE
//                 Swal.fire({
//                     text: `${resp[""][0]["msg"]} `,
//                     confirmButtonColor: 'red'

//                 }).then(function () {
//                     window.location.reload();
//                 }
//                 )
//             }
//             else {
//                 Swal.fire({

//                     // title: 'Oops...',  
//                     text: `${resp[""][0]["msg"]}`,
//                     confirmButtonColor: 'red'
//                 }).then(function () {
//                     window.location.reload();
//                 }
//                 )
//             }

//         }).catch(err => { console.error(err) })

//     }


//     closemodal() {
//         this.setState({ isModalOpen: false })
//     }
//     handleotp(otp) {
//         document.getElementById("removebtn").style.display = "none"

//         if (this.state.otp = 1) {
//             this.setState({ isbuttonshow: true })
//         }
//         else {
//             this.setState({ isbuttonshow: false })
//         }
//         console.log("otp resend")

//         let obj = {
//             'phoneno': `${this.state.contactnumber}`,
//             'orgdbname': `${this.state.data.orgdbname}`,
//         }

//         Hexapiotp(obj).then(resp => {
//             console.log(resp)
//             if (resp == 1) {
//                 this.setState({
//                     isModalOpen: true
//                 })
//             }
//             else {
//                 Swal.fire({
//                     // title: 'Oops...',  
//                     text: 'Invalid otp ! ',
//                 })
//             }
//         })
//     }

//     handleModal(e) {

//         if (this.state.saveimage != "") {
//             if (
//                 this.state.contactnumber.length == 10 ||
//                 !this.state.contactnumber.length > 0
//             )
//                 if (this.state.contactnumber != "") {
//                     if (this.state.companyname != "") {
//                         if (this.state.vistorcount != "") {
//                             if (this.state.firstname != "") {
//                                 if (this.state.lastname != "") {
//                                     if (this.state.visitortypeid != "") {
//                                         if (this.state.personid != "") {
//                                             if (this.state.purposeid != "") {
//                                                 if (this.state.otp != 1) {
//                                                     let obj = {
//                                                         'query': `[dbo].[VRApp_Web_Proc_EntryForm_SubmitV3]
//                                                                                                          @FirstName='{0}',
//                                                                                                          @LastName='{1}',
//                                                                                                          @ContactNumber='{2}',
//                                                                                                          @VisitorCount='{3}',
//                                                                                                          @PersonToMeet ='{4}',
//                                                                                                          @VisitorTypeID='{5}',
//                                                                                                          @PurposeID='{6}',
//                                                                                                          @CompanyName ='{7}',
//                                                                                                          @Photo=$%$File$%$,
//                                                                                                          @OTP='{9}'`,

//                                                         'orgdbname': `${this.state.data.orgdbname}`,
//                                                         'queryArr': [
//                                                             `${this.state.firstname}`,
//                                                             `${this.state.lastname}`,
//                                                             `${this.state.contactnumber}`,
//                                                             `${this.state.vistorcount}`,
//                                                             `${this.state.personid}`,
//                                                             `${this.state.visitortypeid}`,
//                                                             `${this.state.purposeid}`,
//                                                             `${this.state.companyname}`,
//                                                             `${this.state.saveimage}`,
//                                                             `${this.state.otp}`,



//                                                         ],
//                                                         'file': this.state.saveimage,


//                                                     }
//                                                     Hexapi(obj).then(resp => {
//                                                         console.log(resp)
//                                                         // console.log(resp[""][0]["command"])
//                                                         if (resp[''][0]['command'] == 1) {
//                                                             this.setState({ recid: resp["visitor"][0]['visitorid'] })
//                                                             // setTimeout(() => {
//                                                             console.log(`${sessionStorage.getItem("url")}Approvalform?${Aesencryption(`orgdbname=${sessionStorage.getItem('orgdbname')}&visitorid=${this.state.recid}`)}`)
//                                                             // }, 2000);
//                                                             //MOEAL FALSE
//                                                             Swal.fire({
//                                                                 text: `${resp[""][0]["msg"]}`,
//                                                                 confirmButtonColor: 'red'

//                                                             }).then(function () {
//                                                                 window.location.reload();
//                                                             }
//                                                             )
//                                                         }
//                                                         else {
//                                                             Swal.fire({

//                                                                 // title: 'Oops...',  
//                                                                 text: `${resp[""][0]["msg"]}`,
//                                                                 confirmButtonColor: 'red'
//                                                             })
//                                                         }

//                                                     }).catch(err => { console.error(err) })


//                                                 } else {
//                                                     this.setState({ isModalOpen: true })


//                                                     let obj = {
//                                                         'phoneno': `${this.state.contactnumber}`,
//                                                         'orgdbname': `${this.state.data.orgdbname}`,
//                                                     }

//                                                     Hexapiotp(obj).then(resp => {
//                                                         console.log(resp)
//                                                         if (resp == 1) {
//                                                             this.setState({ isModalOpen: true })
//                                                         }
//                                                         else {
//                                                             Swal.fire({

//                                                                 // title: 'Oops...',  
//                                                                 text: 'Invalid otp ! ',
//                                                             })

//                                                         }
//                                                     })

//                                                 }
//                                             } else {
//                                                 Swal.fire({

//                                                     // title: 'Oops...',
//                                                     text: 'Purpose not Selected !',
//                                                     confirmButtonColor: 'red'

//                                                 });

//                                             }

//                                         } else {
//                                             Swal.fire({

//                                                 // title: 'Oops...',
//                                                 text: 'Person to Meet not Selected !',
//                                                 confirmButtonColor: 'red'

//                                             });
//                                         }

//                                     } else {
//                                         {
//                                             Swal.fire({
//                                                 // title: 'Oops...',
//                                                 text: 'Visitor type not filled !',
//                                                 confirmButtonColor: 'red'
//                                             });
//                                         }
//                                     }

//                                 } else {
//                                     {
//                                         Swal.fire({
//                                             // title: 'Oops...',
//                                             text: 'last Name not  filled!',
//                                             confirmButtonColor: 'red'
//                                         });
//                                     }
//                                 }
//                             } else {
//                                 {
//                                     Swal.fire({
//                                         // title: 'Oops...',
//                                         text: 'First Name not filled!',
//                                         confirmButtonColor: 'red'
//                                     });
//                                 }
//                             }
//                         } else {
//                             Swal.fire({
//                                 // title: 'Oops...',
//                                 text: 'Visitor count not filled!',
//                                 confirmButtonColor: 'red'
//                             });

//                         }
//                     } else {
//                         {
//                             Swal.fire({
//                                 // title: 'Oops...',
//                                 text: 'Company name not filled !',
//                                 confirmButtonColor: 'red'
//                             });
//                         }
//                     }
//                 } else {
//                     {
//                         Swal.fire({
//                             // title: 'Oops...',
//                             text: 'Contact number not filled !',
//                             confirmButtonColor: 'red'
//                         });
//                     }
//                 }
//         } else {
//             {
//                 Swal.fire({
//                     // title: 'Oops...',
//                     text: 'Image not Selected !',
//                     confirmButtonColor: 'red'
//                 });
//             }
//         }


//         <Spinner animation="border" variant="dark" />
//     }


//     storevisitortype(e) {
//         this.setState({ visitortypename: e.target.value })
//         console.log(this.state.visitortypename)
//     }

//     storeotpverification(e) {
//         this.setState({ otpverify: e.target.value })
//     }

//     storedate() {
//         let requiredate1 = TimeFormatterV2(new Date(), 'fulldate', 'YYYY-MM-DD HH:mm:ss');
//         var transformdate = requiredate1.split(".")[0];
//         // console.log(date);
//         var exitdate = TimeFormatter(transformdate);
//         // console.log(exitdate);
//         var newReverseDate =
//             exitdate.ShiftTime +
//             "," +
//             exitdate.userSplitedDate[2] +
//             " " +
//             exitdate.ShiftMonth +
//             "`" +
//             exitdate.CurYear.toString().slice(-2);
//         console.log(newReverseDate);
//         this.setState({ date: newReverseDate })

//         // return newReverseDate;


//     }
//     storecompanyname(e) {
//         this.setState({ companyname: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })
//     }

//     storeorganisationname(e) {
//         // console.log(e.target.value);
//         this.setState({ organisationname: e.target.value })
//     }
//     storefirstname(e) {
//         // if (e.target.value === "" || re.test(e.target.value)) {
//         //     this.setState({ firstname: e.target.value });
//         // }
//         // console.log(e.target.value);
//         this.setState({ firstname: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })
//     }
//     storelastname(e) {
//         // console.log(e.target.value);
//         this.setState({ lastname: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })
//     }
//     storecontactnumber(e) {
//         const re = /^[0-9\b]+$/;
//         if (e.target.value === "" || re.test(e.target.value)) {
//             this.setState({ contactnumber: e.target.value });
//         }
//         setTimeout(() => {
//             if (e.target.value.length == 10) {
//                 this.handlesearch(e)
//             }

//         }, 2000);

//         // console.log(e.target.value.length);
//     }
//     storevist(e) {
//         // console.log(e.target.value);
//         const re = /^[0-9]/;
//         if (e.target.value === "" || re.test(e.target.value)) {
//             this.setState({ vistorcount: e.target.value })

//         }
//     }
//     storeemployeename(e) {
//         console.log(e.target.value);
//         this.setState({ personname: e.target.value })

//     }
//     storereason(e) {
//         // console.log(e.target.value);
//         this.setState({ reason: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) })

//     }
//     handlepurposeid(e) {
//         console.log(e.target.value);
//         this.setState({ purposeid: e.target.value })
//         console.log(this.state.display)
//         if (e.target.value == '3') {
//             this.setState({ display: true });
//         }
//         else {
//             this.setState({ display: false });
//         }
//     }
//     handlevisitorid(e) {
//         console.log(e.target.value);
//         this.setState({ visitortypeid: e.target.value })
//     }

//     handleemp(e) {
//         console.log(e.target.value);
//         this.setState({ personid: e.target.value })
//     }


//     callbinaryfile(e) {
//         console.log(e)
//         this.setState({ saveimage: e })
//     }
//     render() {
//         return (
//             <>


//                 {
//                     this.state.otpverify = 1 ?
//                         <Modal
//                             id="modalcss"
//                             show={this.state.isModalOpen}
//                             onHide={() => this.closemodal()}
//                             style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
//                             centered
//                         >
//                             <Modal.Header closeButton>
//                                 <Modal.Title></Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                                 <Paper
//                                     id="removebtn"
//                                     getcounter=""
//                                     callback={(otp) => this.handleSubmit(otp)}
//                                     callotp={(otp) => this.handleotp(otp)} />

//                             </Modal.Body>

//                         </Modal>
//                         :
//                         ""
//                 }



//                 <nav class="navbar" >
//                     <a class="navbar-brand" href="#" style={{ fontsize: "15px", fontWeight: "700", paddingleft: "20px", color: "black" }}>
//                         <img src="vrms.png" style={{ marginLeft: "20px", marginRight: "15px", width: "40px", height: "40px" }} alt=""></img>

//                     </a>
//                 </nav>
//                 {/* {
//                         this.state.alertdata != "" ?
//                             <Alert data={this.state.alertdata} />
//                             :
//                             ""
//                     } */}



//                 <div className='container' style={{ padding: "20px", marginTop: "0px" }} >

//                     <center><h1 style={{ color: "#ca0903" }}>Entry Form</h1></center>
//                     <center><h1 style={{ fontSize: "30px", color: "black", fontWeight: "700" }}>{this.state.organisationname}</h1></center>

//                     <div className="row">
//                         <div className='col-md-4'>
//                             <Setimage callback={(e) => this.callbinaryfile(e)} attachmentbutton={false} camerabutton={true} showphoto={true} />
//                         </div>


//                         <div className='col-md-8'>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <Input

//                                         // label={"Date"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", margin: "auto" }}
//                                         // inline={true}
//                                         disabled={true}
//                                         value={this.state.date}
//                                     />
//                                 </div>
//                                 <div className='col-md-6'>
//                                     <Input
//                                         label={"Contact Number"}
//                                         placeholder={"Enter Contact Number"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                         value={this.state.contactnumber}
//                                         required={true}
//                                         wordboundation={{ limit: 10, id: "descriptionInput" }}
//                                         onChange={(e) => this.storecontactnumber(e)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <Input
//                                         label={"Company Name"}
//                                         placeholder={"Enter Company Name"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                         value={this.state.companyname}
//                                         required={true}
//                                         onChange={(e) => this.storecompanyname(e)}

//                                     />
//                                 </div>
//                                 <div className='col-md-6'>
//                                     <Input
//                                         label={"No. of Vistor"}
//                                         placeholder={"Enter Vistor Count"}
//                                         // type={"number"}
//                                         required={true}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                         value={this.state.vistorcount}
//                                         wordboundation={{ limit: 4, id: "count" }}
//                                         onChange={(e) => this.storevist(e)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <Input

//                                         label={"First Name "}
//                                         placeholder={"Enter First Name "}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                         value={this.state.firstname}
//                                         required={true}
//                                         onChange={(e) => this.storefirstname(e)}
//                                     />
//                                 </div>
//                                 <div className='col-md-6'>
//                                     <Input
//                                         label={"Last Name "}
//                                         placeholder={"Enter Last Name"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                         value={this.state.lastname}
//                                         required={true}
//                                         onChange={(e) => this.storelastname(e)}
//                                     />
//                                 </div>

//                             </div>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <Select
//                                         label={"Visitor type"}
//                                         value={this.state.visitortypeid}
//                                         data={this.state.visitortype}
//                                         // inline={true}
//                                         required={true}
//                                         readOnly={true}
//                                         defaultset={"--Select--"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", margin: "auto" }}
//                                         onChange={(e) => this.handlevisitorid(e)}
//                                     // disabled={true}

//                                     />
//                                 </div>
//                                 <div className='col-md-6'>
//                                     <Select
//                                         label={"Person to meet"}
//                                         value={this.state.personid}
//                                         data={this.state.person}
//                                         // inline={true}
//                                         required={true}
//                                         readOnly={true}
//                                         defaultset={"--Select--"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", margin: "auto" }}
//                                         onChange={(e) => this.handleemp(e)}
//                                     // disabled={true}

//                                     />
//                                 </div>

//                             </div>
//                             <div className='row'>
//                                 <div className='col-md-6'>
//                                     <Select
//                                         label={"Purpose"}
//                                         value={this.state.purposeid}
//                                         data={this.state.purpose}
//                                         // inline={true}
//                                         readOnly={true}
//                                         required={true}
//                                         defaultset={"--Select--"}
//                                         labelStyle={{ color: "black", fontWeight: "700" }}
//                                         inputStyle={{ color: "blue", paddingLeft: "10px", margin: "auto" }}
//                                         onChange={(e) => this.handlepurposeid(e)}
//                                     />
//                                 </div>
//                                 {
//                                     this.state.display ?
//                                         <div className='col-md-6'>
//                                             <Input
//                                                 label={"Reason"}
//                                                 placeholder={"Enter your Reason"}
//                                                 labelStyle={{ color: "black", fontWeight: "700" }}
//                                                 inputStyle={{ color: "blue", paddingLeft: "10px", border: "2px", margin: "auto" }}
//                                                 value={this.state.reason}
//                                                 required={true}
//                                                 onChange={(e) => this.storereason(e)}
//                                             />
//                                         </div>
//                                         : null
//                                 }
//                                 <div className='submit' style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}>
//                                     <button onClick={(e) => this.handleModal(e)} style={{ color: 'var(--bgcolor)', flexDirection: "row", justifyContent: "right", backgroundColor: '#ca0903' }} class="btn " type="submit" >Submit</button>
//                                 </div>


//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </>
//         )
//     }

// }
// export default Entryfrom;