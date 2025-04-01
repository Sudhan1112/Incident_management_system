import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "./firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null);
  const [formData, setFormData] = useState({
    time_date: "",
    building: "",
    primary_category: "",
    incident_category: "",
    secondary_category: "",
    severity: "",
    incident_level: "",
    probability: "",
    description: ""
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        console.log("File available at", url);
      }
    );
  };

  const fetchIncidents = async () => {
    try {
      const res = await axios.get("http://localhost:3500/incidents");
      setIncidents(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      time_date: "",
      building: "",
      primary_category: "",
      incident_category: "",
      secondary_category: "",
      severity: "",
      incident_level: "",
      probability: "",
      description: ""
    });
    setDownloadURL("");
    setFile(null);
    setProgress(0);
  };

  const addIncident = async () => {
    try {
      const data = {
        id: uuidv4(),
        time_date: formData.time_date || new Date().toISOString().slice(0, 16).replace('T', ' '),
        building: formData.building,
        primary_category: formData.primary_category,
        incident_category: formData.incident_category,
        secondary_category: formData.secondary_category,
        severity: formData.severity,
        incident_level: formData.incident_level,
        probability: formData.probability,
        description: formData.description,
        incident_url: downloadURL
      };

      const res = await axios.post("http://localhost:3500/incidents", data, {
        headers: { "Content-Type": "application/json" }
      });

      setIncidents([...incidents, data]);
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const deleteIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/incidents/${id}`);
      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  const prepareForUpdate = (incident) => {
    setCurrentIncident(incident);
    setFormData({
      time_date: incident.time_date,
      building: incident.building,
      primary_category: incident.primary_category,
      incident_category: incident.incident_category,
      secondary_category: incident.secondary_category,
      severity: incident.severity,
      incident_level: incident.incident_level,
      probability: incident.probability,
      description: incident.description
    });
    setDownloadURL(incident.incident_url);
    setShowUpdateForm(true);
  };

  const updateIncident = async () => {
    if (!currentIncident) return;

    try {
      const updatedData = {
        time_date: formData.time_date,
        building: formData.building,
        primary_category: formData.primary_category,
        incident_category: formData.incident_category,
        secondary_category: formData.secondary_category,
        severity: formData.severity,
        incident_level: formData.incident_level,
        probability: formData.probability,
        description: formData.description,
        incident_url: downloadURL || currentIncident.incident_url
      };

      const res = await axios.put(`http://localhost:3500/incidents/${currentIncident.id}`, updatedData, {
        headers: { "Content-Type": "application/json" }
      });

      setIncidents(
        incidents.map((incident) =>
          incident.id === currentIncident.id ? { ...incident, ...updatedData } : incident
        )
      );

      resetForm();
      setCurrentIncident(null);
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating incident:", error);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9"
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "5px"
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336"
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2196F3"
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Incident Management System</h1>
      
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <button 
          style={buttonStyle} 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add New Incident"}
        </button>
        <button style={buttonStyle} onClick={fetchIncidents}>Refresh Incidents</button>
      </div>

      {showForm && (
        <div style={formStyle}>
          <h2>Add New Incident</h2>
          
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="time_date"
            value={formData.time_date}
            onChange={handleInputChange}
            style={inputStyle}
          />
          
          <label>Building:</label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="e.g. Building A"
          />
          
          <label>Primary Category:</label>
          <select
            name="primary_category"
            value={formData.primary_category}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Security">Security</option>
            <option value="Safety">Safety</option>
            <option value="Environmental">Environmental</option>
          </select>
          
          <label>Incident Category:</label>
          <input
            type="text"
            name="incident_category"
            value={formData.incident_category}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="e.g. Electrical Fire"
          />
          
          <label>Secondary Category:</label>
          <input
            type="text"
            name="secondary_category"
            value={formData.secondary_category}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="e.g. Short Circuit"
          />
          
          <label>Severity:</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          
          <label>Incident Level:</label>
          <select
            name="incident_level"
            value={formData.incident_level}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Level</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
          
          <label>Probability:</label>
          <select
            name="probability"
            value={formData.probability}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Probability</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Possible">Possible</option>
            <option value="Likely">Likely</option>
            <option value="Very Likely">Very Likely</option>
          </select>
          
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ ...inputStyle, minHeight: "100px" }}
            placeholder="Enter detailed description of the incident"
          />
          
          <div>
            <label>Upload Image:</label>
            <input type="file" onChange={handleFileChange} />
            <button 
              style={{ ...buttonStyle, backgroundColor: "#ff9800" }} 
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <p>Upload Progress: {progress}%</p>
            {downloadURL && (
              <div>
                <p>Image Preview:</p>
                <img src={downloadURL} alt="Incident" style={{ maxWidth: "200px", maxHeight: "200px" }} />
              </div>
            )}
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button style={buttonStyle} onClick={addIncident}>Submit Incident</button>
            <button 
              style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333" }} 
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showUpdateForm && currentIncident && (
        <div style={formStyle}>
          <h2>Update Incident</h2>
          
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="time_date"
            value={formData.time_date}
            onChange={handleInputChange}
            style={inputStyle}
          />
          
          <label>Building:</label>
          <input
            type="text"
            name="building"
            value={formData.building}
            onChange={handleInputChange}
            style={inputStyle}
          />
          
          <label>Primary Category:</label>
          <select
            name="primary_category"
            value={formData.primary_category}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Security">Security</option>
            <option value="Safety">Safety</option>
            <option value="Environmental">Environmental</option>
          </select>
          
          <label>Incident Category:</label>
          <input
            type="text"
            name="incident_category"
            value={formData.incident_category}
            onChange={handleInputChange}
            style={inputStyle}
          />
          
          <label>Secondary Category:</label>
          <input
            type="text"
            name="secondary_category"
            value={formData.secondary_category}
            onChange={handleInputChange}
            style={inputStyle}
          />
          
          <label>Severity:</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          
          <label>Incident Level:</label>
          <select
            name="incident_level"
            value={formData.incident_level}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Level</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
          
          <label>Probability:</label>
          <select
            name="probability"
            value={formData.probability}
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="">Select Probability</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Possible">Possible</option>
            <option value="Likely">Likely</option>
            <option value="Very Likely">Very Likely</option>
          </select>
          
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            style={{ ...inputStyle, minHeight: "100px" }}
          />
          
          <div>
            <label>Current Image:</label>
            {downloadURL && <img src={downloadURL} alt="Incident" style={{ maxWidth: "200px", maxHeight: "200px" }} />}
            <label>Upload New Image (optional):</label>
            <input type="file" onChange={handleFileChange} />
            <button 
              style={{ ...buttonStyle, backgroundColor: "#ff9800" }} 
              onClick={handleUpload}
            >
              Upload New Image
            </button>
            {progress > 0 && <p>Upload Progress: {progress}%</p>}
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button style={updateButtonStyle} onClick={updateIncident}>Update Incident</button>
            <button 
              style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333" }} 
              onClick={() => {
                resetForm();
                setCurrentIncident(null);
                setShowUpdateForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2 style={{ textAlign: "center", marginTop: "30px" }}>Incident List</h2>
      <div style={{ 
        overflow: "auto", 
        height: "600px", 
        display: "flex", 
        flexDirection: "column",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "0 20px"
      }}>
        {incidents.length === 0 ? (
          <p style={{ textAlign: "center" }}>No incidents found. Add a new incident to get started.</p>
        ) : (
          incidents.map((incident, index) => (
            <div key={index} style={{ 
              border: "1px solid #ddd", 
              borderRadius: "5px",
              padding: "15px", 
              marginBottom: "15px",
              backgroundColor: "#000000",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: "1" }}>
                  <h3 style={{ marginTop: 0 }}>Incident on {incident.time_date}</h3>
                  <p><strong>Building:</strong> {incident.building}</p>
                  <p><strong>Category:</strong> {incident.primary_category} &gt; {incident.incident_category} &gt; {incident.secondary_category}</p>
                  <p><strong>Severity:</strong> <span style={{
                    padding: "3px 8px",
                    borderRadius: "3px",
                    backgroundColor: 
                      incident.severity === "Low" ? "#c8e6c9" :
                      incident.severity === "Medium" ? "#fff9c4" :
                      incident.severity === "High" ? "#ffccbc" : "#ffebee",
                    color: 
                      incident.severity === "Low" ? "#1b5e20" :
                      incident.severity === "Medium" ? "#f57f17" :
                      incident.severity === "High" ? "#bf360c" : "#b71c1c"
                  }}>{incident.severity}</span></p>
                  <p><strong>Incident Level:</strong> {incident.incident_level}</p>
                  <p><strong>Probability:</strong> {incident.probability}</p>
                  <p><strong>Description:</strong> {incident.description}</p>
                </div>
                
                {incident.incident_url && (
                  <div style={{ marginLeft: "20px" }}>
                    <img 
                      src={incident.incident_url} 
                      style={{ 
                        maxHeight: "150px", 
                        maxWidth: "150px", 
                        objectFit: "cover",
                        border: "1px solid #ddd",
                        borderRadius: "4px"
                      }} 
                      alt="Incident" 
                    />
                  </div>
                )}
              </div>
              
              <div style={{ marginTop: "15px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button 
                  style={updateButtonStyle} 
                  onClick={() => prepareForUpdate(incident)}
                >
                  Edit
                </button>
                <button 
                  style={deleteButtonStyle} 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this incident?")) {
                      deleteIncident(incident.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;