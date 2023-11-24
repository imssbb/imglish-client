import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectedMission.scss';
import InputField from '../../components/Inputfield/Inputfield';

//components

function SelectedMission() {
  const params = useParams();
  const [selectedMission, setSelectedMission] = useState();
  const [getAudio, setgetAudio] = useState();
  const [showAnswers, setShowAnswers] = useState(false); // State variable for Hiding & Revealing Answer

  useEffect(() => {
    const getSelectedMission = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/missions/${params.id}`
        );
        setSelectedMission(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getSelectedMission();
  }, [params.id]);

  useEffect(() => {
    const getMissionAudios = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/audios/`,
          {
            params: {
              missions_id: params.id,
            },
          }
        );
        setgetAudio(response.data);
      } catch (error) {
        console.error('Error fetching Mission Audios:', error);
      }
    };
    getMissionAudios();
  }, [params.id]);

  const renderAudio = (audioLink) => {
    return audioLink ? <audio src={audioLink} controls /> : null;
  };

  // Set Hiding & Revealing  of Answer
  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <div className="selectedmission">
      {selectedMission && (
        <div key={selectedMission.id}>
          <h1 className="selectedmission__title">
            {selectedMission.mission_title}
          </h1>

          <pre className="selectedmission__pre">
            {selectedMission.intro_text}
          </pre>

          {renderAudio(getAudio && getAudio[0].audio_link)}

          <h3 className="selectedmission__fill-in">Listen & Fill-in:</h3>
          <ul className="selectedmission__input-container">
            {JSON.parse(selectedMission.empty_dialogue).entries.map(
              (entry, index) => (
                <li key={index}>
                  <strong>{entry.speaker}: </strong>
                  <input
                    className="selectedmission__input"
                    type="text"
                    placeholder={`Type Here!`}
                  />
                </li>
              )
            )}
          </ul>

          {showAnswers && (
            <div>
              <h2>Today's Dialogue:</h2>
              <ul>
                {JSON.parse(selectedMission.main_dialogue).entries.map(
                  (entry, index) => (
                    <li key={index}>
                      <strong>{entry.speaker}:</strong> {entry.text}
                    </li>
                  )
                )}
              </ul>

              {/* Continue to render other sections */}
              <p>Today's Pattern</p>
              <ul>
                {JSON.parse(selectedMission.pattern_summary).entries.map(
                  (entry, index) => (
                    <li key={index}>
                      <br />
                      <strong>
                        {entry.pattern}:<br />
                      </strong>{' '}
                      {entry.text}
                    </li>
                  )
                )}
              </ul>

              <p>Practice:</p>
              <p>regular speed</p>
              {renderAudio(getAudio && getAudio[1].audio_link)}

              <ul>
                {JSON.parse(selectedMission.practice_pattern).entries.map(
                  (entry, index) => (
                    <li key={index}>
                      <strong>{entry.speaker}:</strong> {entry.text}
                    </li>
                  )
                )}
              </ul>
              <p>Break it down:</p>

              <ul>
                <li>{renderAudio(getAudio && getAudio[2].audio_link)}</li>
                <li>{renderAudio(getAudio && getAudio[3].audio_link)}</li>
                <li>{renderAudio(getAudio && getAudio[4].audio_link)}</li>
                <li>{renderAudio(getAudio && getAudio[5].audio_link)}</li>
              </ul>
            </div>
          )}

          {/* Add "Reveal Answers" button below spacing_text */}
          <h2>
            <button
              onClick={handleToggleAnswers}
              className="button button--mission"
            >
              {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
            </button>
          </h2>
        </div>
      )}
    </div>
  );
}

export default SelectedMission;
