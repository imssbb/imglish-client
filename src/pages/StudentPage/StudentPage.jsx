import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentPage.scss';
import { AudioRecorder } from 'react-audio-voice-recorder';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  console.log(blob);
  const audio = document.createElement('audio');
  audio.src = url;
  audio.controls = true;
  document.body.appendChild(audio);

  const formData = new FormData();
  formData.append('file', blob);
  formData.append('upload_preset', 'your_upload_preset');

  fetch('http://localhost:8080/api/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((serverResponse) => {
      console.log('Server response:', serverResponse);
      // Handle the response from your server if needed
    })
    .catch((error) => {
      console.error('Error communicating with the server:', error);
    });
};

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

  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const handleSelectFile = (e) => setFile(e.target.files[0]);
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    console.log(file);
    data.set('sample_file', file);
    try {
      const res = await axios.post('http://localhost:8080/api/uploader', data);
      setRes(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="audiorecorder">
        {/* AUDIO RECORDING ON BROWSER */}
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={false}
          downloadFileExtension="webm"
        />

        {/* UPLOAD TO CLOUDINARY */}
        <div className="App">
          <label htmlFor="file" className="btn-grey">
            {' '}
            Upload Your Mission Audio
          </label>
          <br />
          <input
            id="file"
            type="file"
            onChange={handleSelectFile}
            multiple={false}
          />
          {file && <p className="file_name">{file.name}</p>}
          <code>
            {/* PLACE WHERE DATA LISTS AFTER UPLOADING  */}
            {Object.keys(res).map(
              (key) =>
                key && (
                  <p className="output-item" key={key}>
                    <span>{key}:</span>
                    <span>
                      {typeof res[key] === 'object' ? 'object' : res[key]}
                    </span>
                  </p>
                )
            )}
          </code>
          {file && (
            <>
              <button className="btn-green" onClick={uploadFile}>
                {loading ? 'uploading...' : 'upload to Cloudinary'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
