import React, { Component } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateTimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { Modal } from "react-bootstrap";
import "./Calender.css";
var DefaultDate = new Date();
export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(newDate) {
    DefaultDate = newDate;
    var date = moment(newDate).format("YYYY-MM-DD HH:mm:ss");
    this.props.onChange(date);
  }
  render() {
    return (
      <Modal
        id="dateModal"
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        show={this.props.openDatePicker}
        onHide={() => this.props.onHideDatePicker(false)}
      >
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              // inputFormat="yyyy-MM"
              views={this.props.views}
              label={this.props.label}
              variant="static"
              value={
                this.props.defaults != undefined
                  ? new Date(this.props.defaults)
                  : DefaultDate
              }
              onChange={(e) => this.handleDateChange(e)}
              disablePast={this.props.disablePast}
              disableFuture={this.props.disableFuture}
              disableToolbar={this.props.disableToolbar}
              animateYearScrolling={true}
            />
          </MuiPickersUtilsProvider>
        </Modal.Body>
      </Modal>
    );
  }
}
export class Datetimepicker extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  handleDateChange(newDate) {
    DefaultDate = newDate;
    var date = moment(newDate).format("YYYY-MM-DD HH:mm:ss");
    this.props.onChange(date);
  }
  render() {
    return (
      <Modal
        id="dateModal"
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        show={this.props.openDateTimePicker}
        onHide={() => this.props.onHideDateTimePicker(false)}
      >
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              variant="static"
              value={
                this.props.defaults != undefined
                  ? new Date(this.props.defaults)
                  : DefaultDate
              }
              onChange={(e) => this.handleDateChange(e)}
              disablePast={this.props.disablePast}
              disableFuture={this.props.disableFuture}
              disableToolbar={this.props.disableToolbar}
              animateYearScrolling={true}
            />
          </MuiPickersUtilsProvider>
        </Modal.Body>
      </Modal>
    );
  }
}
export class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state={
        selectedTime:new Date()
    }
  }

    componentDidMount(){
        if(this.props.defaults){
            this.setState({selectedTime:this.props.defaults})
        }
    }
  render() {
    return (
      <Modal
        id="dateModal"
        centered
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        show={this.props.openTimePicker}
        onHide={() => this.props.onHideTimePicker(false)}
      >
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              variant="static"
              value={
                this.props.defaults != undefined
                  ? new Date(this.props.defaults)
                  : this.state.selectedTime
              }
              onChange={(date) => this.setState({selectedTime:date})}
            />
          </MuiPickersUtilsProvider>
          <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",width:"100%",minHeight:"50px"}}>
              <span className="modalbutton" onClick={()=> this.props.onHideTimePicker(false)}>Cancle</span>
              <span className="modalbutton"  onClick={(e)=> this.props.onChange(moment(this.state.selectedTime).format("YYYY-MM-DD HH:ss:mm"))}>Ok</span>

          </div>

        </Modal.Body>
      </Modal>
    );
  }
}
