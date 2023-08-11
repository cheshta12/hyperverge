import React, { useEffect, useState, Fragment } from "react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("Phone Number");
  const [addr, setAddr] = useState("Address");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
      setPhone(parseData.phone_no);
      setAddr(parseData.addr);

    } catch (err) {
      console.error(err.message);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      const body = { phone, addr, name };
      const response = await fetch(
        "http://localhost:5000/dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      console.log(parseRes)

    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      // toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard </h1>
      <h2>Welcome {name}</h2>

      <Fragment>
      <form onSubmit={onSave}>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control my-3"
        />

        <input
          type="text"
          name="address"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Save</button>
      </form>
    </Fragment>

      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
