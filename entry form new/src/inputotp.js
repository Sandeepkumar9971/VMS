import React, { useEffect } from 'react';
import { Grid, Paper, Box, Avatar, Link as NavLink } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './App.css'
import Hexapiotp from './usefulcomps/HexAPI/Hexapiotp'
import Swal from "sweetalert2";
import Button from './HexButton/button';



const Login = (props) => {
    const paperStyle = { padding: 20, height: '60vh', width: 270, margin: "50px auto" }
    const avatarStyle = { backgroundColor: '#6d7f9f' }   //  #3370bd
    const btnstyle = { marginTop: '28px ', backgroundColor: 'red' }

    const [otp, setotp] = useState("");
    // const { fname, lname, email, phone } = user;

    const handleChange = e => {
        setotp(e.target.value);
    };
    const handleotp = e => {
        document.getElementById("removebtn").style.display = "none"
        console.log("resend otp")
        setCounter(30)

        let obj = {
            'phoneno': `${this.state.contactnumber}`,
            'orgdbname': `${this.state.data.orgdbname}`,
        }

        Hexapiotp(obj).then(resp => {
            console.log(resp)
            if (resp == 1) {
                this.setState({
                    isModalOpen: true
                })
            }
            else {
                Swal.fire({
                    // title: 'Oops...',  
                    text: 'Invalid otp ! ',
                })
            }
        })
    }

    // const handleSubmit = () => {
    //     // console.log(this.state.saveimage);
    //     if (this.state.saveimage != "") {
    //         if (this.state.visitortypeid != "") {
    //             if (
    //                 this.state.contactnumber.length == 10 ||
    //                 !this.state.contactnumber.length > 0
    //             )
    //                 if (this.contactnumber != "") {
    //                     if (this.companyname != "") {
    //                         if (this.state.vistorcount != "") {
    //                             if (this.state.firstname != "") {
    //                                 if (this.state.lastname != "") {
    //                                     if (this.state.employeename != "") {
    //                                         if (this.state.handlepurposeid != "") {
    //                                             let obj = {
    //                                                 'query': `[dbo].[VRApp_Web_Proc_EntryForm_SubmitV2]
    //                                                         @FirstName='{0}',
    //                                                         @LastName='{1}',
    //                                                         @ContactNumber='{2}',
    //                                                         @VisitorCount='{3}',
    //                                                         @PersonToMeet='{4}',
    //                                                         @VisitorTypeID='{5}',
    //                                                         @PurposeID='{6}',
    //                                                         @CompanyName='{7}',
    //                                                         @Photo=$%$File$%$`,
    //                                                 'orgdbname': `${this.state.data.orgdbname}`,
    //                                                 'queryArr': [
    //                                                     `${this.state.saveimage}`,
    //                                                     `${this.state.firstname}`,
    //                                                     `${this.state.lastname}`,
    //                                                     `${this.state.contactnumber}`,
    //                                                     `${this.state.vistorcount}`,
    //                                                     `${this.state.employeename}`,
    //                                                     `${this.state.visitortypeid}`,
    //                                                     `${this.state.purposeid}`,
    //                                                     `${this.state.companyname}`,
    //                                                 ],
    //                                                 'file': this.state.saveimage,


    //                                             }
    //                                             Hexapi(obj).then(resp => {
    //                                                 console.log(resp)
    //                                                 // console.log(resp[""][0]["command"])
    //                                                 if (resp[''][0]['command'] == 1) {
    //                                                     //MOEAL FALSE
    //                                                     Swal.fire({


    //                                                         text: `${resp[""][0]["msg"]}`,
    //                                                         confirmButtonColor: 'red'

    //                                                     }).then(function () {
    //                                                         window.location.reload();
    //                                                     }
    //                                                     )

    //                                                 }
    //                                                 else {
    //                                                     Swal.fire({

    //                                                         // title: 'Oops...',  
    //                                                         text: 'error ',
    //                                                     })
    //                                                 }

    //                                             }).catch(err => { console.error(err) })

    //                                             // console.log(this.state.firstname)
    //                                             // console.log(this.state.lastname)
    //                                             // console.log(this.state.contactnumber)
    //                                             // console.log(this.state.vistorcount)
    //                                             // console.log(this.state.employeename)
    //                                             // console.log(this.state.reason)
    //                                             // console.log(this.state.visitortypeid)

    //                                         } else {
    //                                             Swal.fire({

    //                                                 // title: 'Oops...',
    //                                                 text: 'Purpose not Selected !',
    //                                                 confirmButtonColor: 'red'

    //                                             });

    //                                         }

    //                                     } else {
    //                                         Swal.fire({

    //                                             // title: 'Oops...',
    //                                             text: 'Person to Meet not Selected !',
    //                                             confirmButtonColor: 'red'

    //                                         });
    //                                     }

    //                                 } else {
    //                                     {
    //                                         Swal.fire({
    //                                             // title: 'Oops...',
    //                                             text: 'Last Name not filled !',
    //                                             confirmButtonColor: 'red'
    //                                         });
    //                                     }
    //                                 }

    //                             } else {
    //                                 {
    //                                     Swal.fire({
    //                                         // title: 'Oops...',
    //                                         text: 'First Name not  filled!',
    //                                         confirmButtonColor: 'red'
    //                                     });
    //                                 }
    //                             }
    //                         } else {
    //                             {
    //                                 Swal.fire({
    //                                     // title: 'Oops...',
    //                                     text: 'Visitor Count not filled!',
    //                                     confirmButtonColor: 'red'
    //                                 });
    //                             }
    //                         }
    //                     } else {
    //                         Swal.fire({
    //                             // title: 'Oops...',
    //                             text: 'Company Name not filled!',
    //                             confirmButtonColor: 'red'
    //                         });

    //                     }
    //                 } else {
    //                     {
    //                         Swal.fire({
    //                             // title: 'Oops...',
    //                             text: 'Contact Number not filled !',
    //                             confirmButtonColor: 'red'
    //                         });
    //                     }
    //                 }
    //         } else {
    //             {
    //                 Swal.fire({
    //                     // title: 'Oops...',
    //                     text: 'Visitor type not Selected !',
    //                     confirmButtonColor: 'red'
    //                 });
    //             }
    //         }
    //     } else {
    //         {
    //             Swal.fire({
    //                 // title: 'Oops...',
    //                 text: 'Image not Selected !',
    //                 confirmButtonColor: 'red'
    //             });
    //         }
    //     }




    //     <Spinner animation="border" variant="dark" />
    // }

    // Timer 

    const [counter, setCounter] = React.useState(30);
    React.useEffect(() => {

        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        return () => clearInterval(timer);
    }, [counter]);


    return (
        <>
            <Grid>

                <Paper elevation={10} style={paperStyle} >

                    <Grid align='center'>

                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2 style={{ color: "red" }}>Verify</h2>
                        <h4 style={{ color: "green" }}></h4>
                        <Box color="black">
                            <span variant="body2">
                                Enter OTP Sent to your mobile number XXXXXXXXXX
                            </span>
                        </Box>
                    </Grid><br />

                    <ValidatorForm>

                        <TextValidator
                            label="Enter 6 Digit OTP"
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ maxLength: 6 }}
                            name="otp"
                            size="small"
                            type="text"
                            fullWidth
                            validators={['required']}
                            errorMessages={['OTP is required']}
                            value={otp}

                        />

                        <Button buttonTitle='Verify' style={{ margin: "5px" }} onClick={() => props.callback(otp)} />
                    </ValidatorForm>
                    <Box mt={3} ><span fontWeight={500} align="center" color='textSecondary'> Resend OTP in <span style={{ color: "green", fontWeight: "bold" }}> 00:{counter < 10 ? "0" + counter : counter}</span> </span></Box>

                    {
                        counter <= 0 ?
                            <span aligntext="center">
                                <Button buttonTitle='Resend OTP' id={props.id} onClick={handleotp} />
                            </span>
                            : ""}


                </Paper>
            </Grid>
        </>
    )

}

export default Login