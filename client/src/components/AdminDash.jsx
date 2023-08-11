import React, { useEffect, useState } from "react";

const AdminDash = ({ setAuth }) => {
    const [users, setUsers] = useState([]);


  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/admindash", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();

      setUsers(parseData);

    } catch (err) {
      console.error(err.message);
    }
  };


    const deleteUser = ( user ) => {
        fetch('http://localhost:5000/auth/admindash/'+ user,{
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
              console.log('Review deleted successfully');
            } else {
              throw new Error('Failed to delete review');
            }
          })
          .catch((error) => {
            console.error('Delete review error:', error.message);
          });
    }

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div align="center">
      <h1 className="mt-5">Dashboard </h1>
      <h2>Welcome Admin</h2>

        <h3>List of Users Registered</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_name}</td>
              <td>{user.user_email}</td>
              <td>{user.phone_no}</td>
              <td>{user.addr}</td>
              <td>
                <button onClick={() => 
                    {deleteUser(user.user_id);
                    refreshPage();
                    }} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default AdminDash;
