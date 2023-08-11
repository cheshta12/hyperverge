import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px"
  };
  const buttonStyle = {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    cursor: "pointer"
  };
  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className="form-control my-3"
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className="form-control my-3"
          style={inputStyle}
        />
        <button className="btn btn-success btn-block " style={buttonStyle}>Submit</button>
      </form>
      <ul> Dont have an account yet? <Link to="/register">Register</Link></ul>
      <ul>
        Login as <Link to="/adminlogin">Admin</Link>
      </ul>
    </Fragment>
  );
};

export default Login;
