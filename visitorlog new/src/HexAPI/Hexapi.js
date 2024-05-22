import axios from 'axios'
import { StringFormatter } from './StringFormatter';
import {Aesdecryption,Aesencryption} from '../Aes/Aes'

const Hexapi = (props) => new Promise((resolve,reject) => {
    let fd = new FormData();
    var formattedQueryString = StringFormatter(props.query, props.queryArr)
    console.log(formattedQueryString)
    fd.append(Aesencryption("Query"),Aesencryption(formattedQueryString))
    if(props.file != undefined){
        fd.append('file',props.file)
    }
    axios({
        mode: 'cors',
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        url: `${sessionStorage.getItem('Apipathurl')}fetchrsdataV3.php`,
        data: fd
    }).then(resp => {
        // console.log(resp.data)
        let decrypted = Aesdecryption(resp.data)
        if(JSON.parse(decrypted)){
            resolve(JSON.parse(decrypted))
        }else{
            reject('not get any response')
        }
    }).catch(err => console.error(`axios error in query : ${props.query}`,err))
})

export default Hexapi;