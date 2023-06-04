
import React, { useState } from 'react';
import './Tables.css';

const Assets = (input) => {
  const assets_data = input.input && input.input.data;
  return (
    <div className='table-container'>
          
          {assets_data && 
              <table className="table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>User ID</th>
                    <th>Asset Name</th>
                    <th>Bucket Name</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {assets_data.map((asset, index) => (
                      <tr key={index}>
                        <td>{asset.assetid}</td>
                          <td>{asset.userid}</td>
                          <td>{asset.assetname}</td>
                          <td>{asset.bucketkey}</td>
                          
                      </tr>
                    ))}
                </tbody>
              </table>
    }

    </div>
   
  );
};

export default Assets;
