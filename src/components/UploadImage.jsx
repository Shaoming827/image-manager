import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadImage = ({userid}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [userID, setUserID] = useState('');
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef(null);
  
  
  console.log(userid);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageName(file.name);
      setSelectedImage(reader.result);
      console.log(reader.result);
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
    if (!selectedImage ) return;

    const parsedImageEncoding = selectedImage.split(',');

    try {
      const url = `https://zg48d06yji.execute-api.us-east-2.amazonaws.com/awsAvenger/image/${userid}`;
      const data = {
        assetname: imageName,
        data: parsedImageEncoding[1]
      };
      console.log(data);
      const body = JSON.stringify(data);
      //console.log(body);
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
      //console.log(responseData);
      if (message === 'success') {
        setUploadedImageId(assetid);
        alert('Image uploaded successfully!');
      } else {
        alert('Image upload failed.');
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
        {/* <TextField
          type="text"
          value={userID}
          onChange={handleUserInputChange}
          label="User ID"
          variant="outlined"
          sx={{ width: '80%' }}
        /> */}
        <Button variant="contained" color="primary" onClick={handleImageUpload} sx={{ width: '20%' }}>
          Upload Image
        </Button>
      </Box>
      {console.log(uploadedImageId)}
      {uploadedImageId && (
        <Typography variant="body1" color="success" sx={{ marginTop: '10px', width: '100%' }}>
          Uploaded Image ID: {uploadedImageId}
        </Typography>
      )}
    </Box>
  );
};

export default UploadImage;
