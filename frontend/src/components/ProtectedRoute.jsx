import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // To make API requests

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Make an API request to check if the user is authenticated
        const checkAuthentication = async () => {
            try {
                // Assuming you have a route that checks authentication
                await axios.get(
                    'http://localhost:8000/api/v1/users/authenticated',
                    {
                        withCredentials: true
                    }
                );

                // If the request is successful, the user is authenticated
                setIsAuthenticated(true);
            } catch (error) {
                // If the request fails, the user is not authenticated
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!isAuthenticated) {
        return navigate('/login'); // Redirect to login if not authenticated
    }

    return children; // Render protected content if authenticated
}

export default ProtectedRoute;
