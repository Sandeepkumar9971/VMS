import React from "react";
import { StringFormatter } from "./StringFormatter";
import axios from 'axios'
import TimeFormtter from './TimeFormatter'
import './notifications.css'
var notify = []
/** Notification released*/
class Notifyfb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNotifications: false,
      badge:""
      // listItems: []
    };
    
    this.gettime = this.gettime.bind(this)
  }
  componentDidMount(){


    if(this.props.userid != undefined && this.props.fetchRsUrl != undefined){
      var userid =this.props.userid
      var fetchrsurl =this.props.fetchRsUrl
      var fd = new FormData();
      let queryString = "[dbo].[SLCI_Web_Proc_User_Notification_GetList] @UserID='{0}'" ;
      let queryArr = [];
      queryArr.push(userid)
      let formattedString = StringFormatter(queryString, queryArr);
      let Query = formattedString;
      fd.append("Query", Query);
      axios({
      mode:'cors',
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      url: fetchrsurl,
      data: fd
      }).then(resp => {
        // console.log(resp.data.Notification)
        // console.log(resp.data.NotificationInfo[0].PendingCount)
        notify = resp.data.Notification
    this.setState({badge:resp.data.NotificationInfo[0].PendingCount})

        })
    }
  }
  
  toggleNotification = () => {
    const { toggleNotifications } = this.state;
    this.setState({ toggleNotifications: !toggleNotifications });
  };
  toggleotherNotification = () => {
    const { toggleNotifications } = this.state;
    this.setState({ toggleNotifications: false });
  };
  gettime(date){
    var logtime = TimeFormtter(date)
    return `${logtime.ShiftTime},${logtime.ShiftDate}`
  }
  render() {

    return (
      <>
      <div className={"notification"} style={{ position: "absolute",right:"2px",top:"13px" }}>
        <div className={"iconSection"}>
          
          <img id="notification-icon"
            alt={"Notification"}
            src={require("./notificationIcon.png")}
            onClick={() => this.toggleNotification()}
            style={{ cursor: "pointer",width:"27px",position:"relative",left:"5px" }}
          ></img>
          <span className="badge badge-danger" style={{position:"absolute",left:"22px",top:"-5px",borderRadius:"9px",fontSize:"9px",background:"red"}}>{this.state.badge}</span>
        </div>

        {this.state.toggleNotifications && (
         
          <div
            style={{
              position: "absolute",
              width: "400px",
              border: "0.5px solid #8080803d",
              minHeight: "100px",
              height:"40vh",
              right:"4%",
              overflowY: "auto",
              // top: "30px"
              boxShadow:"0px 0px 0px 2px rgb(243 242 242)",
              background:"white",
              borderRadius:"10px",
              marginTop:"10px"
            }}
            className={"notificationBar"}
          >
            <div style={{ display: "flex",borderBottom:"2px solid black",position:"sticky",top:"0px",background:"white"}}>
              <p style={{ fontSize: "26px", textAlign: "left", width: "93%",color:"black",fontWeight:"bold",margin:"5px" }}>
                Notifications
              </p>
           
            </div>
                <div>             {
                        notify.map((s,index) => {
                          // if(index == 0){
                          return(
                            <div key={index} style={{  background: "white", padding: "0px 0px 7px 7px",borderBottom:"1px solid #302b2b" }} className={"lineItmes"}>
                                {/* <span style={{ fontSize: "15px", fontWeight: 700,color:"black" }}>{s.RecID}</span> */}
                                <span style={{ fontSize: "15px", fontWeight: 700,color:"black" }}>{s.Header}</span>
                                <div style={{ fontSize: "13px",color:"black" }}>{s.Msg}</div>
                                <div style={{ fontSize: "11px",color:"blue",marginTop:"2px",fontWeight:"bold" }}>{this.gettime(s.Time.date)}</div>
                            </div>
                            
                           )
                          // }
                        })
                      }   
                </div>
          </div>
        )}

      </div>
      {this.state.toggleNotifications && (

<div style={{width:"100vw",height:"100vh",background:"transparent"}}onClick={() => this.toggleotherNotification()}></div>
      )}
</>
      
    );
  }
}

export default Notifyfb;