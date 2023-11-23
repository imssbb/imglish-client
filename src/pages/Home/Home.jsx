import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';

//components

function Home() {
  const [missions, setMissions] = useState();

  useEffect(() => {
    const getMissions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getMissions();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
