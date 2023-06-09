import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Container, Grid, Paper, Button, TableContainer,Box, IconButton  } from '@mui/material';
import { styled } from '@mui/system';

function Nearby() {
  const [description, setDescription] = useState('2440 173rd Street, Hammond');
  const [dist, setDist] = useState('1000');
  const [pics, setPics] = useState([]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDistChange = (event) => {
    setDist(event.target.value);
  };
  
  const handleSubmit = async () => {
    try {
      const url = `https://zg48d06yji.execute-api.us-east-2.amazonaws.com/awsAvenger/nearpic/${encodeURIComponent(description)}/${encodeURIComponent(dist)}`;
      const response = await fetch(url);
      const data = await response.json();
      const status = data.message;
      const pics = data.Pic;
      if (status !== "success") {
        setPics(["Error: something wrong!"]);
      } else {
        const pic_url = []
        pics.map((pic) => (
           pic_url.push(`data:image/*;base64,${pic}`)
        ))
        setPics(pic_url);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? pics.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === pics.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      <label htmlFor="description">Description: </label>
      <input type="text" id="description" value={description} onChange={handleDescriptionChange} />
      <br />
      <label htmlFor="dist">Distance: </label>
      <input type="text" id="dist" value={dist} onChange={handleDistChange} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {console.log("Success response")}
      {pics.length == 0 && (
        <p>Nothing Found</p>
      )}
      {pics.length > 0 && (
        <div sx={{display:'block'}}> 
       <Box sx={{display:'flex', alignItems: 'center'}}>
          <IconButton onClick={handlePrev} sx={{ 
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              flexGrow: 2}}>
            <ArrowBack />
          </IconButton>
        <Carousel
          selectedItem={activeIndex}
          onChange={setActiveIndex}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          sx = {{flexGrow:4}}
        >
         
          {pics.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
         
        </Carousel>
        <IconButton onClick={handleNext} sx={{ 
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            flexGrow: 2}}>
          <ArrowForward />
        </IconButton>
     </Box>
     </div>
     
      
        
      )}
      
      
    </div>);

  
}

export default Nearby;
