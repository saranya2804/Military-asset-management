import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('https://military-backend-qoa1.onrender.com/api/auth/login', data).then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert("✅ Login Successful");
        navigate("/dashboard"); // redirect
      }).catch(err => {
        console.log(err);
        alert("❌ Invalid Credentials");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "100px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Login;