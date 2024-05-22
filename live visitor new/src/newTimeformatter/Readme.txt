
TimeFormatterV2
How to use :
			
import {TimeFormatterV2} from "./TimeFormatter";
 
Ex : 
TimeFormatterV2(’pass your date’,’pass your date input format’,’pass your required output format’)

Example : 
let requiredate1 = TimeFormatterV2(new Date(),'fulldate','YYYY-MM-DD HH:mm:ss');
    // output 2022-05-12 12:13:39
let requiredate2 = TimeFormatterV2('2022-05-02','dateonly','shiftdayid');
    // output 220502
let requiredate3 = TimeFormatterV2('220501','shiftdayid','YYYY-MM-DD');
    // output 2022-05-01
 

Accepted Props :
possibleOutputFormats = ['YYYY-MM-DD HH:mm:ss','YYYY-MM-DD','HH:mm:ss','YYYY','DDDD','DD',
'dddd','ddd','MMMM','MM','shiftdayid']
 
possibleInputFormats = ['fulldate','dateonly','shiftdayid']


NOTE : 
fulldate => new Date()
dateonly => ‘2022-02-02’
shiftdayid => 220304
