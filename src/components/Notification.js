import React, { Component } from 'react'
import { StringFormatter } from "./StringFormatter";
import axios from 'axios'
import TimeFormtter from './TimeFormatter'
import GetImage from './GetImage';
import './Notification.css'
import { Spinner } from 'react-bootstrap';
import VisibilitySensor from 'react-visibility-sensor';

// import './notifications.css'
export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getPhotoUrl: '',
            fetchRsUrl: '', userid: '', clientid: '',
            NotificationList: [], isNotificationFound: false, isApiHitComplete: false,
            NotificationLength: 0, isLastList: false
        }
        this.fetchNotifications = this.fetchNotifications.bind(this)
        this.getNotifyTime = this.getNotifyTime.bind(this)
    }
    fetchNotifications(fetchrsurl, userid, clientid, recid) {
        if (recid == -1) {
            this.setState({
                isApiHitComplete: false
            })
        }
        // this.setState({ isNotificationFound: false})
        var fd = new FormData();
        let queryString = "SLCI_Web_Proc_User_Notification_GetList @UserID='{0}',@ClientID='{1}',@LastPageID='{2}'";
        let queryArr = [];
        queryArr.push(`${userid}`, `${clientid}`, `${recid}`)
        let formattedString = StringFormatter(queryString, queryArr);
        let Query = formattedString;
        fd.append("Query", Query);
        axios({
            mode: 'cors',
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            url: fetchrsurl,
            data: fd
        }).then(resp => {
            console.log(resp.data)
            if (resp.data[''].length > 0 && resp.data[''] != null) {
                if (resp.data[''].length < this.state.NotificationLength) {
                    this.setState({ isLastList: true })
                } else {
                    this.setState({ isLastList: false, NotificationLength: resp.data[''].length })
                }
                this.setState({
                    NotificationList: this.state.NotificationList.concat(resp.data['']),
                    isNotificationFound: true,
                })
            } else {
                if (recid != -1) {
                    if (resp.data[''].length < this.state.NotificationLength) {
                        this.setState({ isLastList: true, isNotificationFound: true })
                    } else {
                        this.setState({ isLastList: false, isNotificationFound: false })
                    }
                } else {
                    this.setState({
                        isNotificationFound: false
                    })
                }
            }
        }).then(resp => {
            this.setState({ isApiHitComplete: true })
        }).catch(err => console.error('notification list fetch error : ', err))
    }
    componentDidMount() {
        this.setState({
            getPhotoUrl: this.props.getPhotoUrl,
            fetchRsUrl: this.props.fetchRsUrl,
            userid: this.props.userid,
            clientid: this.props.clientid
        })
        this.fetchNotifications(this.props.fetchRsUrl, this.props.userid, this.props.clientid, '-1')


    }
    getNotifyTime(logtime) {
        if (logtime != null) {
            let dateobj = TimeFormtter(logtime.date)
            console.log(dateobj)
            let str = `${dateobj.userSplitedDate[2]} ${dateobj.ShiftMonth}, ${dateobj.ShiftTime}`
            return str
        }
    }
    // componentDidUpdate(){
    //     var ignoreClickOnMeElement = document.getElementById('maniNotificationBox');

    //     document.addEventListener('click', function (event) {
    //         var isClickInsideElement = event.target;
    //         if (ignoreClickOnMeElement != isClickInsideElement) {
    //             this.props.closeNotifyBox(false)
    //             // alert('hello')
    //             //Do something click is outside specified element
    //         }
    //     });
    // }
    closeNotificationBox(e) {
        e.preventDefault()
        this.props.closeNotifyBox(false)
    }
    render() {

        return (
            <>
                <div className="notificationsModal">
                    <div className="title">
                        <span>Notifications</span>
                    </div>
                    {
                        this.state.isApiHitComplete ?
                            this.state.isNotificationFound ?
                                this.state.NotificationList.map((list, index) => {
                                    return (
                                        <>
                                            <VisibilitySensor
                                                onChange={(isVisible) => {
                                                    if (index == this.state.NotificationList.length - 1 && isVisible) {
                                                        if (!this.state.isLastList) {
                                                            this.fetchNotifications(this.state.fetchRsUrl, this.state.userid, this.state.clientid, list.RecID)
                                                        }
                                                    }
                                                }}
                                            >
                                                <div className="tile" key={index}>
                                                    {
                                                        list.Seen == 0 ?
                                                            <div className="dotIcon">

                                                                <span></span>
                                                            </div>
                                                            : null
                                                    }
                                                    <div className="userImage">
                                                        <GetImage getPhotoUrl={this.state.getPhotoUrl} imgID={list.ActionByEmpID} />
                                                    </div>
                                                    <div className="Description">
                                                        <span className='header'>{list.Header}</span>
                                                        <span className='desc'>{list.Message}</span>
                                                        <span className='date'>{this.getNotifyTime(list.LogTIme)}</span>
                                                    </div>
                                                </div>
                                            </VisibilitySensor>
                                            {
                                                (index == Object.keys(this.state.NotificationList).length - 1) ?
                                                    !this.state.isLastList ?
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: "10vh" }}>
                                                            <Spinner animation="border" variant="dark" />
                                                        </div>
                                                        :
                                                        ""
                                                    :
                                                    ""
                                            }
                                        </>
                                    )
                                })
                                :
                                <div style={{ display: 'flex', width: "100%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                    <h5>No Notification!</h5>
                                </div>
                            :
                            <div style={{ display: 'flex', width: "100%", justifyContent: "center", alignItems: "center", height: "100%" }}>
                                <Spinner animation="border" variant="dark" />
                            </div>
                    }
                </div>
                <div style={{ width: "100vw", height: "100vh", background: "transparent",position:"absolute",top:"0px",left:"0px" }} onClick={(e) => this.closeNotificationBox(e)}></div>

            </>
        )
    }
}
