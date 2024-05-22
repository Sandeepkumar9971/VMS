import moment from 'moment'
function TimeFormatter(inputTime) {

    var time = inputTime
    console.log(time)
    var userFullDate = time.split(" ")[0];
    var userSplitedDate = userFullDate.split('-')
    console.log(userFullDate)
    // let only_date = logTime[0];
    // var logTimeDate = logTime[0].split('-');
    // console.log(logTimeDate[2])
    var logTime = moment(time, "yyyy-MM-dd HH:mm:ss").format(`lll`)
    var logTimeWithDayname = moment(time, "YYYY-MM-DD HH:mm:ss").format(`ddd`)
    const logTimeWithFullMonthName = () => {
        var logTimeWithFullMonthName = moment(time, "YYYY-MM-DD HH:mm:ss").format(`LL`)
        return (logTimeWithFullMonthName.split(' ')[0])
    }

    // converting time into (dd MonthName) format
    console.log(logTime)
    var userMonth = logTime.split(',')[0].split(' ')[0]
    var userTime = logTime.split(',')[1].split(' ')[2] + " " + logTime.split(',')[1].split(' ')[3]
    // userDate = logTimeDate[2]
    console.log(userMonth)
    console.log(userTime)
    // getting Current Day Date
    let date_ob = new Date();
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    const t = year + "-" + month + "-" + date
    console.log(t)
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var curDayName = days[new Date().getDay()];
    console.log(logTimeWithDayname)
    userSplitedDate.push(logTimeWithDayname)
    console.log(
        date = {
            CurDayName: curDayName,
            CurDate: t,
            CurDateInTwoDigit: date,
            ShiftDate: userFullDate,
            ShiftMonth: userMonth,
            shiftFullMonth: logTimeWithFullMonthName(),
            ShiftTime: userTime,
            CurMonth: month,
            // CurDate : date,
            CurYear: year,
            userSplitedDate: userSplitedDate
        }
    )
    return (
        date = {
            CurDate: t,
            ShiftDate: userFullDate,
            ShiftMonth: userMonth,
            shiftFullMonth: logTimeWithFullMonthName(),
            ShiftTime: userTime,
            CurMonth: month,
            CurDateInTwoDigit: date,
            CurYear: year,
            userSplitedDate: userSplitedDate
        }
    )
}

export default TimeFormatter


export const TimeFormatterV2 = (date, inputFormat, outputFormat) => {
    let possibleOutputFormats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'HH:mm:ss', 'YYYY', 'DDDD', 'DD', 'dddd', 'ddd', 'MMMM', 'MM', 'shiftdayid']
    let possibleInputFormats = ['fulldate', 'dateonly', 'shiftdayid']
    let isInputFormatValid = false
    let isOutputFormatValid = false
    for (let i = 0; i < possibleOutputFormats.length; i++) {
        for (let j = 0; j < possibleInputFormats.length; j++) {
            if (inputFormat === possibleInputFormats[j]) {
                isInputFormatValid = true
                if (outputFormat === possibleOutputFormats[i]) {
                    isOutputFormatValid = true
                }
            }
        }
    }
    if (isInputFormatValid) {
        if (inputFormat === 'fulldate' || inputFormat === 'dateonly') {
            if (isOutputFormatValid) {
                if (outputFormat == 'shiftdayid') {
                    let yy = moment(date).format('YYYY').slice(-2)
                    let mm = moment(date).format('MM')
                    let dd = moment(date).format('DD')
                    let shiftdayid = `${yy}${mm}${dd}`
                    return shiftdayid
                } else {
                    return moment(date).format(outputFormat)
                }
            } else {
                throw 'Invalid Output Format'
            }
        } else if (inputFormat === 'shiftdayid') {
            if (isOutputFormatValid) {
                if (date.length == 6) {
                    if (outputFormat == 'shiftdayid') {
                        return date
                    } else {
                        let yyyy = '20' + date.slice(0, 2)
                        let mm = date.slice(2, 4)
                        let dd = date.slice(4, 6)
                        let newDate = `${yyyy}-${mm}-${dd}`
                        return moment(newDate).format(outputFormat)
                    }
                } else {
                    throw 'Invalid shiftdayid passed'
                }
            } else {
                throw 'Invalid Output Format'
            }
        }
    } else {
        throw 'Invalid Input Format'
    }
}