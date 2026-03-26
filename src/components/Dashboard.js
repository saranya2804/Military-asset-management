import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Purchases from './Purchases';
import Transfers from './Transfers';
import Assignments from './Assignments';

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [filterBase, setFilterBase] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");

  // Fetch assets
  useEffect(() => {
    axios.get('https://military-backend-qoa1.onrender.com/api/purchases', {
      headers: {
        authorization: localStorage.getItem("token")
      }
    }).then(res => {
        setAssets(res.data);
        setLoading(false);
      }).catch(() => setLoading(false));
  }, []);

  // Filter logic
  const filteredAssets = assets.filter(a =>
    (filterBase === '' || a.base === filterBase) &&
    (filterType === '' || a.type === filterType)
  );

  const totalAssets = filteredAssets.reduce((sum, a) => sum + a.quantity, 0);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>Military Asset Dashboard</h2>
        <div>
          <span style={{ marginRight: "10px" }}>Role: {role}</span>
          <button onClick={logout} style={styles.logout}>Logout</button>
        </div>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        <button
          style={activeTab === "dashboard" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        {role === "Admin" && (
          <button
            style={activeTab === "purchases" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("purchases")}
          >
            Purchases
          </button>
        )}

        {role === "Logistics" && (
          <button
            style={activeTab === "transfers" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("transfers")}
          >
            Transfers
          </button>
        )}

        {role === "Commander" && (
          <button
            style={activeTab === "assignments" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments
          </button>
        )}
      </div>

      {/* DASHBOARD CONTENT */}
      {activeTab === "dashboard" && (
        <>
          {/* Filters */}
          <div style={styles.filters}>
            <select onChange={(e) => setFilterBase(e.target.value)} style={styles.input}>
              <option value="">All Bases</option>
              <option value="Base A">Base A</option>
              <option value="Base B">Base B</option>
            </select>

            <select onChange={(e) => setFilterType(e.target.value)} style={styles.input}>
              <option value="">All Types</option>
              <option value="Weapon">Weapon</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Ammo">Ammo</option>
            </select>
          </div>

          {/* Total */}
          <div style={styles.totalCard}>
            <p>Total Assets</p>
            <h2>{totalAssets}</h2>
          </div>

          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* Asset List */}
          <div style={styles.grid}>
            {filteredAssets.map((a, i) => (
              <div
                key={i}
                onClick={() => setSelectedAsset(a)}
                style={styles.card}
              >
                <h3>{a.assetName}</h3>
                <p>{a.type}</p>
                <p>{a.base}</p>
                <strong>{a.quantity}</strong>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ROLE-BASED COMPONENTS */}
      {activeTab === "purchases" && role === "Admin" && <Purchases />}
      {activeTab === "transfers" && role === "Logistics" && <Transfers />}
      {activeTab === "assignments" && role === "Commander" && <Assignments />}

      {/* POPUP */}
      {selectedAsset && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{selectedAsset.assetName}</h3>
            <p>Type: {selectedAsset.type}</p>
            <p>Base: {selectedAsset.base}</p>
            <p>Quantity: {selectedAsset.quantity}</p>

            <button onClick={() => setSelectedAsset(null)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f5f5f5",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  logout: {
    padding: "6px 12px",
    background: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  tabs: {
    marginBottom: "20px"
  },

  tab: {
    padding: "8px 14px",
    marginRight: "10px",
    border: "none",
    background: "#ddd",
    borderRadius: "5px",
    cursor: "pointer"
  },

  activeTab: {
    padding: "8px 14px",
    marginRight: "10px",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  },

  filters: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px"
  },

  input: {
    padding: "8px",
    borderRadius: "5px"
  },

  totalCard: {
    background: "#007bff",
    color: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px"
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center"
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },

  modal: {
    background: "white",
    padding: "20px",
    width: "300px",
    margin: "100px auto",
    borderRadius: "8px",
    textAlign: "center"
  },

  closeBtn: {
    marginTop: "10px",
    padding: "6px 12px"
  }
};

export default Dashboard;