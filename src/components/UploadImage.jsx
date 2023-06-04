import React, { useState } from 'react';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [userID, setUserID] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    setImageName(file.name);
    reader.onloadend = ()=>setSelectedImage(reader.result);
    reader.readAsDataURL(file);
  };
  const handleUserInputChange = (e) => {
    setUserID(e.target.value);
  };

  const handleImageUpload = async () => {
    // console.log(selectedImage);
    // console.log(userID);
    if (!selectedImage|| !userID) return;

    // console.log(selectedImage);
    const parsed_image_encoding = selectedImage.split(',');
    // console.log("image name:" + imageName +", image encoding: " + parsed_image_encoding[1]);
   
    try {
      const url = `https://project-02-server-shaomingxu.cs-310-spring-2023.repl.co/image/${userID}`;
      const data = {
        assetname: imageName,
        data: parsed_image_encoding[1]
      }
      const body = JSON.stringify(data);
      console.log(body);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:body
      })

      const response_array = await response.data;
      console.log("Get response");
      console.log(response);
      const message = response.message;
      const assetid = response.assetid;
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
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="text" value={userID} onChange={handleUserInputChange} placeholder="Enter User ID" />
      <button onClick={handleImageUpload}>Upload Image</button>
      {uploadedImageId && <p>Uploaded Image ID: {uploadedImageId}</p>}
    </div>
  );
};

export default UploadImage;
