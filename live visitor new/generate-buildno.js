var fs = require('fs');
fs.readFile('src/buildNumber.json',function(err,content) {
    if (err) throw err;
    var metadata = JSON.parse(content);
    var CurrDate = new Date();
    var CurrYear = CurrDate.getFullYear().toString().slice(-2);
    if (CurrYear < 10)CurrYear = '0' + CurrYear;
    var CurrMonth = CurrDate.getMonth()+1;
    if (CurrMonth < 10)CurrMonth = '0' + CurrMonth;
    var CurrDay = CurrDate.getDate();
    if (CurrDay < 10)CurrDay = '0' + CurrDay;
    var buildNumber = metadata.buildNumber.split(".");
    if (CurrYear== buildNumber[0].slice(0,2) && CurrMonth == buildNumber[0].slice(2,4) && CurrDay == buildNumber[1]){
        buildNumber[2] = parseInt(buildNumber[2]) + 1;
        if (buildNumber[2] < 10)buildNumber[2] = '0' +buildNumber[2];
        metadata.buildNumber = buildNumber[0]+"."+buildNumber[1]+"."+buildNumber[2]
    }else{
        buildNumber[0] = CurrYear+CurrMonth;
        buildNumber[1] = CurrDay;
        buildNumber[2] = 1;
        if (buildNumber[2] < 10)buildNumber[2] = '0' +buildNumber[2];
        metadata.buildNumber = buildNumber[0]+"."+buildNumber[1]+"."+buildNumber[2]
    }
    fs.writeFile('src/buildNumber.json',JSON.stringify(metadata),function(err){
        if (err) throw err;
        console.log(`Current build number: ${metadata.buildNumber}`);
    })
});