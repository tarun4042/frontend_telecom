import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CommonPages/Styling_Components/Services.css'
 
const Services = () => {
    const [internetServices, setInternetServices] = useState([]);
    const [tvServices, setTvServices] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const [internetResponse, tvResponse] = await Promise.all([
                    axios.get('http://localhost:8082/api/internet-services/', { withCredentials: true }),
                    axios.get('http://localhost:8082/api/tv-services/', { withCredentials: true })
                ]);
 
                console.log('Internet Services Response:', internetResponse.data);
                console.log('TV Services Response:', tvResponse.data);
 
                setInternetServices(internetResponse.data);
                setTvServices(tvResponse.data);
            } catch (err) {
                setError('Error fetching services.');
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };
 
        fetchServices();
    }, []);
 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 
    return (
        <div>
 
            <h1>Internet Services</h1>
            <div className="services-grid">
                {internetServices.length === 0 ? (
                    <p>No internet services available.</p>
                ) : (
                    internetServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Description:</strong> {service.description}</p>
                                <p><strong>Service Type:</strong> {service.serviceType}</p>
                                <p><strong>Download Speed:</strong> {service.serviceDownloadSpeed} Mbps</p>
                                <p><strong>Upload Speed:</strong> {service.serviceUploadSpeed} Mbps</p>
                                <p><strong>Monthly Cost:</strong> ${service.monthlyCost}</p>
                            </div>
                        )
                    ))
                )}
            </div>
 
            <h1>TV Services</h1>
            <div className="services-grid">
                {tvServices.length === 0 ? (
                    <p>No TV services available.</p>
                ) : (
                    tvServices.map(service => (
                        service.active && (
                            <div className="service-box" key={service.serviceId}>
                                <h2>{service.serviceName}</h2>
                                <p><strong>Description:</strong> {service.description}</p>
                                <p><strong>Channel Count:</strong> {service.channelCount}</p>
                                <p><strong>Monthly Cost:</strong>${service.monthlyCost}</p>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
};
 
export default Services;