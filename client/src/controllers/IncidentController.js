import IncidentModel from "../models/IncidentModel";
import FileUploadService from "../services/FileUploadService";

export default class IncidentController {
  constructor(setIncidents, setFormData, setShowForm, setShowUpdateForm, setCurrentIncident, setFile, setProgress, setDownloadURL) {
    this.setIncidents = setIncidents;
    this.setFormData = setFormData;
    this.setShowForm = setShowForm;
    this.setShowUpdateForm = setShowUpdateForm;
    this.setCurrentIncident = setCurrentIncident;
    this.setFile = setFile;
    this.setProgress = setProgress;
    this.setDownloadURL = setDownloadURL;
    
    this.initialFormState = {
      time_date: "",
      building: "",
      primary_category: "",
      incident_category: "",
      secondary_category: "",
      severity: "",
      incident_level: "",
      probability: "",
      description: ""
    };
  }

  async fetchIncidents() {
    try {
      const incidents = await IncidentModel.fetchAll();
      this.setIncidents(incidents);
    } catch (error) {
      console.error("Failed to fetch incidents:", error);
    }
  }

  async addIncident(formData, downloadURL) {
    try {
      const incidentData = {
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

      await IncidentModel.add(incidentData);
      this.fetchIncidents();
      this.resetForm();
      this.setShowForm(false);
      
      return true;
    } catch (error) {
      console.error("Failed to add incident:", error);
      return false;
    }
  }

  async updateIncident(id, formData, downloadURL, currentIncident) {
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

      await IncidentModel.update(id, updatedData);
      this.fetchIncidents();
      this.resetForm();
      this.setCurrentIncident(null);
      this.setShowUpdateForm(false);
      
      return true;
    } catch (error) {
      console.error("Failed to update incident:", error);
      return false;
    }
  }

  async deleteIncident(id) {
    try {
      await IncidentModel.delete(id);
      this.fetchIncidents();
      return true;
    } catch (error) {
      console.error("Failed to delete incident:", error);
      return false;
    }
  }

  prepareForUpdate(incident) {
    this.setCurrentIncident(incident);
    this.setFormData({
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
    this.setDownloadURL(incident.incident_url);
    this.setShowUpdateForm(true);
  }

  resetForm() {
    this.setFormData(this.initialFormState);
    this.setDownloadURL("");
    this.setFile(null);
    this.setProgress(0);
  }

  async uploadFile(file) {
    try {
      const url = await FileUploadService.uploadFile(file, this.setProgress);
      this.setDownloadURL(url);
      return url;
    } catch (error) {
      console.error("Failed to upload file:", error);
      return null;
    }
  }
}