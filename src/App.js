import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure your CSS is in the same file or create a new one.

function App() {
  const [projectType, setProjectType] = useState('react');
  const [projectName, setProjectName] = useState('');
  const [dependencies, setDependencies] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedProjectName = projectName.replace(/\s+/g, '_');
      const response = await axios.post('http://localhost:3000/api/create-project', {
        projectType,
        projectName: formattedProjectName,
        dependencies,
        email,
      });
      console.log(response.data.message);
      const projectLink = response.data.link;
      // Redirect to the provided link
      window.location.href = projectLink;
    } catch (error) {
      alert('Error creating project.');
    }
  };

  const handleAddDependency = () => {
    if (currentInput.trim() && !dependencies.includes(currentInput.trim())) {
      setDependencies([...dependencies, currentInput.trim()]);
      setCurrentInput(''); // Clear the input after adding
    }
  };

  const handleRemoveDependency = (dependency) => {
    setDependencies(dependencies.filter(dep => dep !== dependency));
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key
      handleAddDependency();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Create Your Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="projectType" className="block font-medium text-gray-800 mb-2">Project Type:</label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="block w-full h-12 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="react">React</option>
            <option value="node">Node</option>
            <option value="django">Django</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="projectName" className="block font-medium text-gray-800 mb-2">Project Name:</label>
          <input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="block w-full h-12 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-gray-800 mb-2">Dependencies:</label>
          <div className="flex flex-wrap items-center">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
              placeholder="Type and press Enter to add a dependency..."
              className="flex-grow h-12 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddDependency}
              className="h-12 ml-2 bg-blue-600 text-white rounded-md px-4 hover:bg-blue-700 transition duration-150"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {dependencies.map((dep, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-blue-300 rounded-full px-4 py-2 mr-2 mb-2 text-blue-900 shadow-md transition-transform transform hover:scale-105"
              >
                {dep}
                <button
                  onClick={() => handleRemoveDependency(dep)}
                  className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                  aria-label={`Remove ${dep}`}
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9.293l4.95-4.95a1 1 0 011.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05A1 1 0 015.05 3.636L10 8.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>

        </div>
        <div className="form-group">
          <label htmlFor="email" className="block font-medium text-gray-800 mb-2">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full h-12 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default App;
