from fastapi import APIRouter, Request
from controllers.incident_controller import IncidentController

router = APIRouter()

@router.get("/incidents")
async def get_incidents():
    return await IncidentController.get_all_incidents()

@router.post("/incidents")
async def post_incidents(request: Request):
    return await IncidentController.create_incident(request)

@router.delete("/incidents/{incident_id}")
async def delete_incident(incident_id: str):
    return await IncidentController.delete_incident(incident_id)

@router.put("/incidents/{incident_id}")
async def update_incident(incident_id: str, request: Request):
    return await IncidentController.update_incident(incident_id, request)

@router.get("/incidents/{incident_id}")
async def get_incident(incident_id: str):
    return await IncidentController.get_incident(incident_id)
