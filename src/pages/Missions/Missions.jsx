import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Missions.scss';

//components

function Missions() {
  const [missions, setMissions] = useState();

  useEffect(() => {
    const getMissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/missions`
        );
        setMissions(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getMissions();
  }, []);

  return (
    <div>
      <h1>Missions Page</h1>
      <div>
        <ul>
          {missions &&
            missions.map((mission) => (
              <li key={mission.id}>
                <Link to={`/missions/${mission.id}`}>
                  <h2>{mission.mission_title}</h2>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Missions;
