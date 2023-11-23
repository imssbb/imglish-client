import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentPage.scss';
import { AudioRecorder } from 'react-audio-voice-recorder';
import SelectedMission from '../Missions/SelectedMission';

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

  fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
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
      const successMessage = document.createElement('div');
      successMessage.textContent = 'Mission Uploaded Successfully!';
      document.body.appendChild(successMessage);
      // alert('Audio uploaded successfully!');
    })
    .catch((error) => {
      console.error('Error communicating with the server:', error);
    });
};

function StudentPage() {
  const params = useParams();
  const [student, setStudent] = useState();
  const [missions, setMissions] = useState();
  const [uploadSuccess, setUploadSuccess] = useState(null);

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/student/${params.id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getStudentInfo();
  }, [params.id]);

  useEffect(() => {
    const getMissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/missions`
        );
        setMissions(response.data[0]);
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
    data.set('file', file);
    // data.set('student_id', params.id);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/uploader`,
        data
      );
      setRes(res.data);
      setUploadSuccess(true);
    } catch (error) {
      console.log(error);
      setUploadSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Header</p>
      <ul>
        <li>Missions</li>
        <li>Submissions</li>

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
        {missions && <SelectedMission mission={missions} />}
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

          {file && (
            <>
              <button className="btn-green" onClick={uploadFile}>
                {loading ? 'uploading...' : 'Upload Your Mission!'}
              </button>
              {uploadSuccess !== null && (
                <p
                  className={
                    uploadSuccess ? 'success-message' : 'error-message'
                  }
                >
                  {uploadSuccess
                    ? 'Mission upload successful!'
                    : 'Error uploading file'}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
