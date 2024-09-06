import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styling_Components/Services.css';
import { useNavigate,Outlet, Link} from 'react-router-dom';
function Services() {
  const [internetServices, setInternetServices] = useState([]);
  const [tvServices, setTvServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch internet services
  useEffect(() => {
    axios.get(`http://localhost:8082/admin/api/internet-service`,{withCredentials:true})
      .then(response => {
        setInternetServices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the internet services!", error);
        setError(error.message);
      });
  }, []);

  // Fetch TV services
  useEffect(() => {
    axios.get(`http://localhost:8082/admin/api/tv-service`,{withCredentials:true})
      .then(response => {
        setTvServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the TV services!", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleModifyInternetService = (serviceId) => {
    // Implement modify logic here
    navigate(`/admin/updateInternet`,{state:{serviceId}});
  };

  const handleTerminateInternetService = (serviceId) => {
    // Implement terminate logic here
    const confirmTermination = window.confirm("Are you sure you want to terminate this service?");

    if (confirmTermination) {
      // If confirmed, send request to terminate the service
      axios.delete(`http://localhost:8082/admin/api/internet-service?id=${serviceId}`,{withCredentials:true})
        .then(response => {
          console.log("Service terminated:", response.data);
          // Optionally refresh the page or update the state to reflect the change
          alert("Service successfully terminated.");
          navigate(`/admin/services`);
          // You can also implement logic to update the UI here
        })
        .catch(error => {
          console.error("There was an error terminating the service!", error);
          alert("Error terminating service.");
        });
    } else {
      // If the user cancels, just log or handle accordingly
      console.log("Termination canceled.");
    }
  };

  const handleModifyTvService = (serviceId) => {
    // Implement modify logic here
    navigate(`/admin/updateTv`,{state:{serviceId}});
  };

  const handleTerminateTvService = (serviceId) => {
    // Implement terminate logic here
    const confirmTermination = window.confirm("Are you sure you want to terminate this service?");

    if (confirmTermination) {
      // If confirmed, send request to terminate the service
      axios.delete(`http://localhost:8082/admin/api/tv-service?id=${serviceId}`,{withCredentials:true})
        .then(response => {
          console.log("Service terminated:", response.data);
          // Optionally refresh the page or update the state to reflect the change
          alert("Service successfully terminated.");
          navigate(`/admin/services`);
          // You can also implement logic to update the UI here
        })
        .catch(error => {
          console.error("There was an error terminating the service!", error);
          alert("Error terminating service.");
        });
    } else {
      // If the user cancels, just log or handle accordingly
      console.log("Termination canceled.");
    }
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
    </nav><Outlet /><div className="services-container">
        <h1>Internet Services</h1>
        <div className="services-grid">
          {internetServices.map(service => (
            service.active && ( // Check if the service is active
              <div className="service-box" key={service.serviceId}>
                <h2>{service.serviceName}</h2>
                <p><strong>Description:</strong> {service.description}</p>
                <p><strong>Service Type:</strong> {service.serviceType}</p>
                <p><strong>Download Speed:</strong> {service.serviceDownloadSpeed} Mbps</p>
                <p><strong>Upload Speed:</strong> {service.serviceUploadSpeed} Mbps</p>
                <p><strong>Monthly Cost:</strong> ${service.monthlyCost}</p>
                <div className="service-buttons">
                  <button onClick={() => handleModifyInternetService(service.serviceId)} className="btn modify-btn">Modify</button>
                  <button onClick={() => handleTerminateInternetService(service.serviceId)} className="btn terminate-btn">Terminate</button>
                </div>
              </div>
            )
          ))}
        </div>

        <h1>TV Services</h1>
        <div className="services-grid">
          {tvServices.map(service => service.active && (
            <div className="service-box" key={service.serviceId}>
              <h2>{service.serviceName}</h2>
              <p><strong>Description:</strong> {service.description}</p>
              <p><strong>Channel Count:</strong> {service.channelCount}</p>
              <p><strong>Monthly Cost:</strong>${service.monthlyCost}</p>
              <div className="service-buttons">
                <button onClick={() => handleModifyTvService(service.serviceId)} className="btn modify-btn">Modify</button>
                <button onClick={() => handleTerminateTvService(service.serviceId)} className="btn terminate-btn">Terminate</button>
              </div>
            </div>
          ))}
        </div>
      </div></>
  );
}

export default Services;
