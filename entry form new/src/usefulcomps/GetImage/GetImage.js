import React from 'react'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor';
import Dummydiv from '../images/dummydiv.png'
// var url = `${sessionStorage.getItem('url')}Banners/GetPhoto.php`
export default class GetImage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            userI9mg : '',
            isloadcomplete:false,
            empid:'-1'
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.imgID != prevProps.imgID){
            this.setState({isloadcomplete:false})
            this.getUserImage(true,true)
        }
    }
    getUserImage(isVisible,forceUpdate){
        if(isVisible && (!this.state.isloadcomplete || forceUpdate)){
            // console.log('setting image')
            this.setState({empid:this.props.imgID})
            axios.get(`${this.props.getPhotoUrl}/?HostEmpID=${this.props.imgID}`).then((resp) => {
                this.setState({
                    userImg:'data:image/png;base64,'+resp.data,
                    isloadcomplete:true,
                })
            })
        }
    }
    render(){
        // console.log('render call')
        return (
            <>  
                <VisibilitySensor
                    onChange={(isVisible) => {
                        this.getUserImage(isVisible,false)
                    }}
                >
                    {/* {
                        this.state.isloadcomplete ? */}
                        <img src={this.state.isloadcomplete ? this.state.userImg : Dummydiv} onClick={()=>{
                            if(this.props.redirection){
                                if(this.props.top){
                                    window.top.location.href = `${sessionStorage.getItem('url')}sm?${btoa(`id=${this.props.imgID}&page=Userprofile`)}`;
                                }else{
                                    window.location.href = `${sessionStorage.getItem('url')}sm?${btoa(`id=${this.props.imgID}&page=Userprofile`)}`;
                                }
                            }
                            // window.location.href = `${sessionStorage.getItem('url')}sm?${btoa(`id=${this.props.imgID}&page=Userprofile`)}`;
                        }}/>
                        {/* :
                        <div id={`Image${this.props.imgID}`} className="loadingBox" style={{backgroundColor:"rgba(0,0,0,0.1)",display:"inline-block",borderRadius:"50%",width:`${this.props.width}vw`,height:`${this.props.height}vw`}}></div>
                    } */}
                </VisibilitySensor>
            </>
        )
    }
}