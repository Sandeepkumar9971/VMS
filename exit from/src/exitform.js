import React, { Component } from 'react';
import { Textbox } from './usefulcomps/HexInput/Textbox'
import './App.css'
// import logo from '../src/Vrms.png'
import Hexapi from './usefulcomps/HexAPI/Hexapi';
import Swal from "sweetalert2";
import { Aesdecryption, Aesencryption } from './usefulcomps/Aes/Aes'
import Urlencoder from './usefulcomps/Urlencoder';
import buildnumber from './buildNumber.json'

// sessionStorage.setItem('Apipathurl', 'https://hexbss.xyz/visitorregistertest/')   /*****For tesing*****/
// sessionStorage.setItem('Apipathurl', 'https://vrms.hexbss.xyz/web/')                    /*****For main bulid****/
// sessionStorage.setItem('orgdbname', 'VRApp_OrgDB_tester')

class Exitform extends Component {
    constructor() {
        super();
        const decodeUrl = (data) => {
            if (Aesdecryption(data.split('?')[1]) !== "") {
                let enctext = data.split('?')[1]
                console.log(enctext)
                let dectext = `?${btoa(Aesdecryption(enctext))}`
                return Urlencoder(data.split('?')[0] + '/' + dectext)
            }
            else {
                return Urlencoder(data)
            }
        }

        this.state = {
            data: decodeUrl(window.location.href),
            visitorid: "",
            remarks: "",
        }
        this.storeremarks = this.storeremarks.bind(this);
        this.handleremark = this.handleremark.bind(this);
    }
    storeremarks(e) {
        this.setState({ remarks: e.target.value })
    }
    handleremark(e) {
        console.log(this.state.data)
        console.log(this.state.data.visitorid)
        console.log(this.state.data.orgdbname)
        console.log(this.state.data.apipath)


        let obj = {
            'query': `[dbo].[VRApp_Web_Proc_ExitForm_Submit]@VisitorID='{0}',@Remarks='{1}'`,
            'orgdbname': `${this.state.data.orgdbname}`,
            'queryArr': [
                `${this.state.data.visitorid}`,
                `${this.state.remarks}`,
            ]


        }
        Hexapi(obj).then(resp => {

            console.log(resp)

            window.location.href = `${sessionStorage.getItem('Apipathurl')}thanks.php`

            if (resp[""][0]["command"] == 1) {

            // Swal.fire({
            //         text: `${resp[""][0]["msg"]}`,
            //         confirmButtonColor: 'red'
            //     }).then(res => {
            //         window.location.reload();
            //     }
            //     )
            }

        }).catch(err => { console.error(err) })

    }
    componentDidMount(){
        sessionStorage.setItem('Apipathurl', `${this.state.data.apipath}`)
    }

    render() {
        console.log(this.state.data)
        console.log(this.state.data.visitorid)
        console.log(this.state.data.orgdbname)
        console.log(this.state.data.apipath)


        return (
            <>

                <nav class="navbar" >
                    {/* <a class="navbar-brand" href="#" style={{ fontsize: "15px", fontWeight: "700", paddingleft: "20px", color: "black" }}>
                        <img src={logo} width="50" height="30" style={{ marginLeft: "20px", marginRight: "15px" }} alt=""></img>
                        
                    </a> */}
                </nav>

                <div className='container' style={{ padding: "20px", marginTop: "20px", width: "360px", position: "relative" }}>
                <div class="shadow-lg p-3 mb-5 bg-lightgrey rounded" >

                    <div className='row' style={{padding:"10px" }}>
                        <center><h1>Exit Form</h1></center>
                    </div>

                    <label style={{ color: "black", fontWeight: "500" }}>Remarks</label>
                    <Textbox
                        label={"Remarks"}
                        name="broadcast_message"
                        id="broadcastmsg"
                        placeholder='Enter Remarks'
                        required={true}
                        value={this.state.remarks}
                        onChange={(e) => {
                            this.storeremarks(e)
                        }}
                    />

                    <div className='submit' style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}>
                        <button onClick={(e) => this.handleremark(e)} style={{ color: 'white', flexDirection: "row", justifyContent: "right", backgroundColor: '#E1563F' }} class="btn " type="submit" >Submit</button>

                    </div>

                    </div>



                </div>
               
            </>
        )
    }

}
export default Exitform;
