import React, { Component } from 'react';
import OpenEye from './images/eye.png'
import CloseEye from './images/hidden.png'
import './InputBox.css'
import search from "../HexInput/images/search.png";


// export class Password extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isVisiblePassword: false
//     }
//     this.storeValueWithWordboundation = this.storeValueWithWordboundation.bind(this)
//   }

//   storeValueWithWordboundation(limit, id, e) {
//     this.props.onChange &&
//       this.props.onChange(e)
//     if (document.getElementById(id)) {
//       document.getElementById(id).innerHTML = `${e.currentTarget.value.length}/${limit}`
//     }
//   }
//   render() {
//     return (
//       <>
//         {
//           this.props.inline ?
//             <form>
//               <div className="row g-3 align-items-center">
//                 <div className="col-auto">
//                   <label htmlFor={this.props.htmlFor} className="col-form-label" style={this.props.labelStyle}>
//                     {this.props.label}
//                     {
//                       this.props.required ?
//                         <span style={{ color: 'red', fontSize: "18px", fontWeight: "600", paddingLeft: "5px" }}>*</span>
//                         : null
//                     }
//                   </label>
//                 </div>
//                 <div className="col-auto" style={{ position: "relative" }}>
//                   <input
//                     type={this.state.isVisiblePassword ? "text" : "password"}
//                     placeholder={this.props.placeholder}
//                     value={this.props.value}
//                     className="form-control"
//                     onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange(e)}
//                     onClick={(e) => this.props.onClick && this.props.onClick(e)}
//                     readOnly={this.props.readOnly}
//                     style={this.props.inputStyle}
//                     maxLength={this.props.wordboundation && this.props.wordboundation.limit}
//                     disabled={this.props.disabled}
//                     autoComplete={"off"}
//                   />
//                 </div>
//                 <div className="col-auto">
//                   <span id={this.props.htmlFor} className="form-text">
//                     {
//                       this.state.isVisiblePassword ?
//                         <img
//                           src={OpenEye}
//                           alt=""
//                           style={{ width: "25px", heigth: "auto", cursor: 'pointer', imageRendering: "-webkit-optimize-contrast" }}
//                           onClick={() => this.setState({ isVisiblePassword: !this.state.isVisiblePassword })}
//                         />
//                         :
//                         <img
//                           src={CloseEye}
//                           alt=""
//                           style={{ width: "25px", heigth: "auto", cursor: 'pointer', imageRendering: "-webkit-optimize-contrast" }}
//                           onClick={() => this.setState({ isVisiblePassword: !this.state.isVisiblePassword })}
//                         />
//                     }
//                     {
//                       this.props.wordboundation ?
//                         <span id={`word${this.props.wordboundation.id}`} className="WordCounter" style={{ fontSize: "14px", color: "gray", paddingLeft: "10px", position: 'relative', top: '2px' }}>0/{this.props.wordboundation.limit}</span>
//                         : null
//                     }
//                   </span>
//                 </div>
//               </div>
//             </form>
//             :
//             <form>
//               <div className="form-group">
//                 <label htmlFor={this.props.htmlFor} style={this.props.labelStyle}>
//                   {this.props.label}
//                   {
//                     this.props.required ?
//                       <span style={{ color: 'red', fontSize: "18px", paddingLeft: "5px" }}>*</span>
//                       : null
//                   }
//                 </label>
//                 {
//                   this.state.isVisiblePassword ?
//                     <img
//                       src={OpenEye}
//                       alt=""
//                       style={{ float: "right", width: "25px", heigth: "auto", cursor: 'pointer', imageRendering: "-webkit-optimize-contrast", marginRight: "10px" }}
//                       onClick={() => this.setState({ isVisiblePassword: !this.state.isVisiblePassword })}
//                     />
//                     :
//                     <img
//                       src={CloseEye}
//                       alt=""
//                       style={{ float: "right", width: "25px", heigth: "auto", cursor: 'pointer', imageRendering: "-webkit-optimize-contrast", marginRight: "10px" }}
//                       onClick={() => this.setState({ isVisiblePassword: !this.state.isVisiblePassword })}
//                     />
//                 }
//                 {
//                   this.props.wordboundation ?
//                     <span id={`word${this.props.wordboundation.id}`} className="WordCounter" style={{ fontSize: "14px", color: "gray", float: "right", marginRight: "10px" }}>0/{this.props.wordboundation.limit}</span>
//                     : null
//                 }
//                 <input
//                   type={this.state.isVisiblePassword ? "text" : "password"}
//                   placeholder={this.props.placeholder}
//                   value={this.props.value}
//                   className="form-control"
//                   onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange(e)}
//                   onClick={(e) => this.props.onClick && this.props.onClick(e)}
//                   readOnly={this.props.readOnly}
//                   style={this.props.inputStyle}
//                   maxLength={this.props.wordboundation && this.props.wordboundation.limit}
//                   disabled={this.props.disabled}
//                   autoComplete={"off"}
//                 />
//               </div>
//             </form>
//         }
//       </>
//     )
//   }
// };


