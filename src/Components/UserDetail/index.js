import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const UserDetail = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) return <p className="para">Loading...</p>;

  return (
    <div className="user-detail">
    <div className="subContainer">
      <h1 className="userName">{user.name}'s Details</h1>
      <p className="userEmail"><span>EMAIL :</span>{user.email}</p>
      <p className="userEmail"><span>PHONE :</span> {user.phone}</p>
      <p className="userEmail"><span>COMPANY :</span>{user.company.name}</p>
      <p className="userEmail"><span>WEBSITE :</span>{user.website}</p>
      <p className="userEmail"><span>CITY :</span>{user.address.city}</p>
      <div className="btn"><button onClick={() => navigate('/')}>Go Back</button></div>
      
    </div>
    </div>
  );
};

export default UserDetail;
