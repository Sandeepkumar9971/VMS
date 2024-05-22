// import React, { Component } from "react";
// import { Button, Modal } from "react-bootstrap";
// import GetImage from "./GetImage/GetImage";
// import "./pratice.css";

// class EmployeeList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             jsondata: this.props.jsondata,
//             isupdatepending: this.props.isupdatepending,
//             color: "",
//             search: "",
//             isSearchvalue: "",
//             isUserNotSearched: false,
//             isupdate: false

//         }
//         this.Empselectdata = this.Empselectdata.bind(this);
//         this.storeSearch = this.storeSearch.bind(this);
//         this.closemodal = this.closemodal.bind(this);
//     }
//     Empselectdata() {
//         console.log(this.state.jsondata);
//         this.setState({ color: "red" })
//         this.props.callback(this.state.jsondata.EmpID, this.state.jsondata.EmpName);
//     }
//     storeSearch(e) {
//         this.setState({ isSearchValue: true })
//         this.setState({ search: e.target.value })
//         // console.log(this.state.search);


//         if (e.target.value == "") {
//             this.setState({ jsondata: this.props.jsondata })
//         } else {
//             this.setState({
//                 jsondata: this.props.jsondata.filter((jsondata) =>
//                     jsondata.EmpName.toLowerCase().includes(e.target.value.toLowerCase())
//                 )
//             })
//         }
//         if (document.getElementById("searchManagerbox")) {
//             var value = document.getElementById("searchManagerbox").value;
//             console.log(value);
//             if (value == "") {
//                 this.setState({ jsondata: this.props.jsondata });
//             } else {
//                 console.log("empty");
//                 // alert(value)
//                 if (
//                     (this.props.jsondata.filter((jsondata =>
//                         jsondata.EmpName.toLowerCase().includes(
//                             e.target.value.toLowerCase()
//                         )
//                     ).length > 0
//                     ))) {
//                     this.setState({
//                         jsondata:
//                             this.props.jsondata.filter((jsondata) =>
//                                 jsondata.EmpName.toLowerCase().includes(
//                                     e.target.value.toLowerCase()
//                                 )
//                             )
//                     });
//                     this.setState({ jsondata: this.props.jsondata.filter(jsondata => (jsondata.empname).toLowerCase().includes(e.target.value.toLowerCase())) })
//                     this.setState({ isUserNotSearched: true })

//                 } else {
//                     this.setState({ isUserNotSearched: true })
//                 }
//             }
//         } else {
//             this.setState({ jsondata: this.props.jsondata });
//         }
        
//     };
//     // componentDidUpdate(prevProps) {
//     //     console.log(prevProps.isupdatepending, this.props.isupdatepending)
//     //     if (prevProps.isupdatepending != this.props.isupdatepending) {
//     //         this.setState({ isupdate: this.props.isupdatepending }, () => {
//     //             if (this.state.isupdate) {
//     //                 this.state.jsondata.map((data) => {
//     //                     if (data.empid == this.state.color) {
//     //                         data.pendingcount = data.pendingcount - 1
//     //                         this.props.updatecomplete()
//     //                     }
//     //                 })
//     //             }
//     //         })
//     //         //   this.state.jsondata.map((data)=>{
//     //         //       if(data.empid==this.state.color){
//     //         //          data.pendingcount=data.pendingcount-1
//     //         //          this.props.updatecomplete()
//     //         //        }
//     //         //      })
//     //     }
//     // }

//     closemodal() {
//         this.setState({ isModalOpen: false })
//     }
//     newclosemodal() {
//         this.setState({ isnewModalOpen: false })
//     }
//     openmodal() {
//         this.setState({ isModalOpen: true })
//     }
//     render() {
//         console.log(this.props)

//         return (

//             <>
//                 <button type="button" onClick={(e) => this.openmodal(e)} class="close" data-dismiss="modal" aria-hidden="true">new</button>
//                 {
//                     this.props.ismodalshow ?

//                         <Modal
//                             centered
//                             size="large"
//                             id="loadingModal"
//                             animation={true}
//                             show={this.state.isModalOpen}
//                             onHide={() => this.newclosemodal()}
//                             style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
//                             backdrop="static"
//                             keyboard={false}
//                         >
//                             <Modal.Body>
//                                 <button type="button" onClick={(e) => this.closemodal(e)} style={{ marginLeft: "3px", top: "15px", border: "none" }} class="close" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times " aria-hidden="true"></i></button>
//                                 <div className="EmployeeList" >
//                                     <div className="row searchBox">
//                                         <div className="col-md-12">
//                                             <div id="search">
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Search..."
//                                                     id="searchManagerbox"
//                                                     value={this.state.search}
//                                                     className="form-control"
//                                                     onChange={(e) => this.storeSearch(e)}
//                                                     autoFocus={true}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {this.state.isUserNotSearched ? (
//                                         <div
//                                             style={{
//                                                 display: "flex",
//                                                 justifyContent: "center",
//                                                 alignItems: "center",
//                                                 height: "100%",
//                                             }}
//                                         >
//                                             <h3 style={{ fontFamily: "sans-serif", color: "red" }}>
//                                                 No Records!
//                                             </h3>
//                                         </div>
//                                     ) : (
//                                         <div id="EmployeeList">


