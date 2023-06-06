import React, { useState } from 'react';
import { Container, Grid, Paper, Button, TableContainer } from '@mui/material';
import { styled } from '@mui/system';
import UploadImage from './components/UploadImage';
import Stats from './components/Stats';
import Assets from './components/Assets';
import Users from './components/Users';
import Bucket from './components/Bucket';
import Download from './components/Download';
import Nearby from './components/Nearby';

const DashboardContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DashboardButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2196f3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
}));

const DashboardTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Dashboard = () => {
 
  const [stats, setStats] = useState(null);
  const [user_data, setUserData] = useState(null);
  const [asset_data, setAssetData] = useState(null);
  const [bucket, setBucket] = useState(null);
  const baseURL = 'https://project-02-server-zeratul1215.cs-310-spring-2023.repl.co'; 

  const handleClick = async () => {
   
    try {
     
      //overall info
      const overall_info = baseURL + '/stats'; 
      const response = await fetch(overall_info);
      const data = await response.json();
      setStats(data);
      console.log("Overall info complete");
      //get user 
      const get_users = baseURL + '/users'; 
      const get_users_response = await fetch(get_users);
      const get_users_data = await get_users_response.json();
      const users_list = get_users_data.data;
      setUserData(users_list);
      console.log("User complete");
      //get assets
      const get_asset = baseURL + '/assets'; 
      const get_asset_response = await fetch(get_asset);
      const assets_data = await get_asset_response.json();
      setAssetData(assets_data);
      console.log("Asset info complete");
      //get Buckets
      const get_buckets = baseURL + '/bucket'; 
      const get_buckets_response = await fetch(get_buckets);
      const get_buckets_data = await get_buckets_response.json();
      setBucket(get_buckets_data);
      console.log("Bucket complete");
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <DashboardContainer maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DashboardPaper>
            <h1>Welcome to your Image Manager</h1>
            <DashboardButton variant="contained" onClick={handleClick}>Update</DashboardButton>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12}>
          <DashboardPaper>
            <h1>Search nearby Image</h1>
            <Nearby></Nearby>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12}>
          <DashboardPaper>
            <h1>Upload Image</h1>
            <UploadImage></UploadImage>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12}>
          <DashboardPaper>
            <h1>Download Image and Preivew</h1>
            <Download api={baseURL}></Download>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <h2>Users Information</h2>
            <Users className=".dashboard-container" input = {user_data}></Users>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardPaper>
            <h2>Assets Information</h2>
            <Assets input ={asset_data}></Assets>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardPaper>
            <h2>Overall Information</h2>
            <Stats input={stats}></Stats>
          </DashboardPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <DashboardPaper>
            <h2>Bucket Information</h2>
            <Bucket input={bucket}></Bucket>
          </DashboardPaper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
