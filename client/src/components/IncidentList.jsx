import React from "react";

const IncidentList = ({ incidents, onEdit, onDelete }) => {
  if (incidents.length === 0) {
    return (
      <div className="px-4 py-5 sm:p-6 text-center">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No incidents</h3>
        <p className="mt-1 text-sm text-gray-500">Add a new incident to get started.</p>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return {
          bg: "bg-green-100",
          text: "text-green-800"
        };
      case "Medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800"
        };
      case "High":
        return {
          bg: "bg-orange-100",
          text: "text-orange-800"
        };
      case "Critical":
        return {
          bg: "bg-red-100",
          text: "text-red-800"
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800"
        };
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {incidents.map((incident, index) => {
        const severityColor = getSeverityColor(incident.severity);
        
        return (
          <div key={index} className="px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Incident on {incident.time_date}
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Building</p>
                    <p className="text-sm font-medium text-gray-900">{incident.building}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-sm font-medium text-gray-900">
                      {incident.primary_category} &gt; {incident.incident_category} &gt; {incident.secondary_category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Severity</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColor.bg} ${severityColor.text}`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Incident Level</p>
                    <p className="text-sm font-medium text-gray-900">{incident.incident_level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Probability</p>
                    <p className="text-sm font-medium text-gray-900">{incident.probability}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="mt-1 text-sm text-gray-900">{incident.description}</p>
                </div>
              </div>

              {incident.incident_url && (
                <div className="ml-4 flex-shrink-0">
                  <img 
                    src={incident.incident_url} 
                    alt="Incident" 
                    className="h-32 w-32 object-cover rounded-md border border-gray-300" 
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => onEdit(incident)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this incident?")) {
                    onDelete(incident.id);
                  }
                }}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IncidentList;