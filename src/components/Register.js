import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://military-backend-qoa1.onrender.com/api/auth/register', data).then(() => {
        alert("✅ Registered Successfully");
        navigate("/login");
      }).catch(err => {
        console.log(err);
        alert("❌ Registration Failed");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

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

        <select
          name="role"
          value={data.role}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Logistics">Logistics</option>
          <option value="Commander">Commander</option>
        </select>

        <button type="submit" style={styles.button}>
          Register
        </button>
        <p style={{ marginTop: "10px" }}>
          Already have an account? <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</p>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
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

export default Register;