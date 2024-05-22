import React, { Component } from "react";
import QRCode from "react-qr-code";
import { Aesencryption } from "../Aes/Aes"
import GetImage from "./GetImage/GetImage"
import TimeFormatter from './TimeFormatter'

const QRcoderef = React.createRef();

export default class ComponentToPrint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getPhotoUrl: `${sessionStorage.getItem('Apipathurl')}getphotov2.php`
    }
  }
  setDate(date) {
    if (date != undefined) {
      var transformdate = date.split(".")[0];
      // console.log(date);
      var exitdate = TimeFormatter(transformdate);
      // console.log(exitdate);
      var visitorinfo = this.state.visitorinfo
      // console.log(visitorinfo)
      var newReverseDate =
        exitdate.ShiftTime +
        "," +
        exitdate.userSplitedDate[2] +
        " " +
        exitdate.ShiftMonth +
        "`" +
        exitdate.CurYear.toString().slice(-2);
      // console.log(newReverseDate);
      //   this.setState({ visitorinfo.intime: newReverseDate })

      return newReverseDate;
    }
  }
  render() {
    console.log(this.props)
    console.log(this.props.value.recid)
    return (
      <>
        <div>
          <div className="print-container" style={{ width: "400px" }}>
            <div className="row" >
              <span style={{ fontSize: "17px", color: "black", textAlignLast: "" }}></span> <span style={{ fontWeight: "700", fontSize: "20px" }}>{sessionStorage.getItem('orgname')}</span><br />

              <div className="col-4" >

                <GetImage
                  imgID={this.props.value.recid}
                  getPhotoUrl={this.state.getPhotoUrl}
                />
              </div>
              <div className="col-8" >
                <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}></span> <span style={{ fontWeight: "500" }}>{this.props.value.firstname}</span><br />
                <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}></span> <span style={{ fontWeight: "500" }}>{this.props.value.lastname}</span><br />
                <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}></span> <span style={{ fontWeight: "500" }}>{this.props.value.contactnumber}</span><br />
              </div>

            </div>
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>Company Name:-</span> <span>{this.props.value.companyname}</span><br />
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>Host :-</span> <span>{this.props.value.visitortype}</span><br />
            <div className="qrcode" ref={QRcoderef} >
              <QRCode
                level="Q"
                size={100}
                value={`${sessionStorage.getItem("url")}Exitform?${Aesencryption(`orgdbname=${sessionStorage.getItem('orgdbname')}&apipath=${sessionStorage.getItem('Apipathurl')}&visitorid=${this.props.value.recid}`)}`}

              // value="print QR"
              // svalue="3"
              />
            </div>
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>No. of Visitor :-</span> <span>{this.props.value.visitorcount}</span><br />
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>Person to Meet :-</span> <span>{this.props.value.persontomeet}</span><br />
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>Purpose :-</span> <span>{this.props.value.purpose}</span><br />
            <span style={{ fontWeight: "700", color: "black", textAlignLast: "" }}>In time :-</span> <span>{this.setDate(this.props.value.intime.date)}</span><br />

          </div>
        </div>
      </>
    );
  }
}
