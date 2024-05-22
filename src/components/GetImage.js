import React from "react";
import axios from "axios";
import VisibilitySensor from "react-visibility-sensor";
import Dummydiv from "./images/userprofile.png";
import Spinner from "react-bootstrap/Spinner";

// var url = `${sessionStorage.getItem('url')}Banners/GetPhoto.php`
export default class GetImage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userImg: "",
      isloadcomplete: false,
      isImageFound: false,
      empid: "-1",
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.imgID != prevProps.imgID) {
      this.setState({ isloadcomplete: false });
      this.getUserImage(true, true);
    }
  }
  getUserImage(isVisible, forceUpdate) {
    if (isVisible && (!this.state.isloadcomplete || forceUpdate)) {
      // console.log("setting image");
      // console.log(this.props.getPhotoUrl);
      this.setState({ empid: this.props.imgID });
      axios
        .get(`${this.props.getPhotoUrl}/?HostEmpID=${this.props.imgID}`)
        .then((resp) => {
          // console.log(typeof resp.data);
            // resp.data = null
          if (resp.data != null) {
            this.setState({
              userImg: "data:image/png;base64," + resp.data,
              isImageFound: true,
            });
          } else {
            this.setState({
              isImageFound: false,
            });
          }
        }).then((resp => {
            this.setState({ isloadcomplete: true})
        }));
    }
  }
  render() {
    // console.log("render call");
    return (
      <>
        <VisibilitySensor
          onChange={(isVisible) => {
            this.getUserImage(isVisible, false);
          }}
        >
          {
            this.state.isloadcomplete ? (
              this.state.isImageFound ? (
                <img src={this.state.userImg} />
              ) : (
                <img src={Dummydiv} />
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner animation="border" variant="dark" />
              </div>
            )
          }
        </VisibilitySensor>
      </>
    );
  }
}
