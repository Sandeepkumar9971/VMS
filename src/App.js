import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import SideBar from "./components/SideBar";
import './App.css'
export default function App() {


  useEffect = () => {
    if ((sessionStorage.getItem('console') == undefined) && !sessionStorage.getItem('console')) {
      console.log = () => { }
    }
  }
  return (
    <div className="App">
      <SideBar />
    </div>
  );
}
