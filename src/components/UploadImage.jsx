// import React, { useState } from 'react';
// import { TextField, Button, Box } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const UploadImage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [uploadedImageId, setUploadedImageId] = useState(null);
//   const [userID, setUserID] = useState(null);
//   const [imageName, setImageName] = useState(null);
//   const [uploadContent, setUploadContent] = useState('Choose Image');

//   const handleImageChange = (event) => {
//     //console.log(event.target.files);
//     let file = event.target.files[0];
//     let reader = new FileReader();
//     setImageName(file.name);
//     reader.onloadend = ()=>setSelectedImage(reader.result);
//     reader.readAsDataURL(file);
//     setUploadContent("Uploaded");
//   };
//   const handleUserInputChange = (e) => {
//     setUserID(e.target.value);
//   };

//   const handleImageUpload = async () => {
//     // console.log(selectedImage);
//     // console.log(userID);
//     if (!selectedImage|| !userID) return;

//     // console.log(selectedImage);
//     const parsed_image_encoding = selectedImage.split(',');
//     // console.log("image name:" + imageName +", image encoding: " + parsed_image_encoding[1]);
   
//     try {
//       const url = `https://project-02-server-shaomingxu.cs-310-spring-2023.repl.co/image/${userID}`;
//       const data = {
//         assetname: imageName,
//         data: parsed_image_encoding[1]
//       }
//       const body = JSON.stringify(data);
//       console.log(body);
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body:body
//       })

//       const response_array = await response.data;
//       console.log("Get response");
//       console.log(response);
//       const message = response.message;
//       const assetid = response.assetid;
//       if (message === 'success') {
//         setUploadedImageId(assetid);
//         console.log('Image uploaded successfully!');
//       } else {
//         console.log('Image upload failed.');
//       }
//     } catch (error) {
//       console.log('Error occurred while uploading image:', error);
//     }
//   };
  
//   return (
//     <div>
//       <label htmlFor="upload-button">
//         <Button variant="outlined" component="span" style={{ display: 'block', width: '100%', height: '20em', marginBottom: '10px' }}>
//           <CloudUploadIcon style={{ marginRight: '8px', width: '100%', height: '70%'}} />
//           <p id="image-content" style={{ 'text-align': 'center' }}>{uploadContent}</p>
//         </Button>
//         <input type="file" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" id="upload-button" />
//       </label>
     
//       <Box display="flex" alignItems="center" width="100%">
//         <TextField
//           type="text"
//           value={userID}
//           onChange={handleUserInputChange}
//           placeholder="Enter User ID"
//           variant="outlined"
//           style={{ marginRight: '10px', flexGrow: 1 }}
//         />
//         <Button variant="contained" color="primary" onClick={handleImageUpload}>
//           Upload Image
//         </Button>
//       </Box>
      
//       {uploadedImageId && <p>Uploaded Image ID: {uploadedImageId}</p>}
//     </div>
//   );
// };

// export default UploadImage;

import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [userID, setUserID] = useState('');
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    
    reader.onloadend = () => {
      setImageName(file.name);
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUserInputChange = (e) => {
    setUserID(e.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !userID) return;

    const parsedImageEncoding = selectedImage.split(',');

    try {
      const url = `https://project-02-server-zeratul1215.cs-310-spring-2023.repl.co/image/${userID}`;
      const data = {
        assetname: imageName,
        data: parsedImageEncoding[1]
      };
     
      const body = JSON.stringify(data);
      console.log(body);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      });

      const responseData = await response.json();
      const message = responseData.message;
      const assetid = responseData.assetid;

      if (message === 'success') {
        setUploadedImageId(assetid);
        console.log('Image uploaded successfully!');
      } else {
        console.log('Image upload failed.');
      }
    } catch (error) {
      console.log('Error occurred while uploading image:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button variant="outlined" onClick={handleUploadClick}>
        <CloudUploadIcon style={{ marginRight: '8px' }} />
        Choose Image
      </Button>
      {selectedImage && (
        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />
      )}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          type="text"
          value={userID}
          onChange={handleUserInputChange}
          label="User ID"
          variant="outlined"
          sx={{ width: '80%' }}
        />
        <Button variant="contained" color="primary" onClick={handleImageUpload} sx={{ width: '20%' }}>
          Upload Image
        </Button>
      </Box>
      {uploadedImageId && (
        <Typography variant="body1" color="success" sx={{ marginTop: '10px', width: '100%' }}>
          Uploaded Image ID: {uploadedImageId}
        </Typography>
      )}
    </Box>
  );
};

export default UploadImage;
