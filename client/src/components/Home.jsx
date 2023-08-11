import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div align="center">
          <h1>Welcome to the Home Page</h1>
          <div>
            <h2>Admin Login</h2>
            <Link to="/adminlogin">Click here to Login as Admin</Link>
          </div>
          <div>
            <h2>User Login</h2>
            <Link to="/login">Click here to Login as User</Link>
          </div>
          <div>
            <h2>User Registration</h2>
            <Link to="/register">Click here to Register as User</Link>
          </div>
        </div>
      );
}

export default Home;

