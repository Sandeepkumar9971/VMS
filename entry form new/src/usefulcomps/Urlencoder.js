import React from 'react';

const Urlencoder = (url) => {
    var newUrl = url.split('?')
    const decodedParams = atob(newUrl[1])
    console.log(decodedParams)
    // const decodedParams = 'id=18'
    console.log(decodedParams)
    var obj = {}
    if(decodedParams.includes('&')){
        var arr = decodedParams.split('&')
        for(var i=0;i<arr.length;i++){
            var paramsArr = arr[i].split('=')
            var newkey = paramsArr[0]
            var value = paramsArr[1]
            obj[newkey] = value
        }
    }else{
        // var arr = decodedParams
        var paramsArr = decodedParams.split('=')
        var newkey = paramsArr[0]
        var value = paramsArr[1]
        obj[newkey] = value
    }
    console.log(obj)
    return obj
    // if(arr)
//   return <div></div>;
};

export default Urlencoder;
