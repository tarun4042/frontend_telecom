import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate ,Outlet,Link} from 'react-router-dom';
import './Styling_Components/UpdateServices.css';
//import './Modify.css'; // Import any CSS if needed

function UpdateTvServices() {
  const [tvService, setTvService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state;

  useEffect(() => {
    // Fetch service details based on serviceId
    axios.get(`http://localhost:8082/api/tv-services/${serviceId}`,{withCredentials:true})
      .then(response => {
        setTvService(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the service details!", error);
        setError(error.message);
        setLoading(false);
      });
  }, [serviceId]);

  const handleSaveTvService = () => {
    // Implement save logic here
    // Example: send updated service details to the server
    const updatedData={
        serviceId,
        serviceName:tvService.serviceName,
        monthlyCost:tvService.monthlyCost,
        benifits:tvService.benifits,
        description:tvService.description,
        criteria:tvService.criteria
    };
    axios.patch(`http://localhost:8082/admin/api/tv-service`, updatedData,{withCredentials:true})
      .then(response => {
        console.log("Service updated:", response.data);
        navigate('/admin/services'); // Redirect to the services page after updating
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
              {tvService && (
                  <form>
                      <label>
                          Service Name:
                          <input
                              type="text"
                              value={tvService.serviceName}
                              onChange={(e) => setTvService({ ...tvService, serviceName: e.target.value })} />
                      </label>
                      <label>
                          Description:
                          <textarea
                              value={tvService.description}
                              onChange={(e) => setTvService({ ...tvService, description: e.target.value })} />
                      </label>


                      <label>
                          Benifits:
                          <textarea
                              value={tvService.benifits}
                              onChange={(e) => setTvService({ ...tvService, benifits: e.target.value })} />
                      </label>
                      <label>
                          Criteria:
                          <textarea
                              value={tvService.criteria}
                              onChange={(e) => setTvService({ ...tvService, criteria: e.target.value })} />
                      </label>
                      <label>
                          Monthly Cost:
                          <textarea
                              value={tvService.monthlyCost}
                              onChange={(e) => setTvService({ ...tvService, monthlyCost: e.target.value })} />
                      </label>
                      {/* Add other fields as necessary */}
                      <button type="button" onClick={handleSaveTvService}>Save Changes</button>
                  </form>
              )}
          </div></>
  );
}

export default UpdateTvServices;
