import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Base URL of the backend
});

// Request Interceptor: Automatically add the token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global handling of HTTP statuses 400, 401, 403, 404, 409
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      let customMessage = error.response.data?.message;

      // If the backend did not provide its own message, set a nice default message according to the requirements
      if (!customMessage) {
        switch (status) {
          case 400: customMessage = 'Invalid data provided. Please check your input.'; break;
          case 401: customMessage = 'Unauthorized. Please log in again.'; break;
          case 403: customMessage = 'Forbidden. You do not have permission for this action.'; break;
          case 404: customMessage = 'Resource not found. Please check your request.'; break;
          case 409: customMessage = 'Conflict. This record already exists or cannot be modified.'; break;
          default: customMessage = 'An unexpected error occurred.';
        }
      }
      // Write the message back so our components can read it
      error.response.data = { ...error.response.data, message: customMessage };
    }
    return Promise.reject(error);
  }
);

export default api;