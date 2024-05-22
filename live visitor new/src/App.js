import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepg from "./homepg";
// import { PrintContextConsumer } from "react-to-print";
// import Example  from './component/printtrigger'


function App() {
  return (
    <div>
      <Homepg/> 
      {/* <Example/> */}
    </div>
  )
}
export default App;


// import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
// import EmployeeList from './component/Employelist'
// import Axios from 'axios'
// import GetImage from './component/GetImage/GetImage'
// import { Spinner, Modal} from 'react-bootstrap'
// import Button from './HexButton/button'


// sessionStorage.setItem('url', 'http://slci.trackhr.tech/')
// sessionStorage.setItem('Apipathurl', 'http://trackhr.trackhr.tech/Sandboxslci/')
// sessionStorage.setItem('userid', '2')

// sessionStorage.setItem('apiname', 'GetPhotoV2.php')
// var EmpID = "";
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       jsondata: [],
//       clientid: `${sessionStorage.getItem('clientid')}`,
//       getPhotoUrl: `${sessionStorage.getItem('Apipathurl')}${sessionStorage.getItem('apiname')}`,
//     }
//   }
//   componentDidMount() {
//     const userid = sessionStorage.getItem('userid')
//     // const clientid = sessionStorage.getItem('clientid');
//     var clientid = "5"
//     const apipathurl = sessionStorage.getItem('Apipathurl');
//     var url = apipathurl + 'FetchRsData.php';
//     var formData = new FormData();
//     var Query = "[dbo].[SLCI_Web_Proc_AttendanceManupulation_Employees_GetList] @ClientID='" + clientid + "',@UserID =" + userid + "";
//     console.log(Query);
//     formData.append("Query", Query);
//     Axios({
//       method: 'post',
//       headers: { 'Content-Type': 'multipart/form-data' },
//       url: url,
//       data: formData
//     }).then(res => {
//       this.setState({ isModalQueryHitComplete: true });
//       console.log(res.data)
//       setTimeout(() => {
//         this.setState({ spinner: false })
//       }, 100);
//       var data = res.data;
//       var EmployeeList = data[""]
//       console.log(EmployeeList)
//       this.setState({ jsondata: EmployeeList });
//       console.log(this.state.jsondata)
//       if(EmployeeList.length>0 && EmployeeList != undefined && EmployeeList!= null ){
//         this.setState({jsondata:EmployeeList, isDataAvailable: true })
//       }

//       console.log(this.state.jsondata)
//     });
//   }
//   ChangeEmployee(selected, name) {
//     EmpID = selected;
//     // console.log(EmpID);
//     this.setState({ Empname: name });
//   }

//   render() {
//     return (
//       <div>
//         {/* <Homepg/>  */}
//         {/* <Example/> */}

       
//         <div className='container-fluid'>
//           <div className='row'>
//             <div className='col-md-8'>


//               <h3 style={{ color: "var(--Primary)", position: "sticky", top: "0", background: "var(--bgcolor)", zIndex: "999", paddingLeft: "28px" }}>Select Employee</h3>


//               {/* <div className='container-fluid' style={{ display: this.state.spinner ? "flex" : "none", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
//                 <Spinner animation="border" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//               </div> */}

//               <div className='container-fluid' style={{ display: this.state.spinner ? "none" : "block" }}>
//                 {this.state.jsondata != "" ?

//                   <EmployeeList  jsondata={this.state.jsondata} ismodalshow={true} addcomp={<Button  buttonTitle='Button'/>} image={true} clientid={this.clientid} getPhotoUrl={this.state.getPhotoUrl} callback={this.ChangeEmployee.bind(this)}></EmployeeList>
//                   :
//                   <Spinner animation="border" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//                   // <h3 style={{ position: "relative", textAlign: "center", top: "50%", fontFamily: "sans-serif", color: "var(--Record)" }}>No Records!</h3>
//                 }
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     )
//   }
// }
// export default App;