//                                             {
//                                                 this.state.jsondata.map((s, index) => {
//                                                     console.log(s);
//                                                     return (
//                                                         <div
//                                                             className={`row employee__top ${this.state.color == s.empid ? "active" : ""
//                                                                 } `}
//                                                             onClick={() => this.Empselectdata(s)}
//                                                         >
//                                                             <div
//                                                                 style={{ display: "flex", minHeight: "60px" }}
//                                                                 id={s.Empname}
//                                                             >{
//                                                                     this.props.image ?
//                                                                         <div className="col-md-2 col-2 employeeImg">
//                                                                             <GetImage
//                                                                                 width={5}
//                                                                                 height={5}
//                                                                                 imgID={s.empid}
//                                                                                 clientid={this.props.clientid}
//                                                                                 getPhotoUrl={this.props.getPhotoUrl}
//                                                                             />
//                                                                         </div>
//                                                                         :
//                                                                         ""
//                                                                 }
//                                                                 <div className="col-md-6 col-6 empolyeeName">{s.EmpName}</div>
//                                                                 {
//                                                                     this.props.isstatus ?
//                                                                         <div className="col-md-4 col-4">
//                                                                             {
//                                                                                 s.pendingcount <= 0 ? (
//                                                                                     ""
//                                                                                 ) : (
//                                                                                     <div
//                                                                                         style={{
//                                                                                             display: "flex",
//                                                                                             justifyContent: "center",
//                                                                                             marginTop: "17px",
//                                                                                         }}
//                                                                                     >
//                                                                                         <span
//                                                                                             style={{
//                                                                                                 background: "var(--Primary)",
//                                                                                                 padding: "3px 8px",
//                                                                                                 borderRadius: "22px",
//                                                                                                 color: "var(--bgcolor)",
//                                                                                             }}
//                                                                                         >
//                                                                                             {s.pendingcount + " " + "pending"}
//                                                                                         </span>
//                                                                                     </div>
//                                                                                 )
//                                                                             }
//                                                                         </div>
//                                                                         :
//                                                                         ""
//                                                                 }
//                                                             </div>
//                                                         </div>
//                                                     );
//                                                 })}
//                                         </div>
//                                     )}
//                                 </div>
//                             </Modal.Body>
//                         </Modal>
//                         :
//                         <div className="EmployeeList" >
//                             <div className="row searchBox">
//                                 <div className="col-md-12">
//                                     <div id="search">
//                                         <input
//                                             type="text"
//                                             placeholder="Search..."
//                                             id="searchManagerbox"
//                                             value={this.state.search}
//                                             className="form-control"
//                                             onChange={(e) => this.storeSearch(e)}
//                                             autoFocus={true}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {this.state.isUserNotSearched ? (
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         height: "100%",
//                                     }}
//                                 >
//                                     <h3 style={{ fontFamily: "sans-serif", color: "red" }}>
//                                         No Records!
//                                     </h3>
//                                 </div>
//                             ) : (
//                                 <div id="EmployeeList">


//                                     {
//                                         this.state.jsondata.map((s, index) => {
//                                             console.log(s);
//                                             return (
//                                                 <div
//                                                     className={`row employee__top ${this.state.color == s.empid ? "active" : ""
//                                                         } `}
//                                                     onClick={() => this.Empselectdata(s)}
//                                                 >
//                                                     <div
//                                                         style={{ display: "flex", minHeight: "60px" }}
//                                                         id={s.Empname}
//                                                     >{
//                                                             this.props.image ?
//                                                                 <div className="col-md-2 col-2 employeeImg">
//                                                                     <GetImage
//                                                                         width={5}
//                                                                         height={5}
//                                                                         imgID={s.empid}
//                                                                         clientid={this.props.clientid}
//                                                                         getPhotoUrl={this.props.getPhotoUrl}
//                                                                     />
//                                                                 </div>
//                                                                 :
//                                                                 ""
//                                                         }
//                                                         <div className="col-md-6 col-6 empolyeeName">{s.EmpName}</div>
//                                                         {
//                                                                     this.props.isstatus ?
//                                                         <div className="col-md-4 col-4">
                                                       

//                                                             {
//                                                                 s.pendingcount <= 0 ? (
//                                                                     ""
//                                                                 ) : (
//                                                                     <div
//                                                                         style={{
//                                                                             display: "flex",
//                                                                             justifyContent: "center",
//                                                                             marginTop: "17px",
//                                                                         }}
//                                                                     >
//                                                                         <this.props.isstatus/>
//                                                                         {/* <span
//                                                                             style={{
//                                                                                 background: "var(--Primary)",
//                                                                                 padding: "3px 8px",
//                                                                                 borderRadius: "22px",
//                                                                                 color: "var(--bgcolor)",
//                                                                             }}
//                                                                         >
//                                                                             {s.pendingcount + " " + "pending"}
//                                                                         </span> */}
//                                                                     </div>
//                                                                 )
//                                                             }
                                                           
//                                                         </div>
//                                                          :
//                                                             ""
//                                                         }
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                 </div>  
//                             )}
//                         </div>
//                 }




//             </>
//         )
//     }
// }



// export default EmployeeList;
