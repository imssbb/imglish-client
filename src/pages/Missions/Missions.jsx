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
        const response = await axios.get(`http://localhost:8080/missions`);
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

// {
/* {missions &&
        missions.map((mission) => (
          <div key={mission.id}>
            <h1>{mission.mission_title}</h1>
            Use preformatted text tag
            <pre>{mission.intro_text}</pre>
            <p>Empty Dialogue:</p>
            <ul>
              {JSON.parse(mission.empty_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
            </ul>
            <p>{mission.spacing_text}</p>
            <p>Main Dialogue:</p>
            <ul>
              {JSON.parse(mission.main_dialogue).entries.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.speaker}:</strong> {entry.text}
                </li>
              ))}
            </ul>
            <p>Explanation: {mission.explanation}</p>
            <p>Practice Pattern: {mission.practice_pattern}</p>
          </div>
        ))} */
// }
