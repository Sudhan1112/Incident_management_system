class IncidentModel:
    # This would typically connect to a database
    # For this example, we're using an in-memory list
    incidents = [
        {"id": "1234", "time_date": "2025-03-29 08:30", "building": "Building A", "primary_category": "Fire", 
         "incident_category": "Electrical Fire", "secondary_category": "Short Circuit",
         "incident_url": "https://firebasestorage.googleapis.com/v0/b/discute-d033d.appspot.com/o/uploads%2Fai-implementation.png?alt=media&token=c9581d00-cecb-4e78-b8cd-3f7c3b9d85ea",
         "severity": "High", "incident_level": "Level 3", "probability": "Likely", "description": "Smoke detected in server room."},
    ]
    
    @classmethod
    def get_all(cls):
        return cls.incidents
    
    @classmethod
    def add(cls, incident_data):
        cls.incidents.append(incident_data)
        return incident_data
    
    @classmethod
    def delete(cls, incident_id):
        cls.incidents = [incident for incident in cls.incidents if incident["id"] != incident_id]
        return {"message": "Incident deleted successfully", "remaining": cls.incidents}
    
    @classmethod
    def update(cls, incident_id, updated_data):
        for incident in cls.incidents:
            if incident["id"] == incident_id:
                incident.update(updated_data)
                return {"message": "Incident updated successfully", "updated": incident}
        return {"error": "Incident not found"}
    
    @classmethod
    def get_by_id(cls, incident_id):
        for incident in cls.incidents:
            if incident["id"] == incident_id:
                return incident
        return None
