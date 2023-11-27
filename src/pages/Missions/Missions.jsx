import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Missions.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

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
    <div className="missionlist">
      <Sidebar />
      <h1 className="missionlist__title">Select Your Mission</h1>
      <ul className="missionlist__container">
        {missions &&
          missions.map((mission) => (
            <li key={mission.id}>
              <Link to={`/missions/${mission.id}`}>
                <h3 className="missionlist__list">{mission.mission_title}</h3>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Missions;
