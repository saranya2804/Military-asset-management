import React, { useState } from 'react';
import axios from 'axios';

function Assignments() {
  const [data, setData] = useState({
    assetName: '',
    assignedTo: '',
    quantity: '',
    base: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/assignments', data, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(() => alert("✅ Assigned Successfully"))
    .catch(err => {
      console.log(err);
      alert("❌ Assignment Failed");
    });
  };

  return (
    <div style={styles.container}>
      <h2>Assign Assets</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input name="assetName" placeholder="Asset Name" onChange={handleChange} style={styles.input} required />

        <input name="assignedTo" placeholder="Assigned To (Soldier/Unit)" onChange={handleChange} style={styles.input} required />

        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} style={styles.input} required />

        <select name="base" onChange={handleChange} style={styles.input} required>
          <option value="">Select Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>

        <button style={styles.button}>Assign</button>

      </form>
    </div>
  );
}

const styles = {
  container: { width: "350px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", background: "orange", color: "white" }
};

export default Assignments;