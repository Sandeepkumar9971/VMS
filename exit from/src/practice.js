// import React, { Component } from 'react';
// import { ModalBody } from "react-bootstrap";
// import { Modal } from "react-bootstrap";


// class Alert extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: this.props.data,
//             isModalOpen: false,
//         }

//         this.handlealert = this.handlealert.bind(this)

//     }
//     handlealert(e) {
//         window.location.reload()
//     }


//     render() {
//         console.log(this.state.data)
//         return (
//             <>
//                 {
//                     this.state.data !== "" ?


//                         <div class="alertbox" style={{
//                             width: "360px",
//                             border:"1px solid lightgrey",
//                             marginLeft: "35%",
//                             position: "absolute",
//                             borderRadius:"10px",
//                             padding:"0.5em",
//                             background:"lightgrey"

                            
//                         }}>
//                             <center><span style={{ fontSize: "20px" }}>{this.props.data}</span></center>
//                             <div className='submit' style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}>
//                                 <button onClick={(e) => this.handlealert(e)} style={{ color: 'white', flexDirection: "row", justifyContent: "right", backgroundColor: '#ca0903' }} class="btn " type="submit" >OK</button>
//                             </div>
//                         </div>

//                         :
//                         ""
//                 }
//             </>

//         )
//     }
// }
// export default Alert;