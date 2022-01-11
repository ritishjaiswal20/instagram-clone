// import { Button } from '@material-ui/core';
// import React, { useState } from 'react'
// import { getStorage, ref } from "firebase/storage";

// function ImageUpload() {
//    const [image, setImage]=useState(null);
//    const[progress,setProgress] = useState(0);
//    const [caption,setCaption]=useState('');
//    const storage = getStorage();
//    const handleChange= (e) =>{
//        if(e.target.files[0]){
//            setImage(e.target.files[0]);
//        }
//    };
//    const handleUpload=()=>{
//         const uploadTask=storage.ref(`images/${image.name}`.put(image));

//     }
//    return (
//         <div>
//            <input type="text" placeholder="enter a caption"onChange={event=>setCaption(event.target.value)}  value="caption"/>
//            <input type="file" onChange={handleChange} />
//            <Button onClick={handleUpload}>
//               UPLOAD
//            </Button>
//         </div>
//     )
// }

// export default ImageUpload
