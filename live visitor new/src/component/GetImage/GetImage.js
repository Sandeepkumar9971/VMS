import React from 'react'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor';
import Dummydiv from '../../images/profile.png'

// var url = `${sessionStorage.getItem('url')}Banners/GetPhoto.php`
export default class GetImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userImg: '',
            isloadcomplete: false,
            empid: '-1',
            isImageFound: false
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.imgID != prevProps.imgID) {
            this.setState({ isloadcomplete: false })
            this.getUserImage(true, true)
        }
    }
    getUserImage(isVisible, forceUpdate) {
        if (isVisible && (!this.state.isloadcomplete || forceUpdate) && (!this.state.isImageFound || forceUpdate)) {
            // console.log('setting image')
            this.setState({ empid: this.props.imgID })
            axios.get(`${this.props.getPhotoUrl}/?visitorid=${this.props.imgID}`).then((resp) => {
                // console.log(resp.data)
                if (resp.data != null) {
                    this.setState({
                        userImg: 'data:image/png;base64,' + resp.data,
                        isloadcomplete: true,
                        isImageFound: true
                    })
                } else {
                    this.setState({
                        isImageFound: false
                    })
                }
            })
        }
    }
    render() {
        return (
            <>
                <VisibilitySensor
                    partialVisibility={true}
                    onChange={(isVisible) => {
                        this.getUserImage(isVisible, false)
                    }}
                >
                    <div style={{
                        backgroundImage: `url(${this.state.isloadcomplete ? this.state.isImageFound ? this.state.userImg : Dummydiv : Dummydiv})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "50%",
                        cursor: 'pointer',
                        // width: this.props.width || "80px",
                        // height: this.props.height || '80px'
                        width: "50px",
                        height:'50px'
                    }}
                        onClick={() => {
                            if (this.props.top) {
                                window.top.location.href = `${sessionStorage.getItem('url')}sm?${btoa(`id=${this.props.imgID}&page=Userprofile`)}`;
                            } else {
                                window.location.href = `${sessionStorage.getItem('url')}sm?${btoa(`id=${this.props.imgID}&page=Userprofile`)}`;
                            }
                        }}></div>
                </VisibilitySensor>
            </>
        )
    }
}