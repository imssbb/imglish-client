import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentPage.scss';

//components

function StudentPage() {
  const params = useParams();
  const [student, setStudent] = useState();
  const [missions, setMissions] = useState();

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/student/${params.id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getStudentInfo();
  }, [params.id]);

  // WOULD HAVE TO FIGURE OUT HOW TO SPECIFY TODAY'S MISSION WITH DATES OR JUST SIMPLY SELECT AN ARRAY..
  // FOR NOW, JUST DID A [0] INDEX
  useEffect(() => {
    const getMissions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/missions`);
        setMissions(response.data[0]);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getMissions();
  }, []);

  return (
    <div>
      <p>Header</p>
      <ul>
        <li>Missions</li>
        <li>Submit</li>

        <li>Feedback</li>
        <li>Profile</li>
      </ul>
      {student && (
        <div>
          <h1>{`Welcome ${student.name}!`}</h1>
        </div>
      )}

      <div>
        <h1>Today's Mission</h1>
        {missions && (
          <div key={missions.id}>
            <h1>{missions.mission_title}</h1>
            <pre>{missions.intro_text}</pre>
            <p>Fill-in the Dialogue:</p>
            <ul>
              {JSON.parse(missions.empty_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
            </ul>
            <p>{missions.spacing_text}</p>
            <p>Main Dialogue:</p>
            <ul>
              {JSON.parse(missions.main_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
            </ul>
            <p>Explanation: {missions.explanation}</p>
            <p>Practice Pattern:</p>
            <ul>
              {JSON.parse(missions.practice_pattern).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <h2>Audio Recording</h2>
      </div>
    </div>
  );
}

export default StudentPage;
