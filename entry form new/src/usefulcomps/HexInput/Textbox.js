/* 
In the function 'InputElem', use 'useState' to create a state variable 'textareaHeight' for the textarea's height, with initial value 1. 
Inside the if statement, use 'useState' to set the rows to 'trows'. 
*/ 

import React from 'react'; 
import autosize from "autosize";

export class Textbox extends React.Component {
    componentDidMount() {
      this.textarea.focus();
      autosize(this.textarea);
    }
    render() {
      const style = {
        maxHeight: "auto",
        minHeight: "38px",
        resize: "none",
        padding: "9px",
        boxSizing: "border-box",
        fontSize: "15px",
      };
      return (
        <div>
          <textarea
            style={style}
            ref={c => (this.textarea = c)}
            placeholder={this.props.placeholder}
            rows={1}
            value={this.props.value}
            className='form-control'
            onChange={(e) => this.props.onChange(e)}
            onClick={(e) => this.props.onClick(e)}
            required={this.props.required}
            readOnly={this.props.readOnly}
          />
        </div>
      );
    }
  }