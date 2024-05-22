import React from 'react';
import ReactToPrint from 'react-to-print';


import  ComponentToPrint from './componenttoprint';

export default class xXXExample extends React.PureComponent {
    constructor(props){
        super(props)
    }
  render() {
    // console.log(this.props)

    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <span style={{ position:"absolute",top:"18px",right:"80px",fontSize:"20px",cursor:"pointer"}}><i class="fa fa-print" aria-hidden="true"/></span>;
          }}
          content={() => this.componentRef}
        />

        <ComponentToPrint value ={this.props.value} ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}