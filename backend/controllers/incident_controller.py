from models.incident_model import IncidentModel
from fastapi import Request

class IncidentController:
    @staticmethod
    async def get_all_incidents():
        return IncidentModel.get_all()
    
    @staticmethod
    async def create_incident(request: Request):
        data = await request.json()
        return IncidentModel.add(data)
    
    @staticmethod
    async def delete_incident(incident_id: str):
        return IncidentModel.delete(incident_id)
    
    @staticmethod
    async def update_incident(incident_id: str, request: Request):
        updated_data = await request.json()
        return IncidentModel.update(incident_id, updated_data)
    
    @staticmethod
    async def get_incident(incident_id: str):
        incident = IncidentModel.get_by_id(incident_id)
        if incident:
            return incident
        return {"error": "Incident not found"}