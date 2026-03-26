import React, { useState } from 'react';
import axios from 'axios';

function Transfers() {
  const [data, setData] = useState({
    assetName: '',
    fromBase: '',
    toBase: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/transfers', data, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(() => alert("✅ Transfer Successful"))
    .catch(err => {
      console.log(err);
      alert("❌ Transfer Failed");
    });
  };

  return (
    <div style={styles.container}>
      <h2>Transfer Assets</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input name="assetName" placeholder="Asset Name" onChange={handleChange} style={styles.input} required />

        <select name="fromBase" onChange={handleChange} style={styles.input} required>
          <option value="">From Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>

        <select name="toBase" onChange={handleChange} style={styles.input} required>
          <option value="">To Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>

        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} style={styles.input} required />

        <button style={styles.button}>Transfer</button>

      </form>
    </div>
  );
}

const styles = {
  container: { width: "350px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "10px 0", padding: "10px" },
  button: { padding: "10px", background: "green", color: "white" }
};

export default Transfers;