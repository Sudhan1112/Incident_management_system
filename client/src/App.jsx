import React, { useEffect, useState } from "react";
import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";
import IncidentController from "./controllers/IncidentController";

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
  
  const incidentController = new IncidentController(
    setIncidents,
    setFormData,
    setShowForm,
    setShowUpdateForm,
    setCurrentIncident,
    setFile,
    setProgress,
    setDownloadURL
  );

  useEffect(() => {
    incidentController.fetchIncidents();
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
    incidentController.uploadFile(file);
  };

  const handleAddIncident = () => {
    incidentController.addIncident(formData, downloadURL);
  };

  const handleUpdateIncident = () => {
    if (!currentIncident) return;
    incidentController.updateIncident(currentIncident.id, formData, downloadURL, currentIncident);
  };

  const handleCancelAdd = () => {
    incidentController.resetForm();
    setShowForm(false);
  };

  const handleCancelUpdate = () => {
    incidentController.resetForm();
    setCurrentIncident(null);
    setShowUpdateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Incident Management System</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 my-6">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add New Incident"}
          </button>
          <button 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => incidentController.fetchIncidents()}
          >
            Refresh Incidents
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Add New Incident</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Fill in the details to report a new incident
              </p>
            </div>
            <div className="border-t border-gray-200">
              <IncidentForm 
                formData={formData}
                setFormData={setFormData}
                handleFileChange={handleFileChange}
                handleUpload={handleUpload}
                progress={progress}
                downloadURL={downloadURL}
                handleSubmit={handleAddIncident}
                handleCancel={handleCancelAdd}
                submitButtonText="Submit Incident"
              />
            </div>
          </div>
        )}

        {showUpdateForm && currentIncident && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Update Incident</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update the incident details
              </p>
            </div>
            <div className="border-t border-gray-200">
              <IncidentForm 
                formData={formData}
                setFormData={setFormData}
                handleFileChange={handleFileChange}
                handleUpload={handleUpload}
                progress={progress}
                downloadURL={downloadURL}
                handleSubmit={handleUpdateIncident}
                handleCancel={handleCancelUpdate}
                submitButtonText="Update Incident"
              />
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Incident List</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              View, edit or delete incidents
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="overflow-auto max-h-[600px]">
              <IncidentList 
                incidents={incidents} 
                onEdit={(incident) => incidentController.prepareForUpdate(incident)} 
                onDelete={(id) => incidentController.deleteIncident(id)} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;