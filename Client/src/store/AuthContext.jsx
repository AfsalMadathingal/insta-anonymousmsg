// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [explosion, setExplosion] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
        const host = import.meta.env.VITE_HOST;
        fetch(`${host}/api/auth/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          credentials: 'include',
    
        })
    
    
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (!data.success) {
              setLoading(false);
              
            
            }else{
              setLoading(false);
              setUser(data.user)
              toast.success("Welcome Back")
            }
    
          });
        }

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
  };

  const signup = async (email, password) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser,loading,setExplosion, explosion, setLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
