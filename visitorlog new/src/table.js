import React from 'react';
import Table from 'react-bootstrap/Table'
import './table.css'


export default class TableData extends React.Component {
    
    constructor(props){
      super(props);
      console.log(props.data)
      this.state={
        rowdata:[]
      }
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    }
    
    getKeys = function(){
      if(this.props.data != undefined && this.props.data!=null){
      return Object.keys(this.props.data[0]);
    }
    }
    
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
    }
    
    getRowsData = function(){
      if(this.props!= undefined && this.props.data!=null){

      var items = [];
      var filterdate=[];
      var oldData = this.props.data
      var allFilterKeys = this.props.filterkeys
      console.log(this.props.filterkeys)
      console.log(this.props.data)
      oldData.map((s,index) => {
        for(var j=0;j<allFilterKeys.length;j++){
          console.log(s[allFilterKeys[j]])
          var date= s[allFilterKeys[j]].date;
            date=date.split(' ')[0]
            var rev = date.split('-')
            var newReverseDate = `${rev[2]}-${rev[1]}-${rev[0]}`
            console.log(newReverseDate)
            filterdate.push(newReverseDate)
        }
        items.push(s)
        for(var i=0;i<allFilterKeys.length;i++){
          items[index][allFilterKeys[i]] = filterdate[i]
        }
        filterdate.splice(0,allFilterKeys.length)
      })
      console.log(items)
      var keys = this.getKeys();
      return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
    }
  }
    
    render() {
        return (
          <>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12' >
                <center><h1 style={{color:"var(--bgcolor)", background:"var(--Primary)",margin:"8px 0px",letterSpacing:"2px"}}>{this.props.heading}</h1></center>
              </div>
            </div>
          <div className='row'>
          <div className='col-md-12'>
          <div>
            <Table responsive>
            <thead>
              <tr style={{ background: "var(--Primary)", color: "var(--bgcolor)", position: "sticky", top: "0px" }}>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
            </Table>
          </div>
          </div>
          </div>
          </div>
         
          </>
          
        );
    }
}

const RenderRow = (props) =>{
  console.log(props.data)
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}