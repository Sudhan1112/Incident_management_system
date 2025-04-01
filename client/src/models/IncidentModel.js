import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3500/incidents";

export default class IncidentModel {
  static async fetchAll() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching incidents:", error);
      throw error;
    }
  }

  static async add(incidentData) {
    try {
      const data = {
        id: uuidv4(),
        ...incidentData
      };
      
      const response = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" }
      });
      
      return response.data;
    } catch (error) {
      console.error("Error adding incident:", error);
      throw error;
    }
  }

  static async update(id, incidentData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, incidentData, {
        headers: { "Content-Type": "application/json" }
      });
      
      return response.data;
    } catch (error) {
      console.error("Error updating incident:", error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting incident:", error);
      throw error;
    }
  }
}
