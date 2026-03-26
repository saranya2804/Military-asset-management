import React, { useState } from 'react';
import axios from 'axios';

function Purchases() {
  const [data, setData] = useState({
    assetName: '',
    type: '',
    quantity: '',
    base: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

axios.post('http://localhost:5000/api/purchases', data, {
  headers: {
    authorization: localStorage.getItem("token")
  }
})      .then(() => {
        alert("✅ Asset Added Successfully");
        setData({ assetName: '', type: '', quantity: '', base: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Asset</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        
        <input
          type="text"
          name="assetName"
          placeholder="Asset Name"
          value={data.assetName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select
          name="type"
          value={data.type}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Type</option>
          <option value="Weapon">Weapon</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Ammo">Ammo</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={data.quantity}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select
          name="base"
          value={data.base}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>

        <button type="submit" style={styles.button}>
          Add Asset
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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

export default Purchases;