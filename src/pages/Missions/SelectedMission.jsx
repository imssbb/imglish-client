import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SelectedMission.scss';

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

          <p className="selectedmission__intro">{selectedMission.intro_text}</p>

          {renderAudio(getAudio && getAudio[0].audio_link)}
          <h3 className="selectedmission__fill-in">Listen & Fill-in :</h3>

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
            <div className="showmission">
              <h3 className="showmission__title">Today's Dialogue:</h3>
              <ul className="showmission__input-container">
                {JSON.parse(selectedMission.main_dialogue).entries.map(
                  (entry, index) => (
                    <li className="showmission__input" key={index}>
                      <strong>{entry.speaker}:</strong> {entry.text}
                    </li>
                  )
                )}
              </ul>

              {/* Continue to render other sections */}
              <h3 className="showmission__pattern-title">Today's Pattern</h3>
              <ul className="showmission__pattern-container">
                {JSON.parse(selectedMission.pattern_summary).entries.map(
                  (entry, index) => (
                    <li className="showmission__pattern-list" key={index}>
                      <br />
                      <strong>
                        {entry.pattern}:<br />
                      </strong>{' '}
                      {entry.text}
                    </li>
                  )
                )}
              </ul>

              <h3 className="showmission__practice-title">Drop the Beat!</h3>
              <p className="showmission__practice-detail">
                📌 Practice with the audio below. <br />
                This is the speed that we are aiming for!
              </p>
              {renderAudio(getAudio && getAudio[1].audio_link)}

              <div className="showmission__breakdown-container">
                <ul className="showmission__breakdown">
                  {JSON.parse(selectedMission.main_dialogue).entries.map(
                    (entry, index) => (
                      <li className="showmission__breakdown-input" key={index}>
                        <strong>{entry.speaker}:</strong> {entry.text}
                      </li>
                    )
                  )}
                </ul>
                <ul className="showmission__audio-container">
                  <h3 className="showmission__audio-slow">Slow Version</h3>
                  <li className="showmission__audio">
                    {renderAudio(getAudio && getAudio[2].audio_link)}
                  </li>
                  <li className="showmission__audio">
                    {renderAudio(getAudio && getAudio[3].audio_link)}
                  </li>
                  <li className="showmission__audio">
                    {renderAudio(getAudio && getAudio[4].audio_link)}
                  </li>
                  <li className="showmission__audio">
                    {renderAudio(getAudio && getAudio[5].audio_link)}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* "Reveal/Hide Answers" button*/}
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
