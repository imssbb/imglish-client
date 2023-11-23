import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SubmissionsPage.scss';

//components

function Submissions() {
  const [getsubmissions, setGetSubmissions] = useState();
  const params = useParams();

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/submissions/${params.id}`
        );
        setGetSubmissions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    getSubmissions();
  }, [params.id]);
  return (
    <div>
      <h1>Submissions</h1>
      {getsubmissions && (
        <ul>
          {getsubmissions.map((submission, index) => {
            // Format the updated_at to a more readable format
            const updatedAt = new Date(submission.updated_at).toLocaleString();

            return (
              <li key={index}>
                <p>Missions: {submission.missions_id}</p>
                <p>Uploaded At: {updatedAt}</p>
                <audio src={submission.audio_link} controls />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Submissions;