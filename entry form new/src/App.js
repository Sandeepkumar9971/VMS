import React, { Component } from 'react'
import Entryform from './entryfrom';
import Setimage from './Setimage/setimage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Paper from './inputotp';
import Practice from './practice'


export default class App extends Component {
  constructor(){
    super();
    this.state={
   
    }
    }
  render() {
    return (
    <>
    {/* <Paper/> */}
    <Entryform/>
    {/* <Practice/> */}

    {/* <Setimage attachmentbutton={true} />  */}

</>
    )
  }
}
