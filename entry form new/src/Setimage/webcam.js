import Webcam from 'react-webcam';
import { useRef ,useState,useCallback} from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';


function Webcamera(props) {

const webcamRef = useRef(null);
const [imgSrc, setImgSrc] = useState(null);

const capture = useCallback(() => {
  const imageSrc = webcamRef.current.getScreenshot();
  setImgSrc(imageSrc);
  console.log(imageSrc)

  props.imageurl64(imageSrc)

}, [webcamRef, setImgSrc]);


return (
  <>

<div style={{display:"flex",justifyContent:"space-between",padding:"10px 0px",alignItems:"center"}}>
                            <CameraAltIcon onClick={capture} style={{cursor:"pointer"}}/>
                            <ClearIcon onClick={props.closecameramodal} style={{cursor:"pointer"}}/>
                            </div>
 
  
    <Webcam     
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      height={250}
      screenshotQuality={1}
      imageSmoothing={false}
      width={330}
    />
  

    {/* <button onClick={capture}>Capture photo</button> */}
    {/* {imgSrc && (
      <img
        src={imgSrc}
      />
    )} */}
  </>
);
};


export default Webcamera;
