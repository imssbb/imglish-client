import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SubmissionsPage.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

function Submissions() {
  const [getsubmissions, setGetSubmissions] = useState();
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getSubmissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/submissions/${params.id}`
        );
        setGetSubmissions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('You have not submitted any missions! Go and record!');
      }
    };

    getSubmissions();
  }, [params.id]);

  return (
    <div className="submissions">
      <Sidebar />
      <h1 className="submissions__title">Submissions</h1>
      {error && <p className="error">{error}</p>}
      {getsubmissions && (
        <ul>
          {getsubmissions.map((submission, index) => {
            // Format the updated_at to a more readable format
            const updatedAt = new Date(submission.updated_at).toLocaleString();

            return (
              <li key={index} className="submissions__container">
                <p>Missions: {submission.missions_id}</p>
                <p>Uploaded At: {updatedAt}</p>
                <audio
                  className="submissions__audio"
                  src={submission.audio_link}
                  controls
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Submissions;
