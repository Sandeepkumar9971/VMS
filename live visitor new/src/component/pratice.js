import React, { Component } from "react";
import GetImage from "./GetImage/GetImage";
import "./pratice.css";
export default class EmployeeList extends Component {
    constructor(props){
      super(props);
      this.state = {
        jsondata:this.props.jsondata,
        isupdatepending:this.props.isupdatepending,
        color:"",
        search:"",
        isUserNotSearched:false,
        isSearchValue:"",
        isupdate:false
  
      }
  
      this.Empselectdata = this.Empselectdata.bind(this)
      this.storeSearch = this.storeSearch.bind(this);
    }
  
     Empselectdata = (jsondata) => {
    
      this.setState({color:jsondata.empid})
      this.props.callback(jsondata.empid, jsondata.empname);
    };
  
     storeSearch = (e) => {
          console.log(e.target.value);
          this.setState({isSearchValue:true,search:e.target.value})
      
          if (e.target.value == "") {
            this.setState({jsondata:this.props.jsondata})
            // setjsondata(props.jsondata);
          } else {
            this.setState({
              jsondata:this.props.jsondata.filter((jsondata)=>{
                jsondata.empname.toLowerCase().includes(e.target.value.toLowerCase())
              }
              )
            })
            // setjsondata(
            //   props.jsondata.filter((jsondata) =>
            //     jsondata.empname.toLowerCase().includes(e.target.value.toLowerCase())
            //   )
            // );
          }
      
          if (document.getElementById("searchManagerbox")) {
            var value = document.getElementById("searchManagerbox").value;
            console.log(value);
            if (value == '') {
              this.setState({jsondata:this.props.jsondata})
              // setjsondata(props.jsondata);
            } else {
              console.log("empty");
              // alert(value)
              if (
                (this.props.jsondata.filter(jsondata =>(jsondata.empname).toLowerCase().includes(e.target.value.toLowerCase())))
                .length > 0
              ) {
                // setjsondata(
                //   props.jsondata.filter((jsondata) =>
                //     jsondata.empname
                //       .toLowerCase()
                //       .includes(e.target.value.toLowerCase())
                //   )
                // );
                this.setState({jsondata:this.props.jsondata.filter(jsondata=>(jsondata.empname).toLowerCase().includes(e.target.value.toLowerCase()))})
                this.setState({isUserNotSearched:false})
                // setisUserNotSearched(false);
              } else {
                this.setState({isUserNotSearched:true})
  
                // setisUserNotSearched(true);
              }
            }
          } else {
            this.setState({jsondata:this.props.jsondata})
            // setjsondata(props.jsondata);
          }
        };
  
        componentDidUpdate(prevProps){
          console.log(prevProps.isupdatepending,this.props.isupdatepending)
          if(prevProps.isupdatepending!=this.props.isupdatepending){
            this.setState({isupdate:this.props.isupdatepending},()=>{
              if(this.state.isupdate){
                 this.state.jsondata.map((data)=>{
                  if(data.empid==this.state.color){
                    data.pendingcount=data.pendingcount-1
                    this.props.updatecomplete()
                  }
                })
              }
            })
                // this.state.jsondata.map((data)=>{
                //   if(data.empid==this.state.color){
                //     data.pendingcount=data.pendingcount-1
                //     this.props.updatecomplete()
                //   }
                // })
              }
        }
      
  
    render() {
      return (
        <div>
            <div className="EmployeeList">
        <div className="row searchBox">
          <div className="col-md-12">
            <div id="search">
              <input
                type="text"
                placeholder="Search..."
                id="searchManagerbox"
                value={this.state.search}
                className="form-control"
                onChange={(e) => this.storeSearch(e)}
                autoFocus={true}
              />
            </div>
          </div>
        </div>
  
        {this.state.isUserNotSearched ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h3 style={{ fontFamily: "sans-serif", color: "var(--Record)" }}>
              No Records!
            </h3>
          </div>
        ) : (
          <div id="EmployeeList">
           
  
            {this.state.jsondata.map((s, index) => {
              // console.log(s)
  
              return (
                <div
                  className={`row employee__top ${
                    this.state.color == s.empid ? "active" : ""
                  } `}
                  onClick={() => this.Empselectdata(s)}
                >
                  <div
                    style={{ display: "flex", minHeight: "60px" }}
                    id={s.empname}
                  >
                    <div className="col-md-2 col-2 employeeImg">
                      {/* <div style={{width:"60px",height:"60px",borderRadius:"50%",background:"gray"}}></div> */}
                      <GetImage
                        width={5}
                        height={5}
                        imgID={s.empid}
                        clientid={this.props.clientid}
                        getPhotoUrl={this.props.getPhotoUrl}
                      />
                    </div>
                    <div className="col-md-6 col-6 empolyeeName">{s.Empname}</div>
                    <div className="col-md-4 col-4">
                      {s.pendingcount <= 0 ? (
                        ""
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "17px",
                          }}
                        >
                          <span
                            style={{
                              background: "var(--Primary)",
                              padding: "3px 8px",
                              borderRadius: "22px",
                              color: "var(--bgcolor)",
                            }}
                          >
                            {s.pendingcount + " " + "pending"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
        </div>
      )
    }
  }
  