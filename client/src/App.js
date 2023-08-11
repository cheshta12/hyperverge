import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

//components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDash from "./components/AdminDash";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };


  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route 
            path = ""
            element= {<Home/>}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
            <Route
              path="/adminlogin"
              element={!isAuthenticated ? <AdminLogin setAuth={setAuth} /> : <Navigate to="/admindash" />}
            />
            <Route
              path="/admindash"
              element={isAuthenticated ? <AdminDash setAuth={setAuth} /> : <Navigate to="/adminlogin" />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
