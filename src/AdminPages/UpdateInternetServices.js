import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate,Link,Outlet } from 'react-router-dom';
import './Styling_Components/UpdateServices.css';
//import './Modify.css'; // Import any CSS if needed

function UpdateInternetServices() {
  const [internetService, setInternetService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state;

  useEffect(() => {
    // Fetch service details based on serviceId
    axios.get(`http://localhost:8082/api/internet-services/${serviceId}`,{withCredentials:true})
      .then(response => {
        setInternetService(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the service details!", error);
        setError(error.message);
        setLoading(false);
      });
  }, [serviceId]);

  const handleSaveInternetService = () => {
    // Implement save logic here
    // Example: send updated service details to the server
    axios.patch(`http://localhost:8082/admin/internet-service/update/${serviceId}`, internetService)
      .then(response => {
        console.log("Service updated:", response.data);
        navigate('/'); // Redirect to the services page after updating
      })
      .catch(error => {
        console.error("There was an error updating the service!", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <><nav class="navbar">
      <ul class="nav-links">
        <li>
          <Link to="/admin/services">Our Services</Link>
        </li>
        <li>
          <Link to="/admin/requests">Requests</Link>
        </li>
        <li>
          <Link to="/admin/validation">Requests Validation</Link>
        </li>
      </ul>
    </nav><Outlet /><div className="modify-container">
        <h1>Modify Service</h1>
        {internetService && (
          <form>
            <label>
              Service Name:
              <input
                type="text"
                value={internetService.serviceName}
                onChange={(e) => setInternetService({ ...internetService, serviceName: e.target.value })} />
            </label>
            <label>
              Description:
              <textarea
                value={internetService.description}
                onChange={(e) => setInternetService({ ...internetService, description: e.target.value })} />
            </label>
            <label>
              Service Type:
              <textarea
                value={internetService.serviceType}
                onChange={(e) => setInternetService({ ...internetService, serviceType: e.target.value })} />
            </label>
            <label>
              Download Speed:
              <textarea
                value={internetService.serviceDownloadSpeed}
                onChange={(e) => setInternetService({ ...internetService, serviceDownloadSpeed: e.target.value })} />
            </label>
            <label>
              Upload Speed:
              <textarea
                value={internetService.serviceUploadSpeed}
                onChange={(e) => setInternetService({ ...internetService, serviceUploadSpeed: e.target.value })} />
            </label>
            <label>
              Monthly Cost:
              <textarea
                value={internetService.monthlyCost}
                onChange={(e) => setInternetService({ ...internetService, monthlyCost: e.target.value })} />
            </label>
            <label>
              Benifits:
              <textarea
                value={internetService.benifits}
                onChange={(e) => setInternetService({ ...internetService, benifits: e.target.value })} />
            </label>
            <label>
              Criteria:
              <textarea
                value={internetService.criteria}
                onChange={(e) => setInternetService({ ...internetService, criteria: e.target.value })} />
            </label>
            {/* Add other fields as necessary */}
            <button type="button" onClick={handleSaveInternetService}>Save Changes</button>
          </form>
        )}
      </div></>
  );
}

export default UpdateInternetServices;
