import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectedMission.scss';

//components

function SelectedMission() {
  const params = useParams();
  const [selectedMission, setSelectedMission] = useState();
  const [getAudio, setgetAudio] = useState();

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

  return (
    <div>
      <p>Header</p>

      <div>
        {selectedMission && (
          <div key={selectedMission.id}>
            <h1>{selectedMission.mission_title}</h1>

            <pre>{selectedMission.intro_text}</pre>

            {renderAudio(getAudio && getAudio[0].audio_link)}

            <p>Listen & Fill-in:</p>
            <ul>
              {JSON.parse(selectedMission.empty_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong>
                    <input
                      type="text"
                      placeholder={`Type here! What do you hear? ${entry.speaker}`}
                    />
                  </li>
                )
              )}
            </ul>
            <p>{selectedMission.spacing_text}</p>
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
      </div>
    </div>
  );
}

export default SelectedMission;
