// import react from 'react';

export const StringFormatter = (queryStr,queryArr) => {
    String.prototype.format = function() {
        var formatted = this;
        for( var arg in arguments ) {
          
            formatted = formatted.replace("'{" + arg + "}'", "N'"+arguments[arg].replaceAll("'","''")+"'");
        }
        return formatted;
    };

    var str = queryStr.format(...queryArr)
    return str
}

export const brTagReplacer = (str) => {
    var string = str;
    string = string.replace(/<br\s*\/?>/gi,'<br/>');
    return string;
}