export class Input extends Component {
  constructor(props) {
    super(props)
    this.storeValueWithWordboundation = this.storeValueWithWordboundation.bind(this)
  }
  storeValueWithWordboundation(limit, id, e) {
    this.props.onChange &&
      this.props.onChange(e)
    if (document.getElementById(id)) {
      document.getElementById(id).innerHTML = `${e.currentTarget.value.length}/${limit}`
    }
  }
  render() {
    return (
      <>
        {
          this.props.inline ?
            <div className="row g-3 align-items-center">
              <div className="col-auto">
                <label htmlFor={this.props.htmlFor} className="col-form-label" style={this.props.labelStyle}>
                  {this.props.label}
                  {
                    this.props.required ?
                      <span style={{ color: 'red', fontSize: "18px", fontWeight: "600", paddingLeft: "5px" }}>*</span>
                      : null
                  }
                </label>
              </div>
              <div className="col-auto" style={{ position: "relative" }}>
                <input
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  value={this.props.value}
                  className="form-control"
                  onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange(e)}
                  onClick={(e) => this.props.onClick && this.props.onClick(e)}
                  readOnly={this.props.readOnly}
                  style={this.props.inputStyle}
                  maxLength={this.props.wordboundation && this.props.wordboundation.limit}
                  disabled={this.props.disabled}
                />
                  <div >
                {
                  this.props.icon ?
                    <div className='col-1' style={{ marginTop: "55px", position: "relative", padding: "0px" }}>
                      <img src={search} width="20" height="20" style={{ position: "relative", cursor: "pointer", display: "inline-block" }} onClick={(e) => this.handlesearch(e)} />
                    </div>
                    :
                    " "
                }
              </div>
              </div>
              <div className="col-auto">
                {
                  this.props.wordboundation ?
                    <span id={`word${this.props.wordboundation.id}`} className="WordCounter" style={{ fontSize: "14px", color: "gray" }}>0/{this.props.wordboundation.limit}</span>
                    : null
                }
              </div>
            </div>
            :
            <div className="form-group">
              <label htmlFor={this.props.htmlFor} style={this.props.labelStyle}>
                {this.props.label}
                {
                  this.props.required ?
                    <span style={{ color: 'red', fontSize: "18px", paddingLeft: "5px" }}>*</span>
                    : null
                }
              </label>
              {
                this.props.wordboundation ?
                  <span id={`word${this.props.wordboundation.id}`} className="WordCounter" style={{ fontSize: "14px", color: "gray", float: "right", marginRight: "10px" }}>0/{this.props.wordboundation.limit}</span>
                  : null
              }
              <input
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.props.value}
                className="form-control"
                onChange={(e) => this.props.wordboundation ? this.storeValueWithWordboundation(this.props.wordboundation.limit, `word${this.props.wordboundation.id}`, e) : this.props.onChange(e)}
                onClick={(e) => this.props.onClick && this.props.onClick(e)}
                readOnly={this.props.readOnly}
                style={this.props.inputStyle}
                maxLength={this.props.wordboundation && this.props.wordboundation.limit}
                disabled={this.props.disabled}
              />
              <div>
                {
                  this.props.icon 
                    // <div className='col-1' style={{ marginTop: "55px", position: "relative", padding: "0px" }}>
                    //   <img src={search} width="20" height="20" style={{ position: "relative", cursor: "pointer", display: "inline-block" }} onClick={(e) => this.handlesearch(e)} />
                    // </div>
                    // :
                    // " "
                }
              </div>


            </div>

        }
      </>

    )
  }
}