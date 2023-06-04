import React, { useState } from 'react';
import './Tables.css';

const Users = (input) => {
  
  const user_data = input.input;
  return (
    <div className='table-container'>
          
          {user_data && 
              <table className="table">
                <thead>
                  <tr>
                    <th>userid</th>
                    <th>email</th>
                    <th>lastname</th>
                    <th>firstname</th>
                    <th>bucketfolder</th>
                  </tr>
                </thead>
                <tbody>
                  {user_data.map((user, index) => (
                      <tr key={index}>
                        <td>{user.userid}</td>
                          <td>{user.email}</td>
                          <td>{user.lastname}</td>
                          <td>{user.firstname}</td>
                          <td>{user.bucketfolder}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
    }

    </div>
   
  );
};

export default Users;
