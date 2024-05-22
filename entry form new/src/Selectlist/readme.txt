=========================================SelectList=======================================

Select list
How to use:
import Select from './select';
import 'bootstrap/dist/css/bootstrap.min.css';   // import this in your main HOC file.
 
Example: put this part in state.
 
   Rowcount:[{
                name:"raj",
                value:"0"
              },
              {
                name:"test",
                value:"1"
              }]
 
 
<Select
 label={"Select"}   //give label according to project.
 data={this.state.Select} // give state name according to project.
 inline={true}
 readOnly={true}
 onChange={(e)=>this.handleSelect(e)}// give function name according to project.
 labelStyle={{ color: "black", fontWeight: "700" }}
 inputStyle={{ color: "blue", paddingLeft: "0px", margin: "auto" }}
 disabled={true}
 required={true}
 />

Accepted Props :
label 			//text set for label
onChange 		//callback function returns onChange event
readOnly		//boolean for make input box only for read
Inline			//boolean for making input box inline or not
labelStyle		//style object for label styling
inputStyle		//style object for input box styling
required 		//boolean for place * at side of label
disabled                      //boolean for disable the field 
