// src/hooks/useAuth.js
export const useAuth = () => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, otherwise false
  };
  