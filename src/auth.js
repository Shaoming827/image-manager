import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MD5 } from "crypto-js";
import Dashboard from "./dashboard";

export default function AuthForm(props) {
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e;
    setPassword(enteredPassword);
    const md5Hash = MD5(enteredPassword).toString();
    setHashedPassword(md5Hash);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const baseURL = 'https://zg48d06yji.execute-api.us-east-2.amazonaws.com/awsAvenger';

    try {
      if (authMode === "signin") {
        const response = await axios.post(baseURL+`/signin`, {
              "email": email,
              "password": hashedPassword,
            }
        );
        // Handle the response accordingly
        if (response.status === 200) {
          // Navigate to the dashboard page
          //navigate("/dashboard");
           //console.log(response.data[0]);
          
          navigate('/dashboard?param=' + response.data.userid);
        } else {
          setError("Invalid email or password");
        }
      } else {
        const { v4: uuidv4 } = require('uuid');
        const bucketfolder = uuidv4();
        console.log(bucketfolder);
        const response = await axios.post(baseURL+'/user', {
          "email": email,
          "firstname": firstName,
          "lastname": lastName,
          "password": hashedPassword,
          "bucketfolder": bucketfolder}
        );

        // Handle the response accordingly
        if (response.status === 200) {
          // Navigate to the dashboard page
          
          // console.log(response.data.userid);
          //navigate("/dashboard");
          
          navigate('/dashboard?param=' + response.data.userid);
        } else {
          setError("Signup failed. Please try again.");
        }
      }

      // Clear form inputs and any error messages
      setEmail("");
      setPassword("");
      setHashedPassword("");
      setFirstName("");
      setLastName("");
      setError("");
    } catch (error) {
      setError("Authentication failed. Please try again.");
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {authMode === "signin" ? "Sign In" : "Sign Up"}
          </h3>
          <div className="text-center">
            {authMode === "signin" ? (
              <p>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </p>
            )}
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g. Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
          {error && <p className="text-center mt-2">{error}</p>}
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
