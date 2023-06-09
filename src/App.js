import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth"
import Dashboard from "./dashboard";
import React, { useState } from 'react';

function App() {
  const [userid, setUserId] = useState(''); 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth setter={setUserId} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App