import React from "react";

const IncidentForm = ({ 
  formData, 
  setFormData, 
  handleFileChange, 
  handleUpload, 
  progress, 
  downloadURL, 
  handleSubmit, 
  handleCancel, 
  submitButtonText 
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="time_date" className="block text-sm font-medium text-gray-700">
            Date and Time
          </label>
          <input
            type="datetime-local"
            name="time_date"
            id="time_date"
            value={formData.time_date}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="building" className="block text-sm font-medium text-gray-700">
            Building
          </label>
          <input
            type="text"
            name="building"
            id="building"
            value={formData.building}
            onChange={handleInputChange}
            placeholder="e.g. Building A"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="primary_category" className="block text-sm font-medium text-gray-700">
            Primary Category
          </label>
          <select
            name="primary_category"
            id="primary_category"
            value={formData.primary_category}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Security">Security</option>
            <option value="Safety">Safety</option>
            <option value="Environmental">Environmental</option>
          </select>
        </div>

        <div>
          <label htmlFor="incident_category" className="block text-sm font-medium text-gray-700">
            Incident Category
          </label>
          <input
            type="text"
            name="incident_category"
            id="incident_category"
            value={formData.incident_category}
            onChange={handleInputChange}
            placeholder="e.g. Electrical Fire"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="secondary_category" className="block text-sm font-medium text-gray-700">
            Secondary Category
          </label>
          <input
            type="text"
            name="secondary_category"
            id="secondary_category"
            value={formData.secondary_category}
            onChange={handleInputChange}
            placeholder="e.g. Short Circuit"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
            Severity
          </label>
          <select
            name="severity"
            id="severity"
            value={formData.severity}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label htmlFor="incident_level" className="block text-sm font-medium text-gray-700">
            Incident Level
          </label>
          <select
            name="incident_level"
            id="incident_level"
            value={formData.incident_level}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Level</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>

        <div>
          <label htmlFor="probability" className="block text-sm font-medium text-gray-700">
            Probability
          </label>
          <select
            name="probability"
            id="probability"
            value={formData.probability}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Probability</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Possible">Possible</option>
            <option value="Likely">Likely</option>
            <option value="Very Likely">Very Likely</option>
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter detailed description of the incident"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <div className="mt-1 flex items-center">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpload}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Upload Image
            </button>
          </div>
          
          {progress > 0 && (
            <div className="mt-2">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Upload Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div 
                    style={{ width: `${progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
          
          {downloadURL && (
            <div className="mt-4">
              <p className="block text-sm font-medium text-gray-700">Image Preview:</p>
              <div className="mt-1">
                <img 
                  src={downloadURL} 
                  alt="Incident" 
                  className="h-40 w-40 object-cover rounded-md border border-gray-300" 
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
};

export default IncidentForm;