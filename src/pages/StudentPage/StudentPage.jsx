import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentPage.scss';
import { AudioRecorder } from 'react-audio-voice-recorder';
import SelectedMission from '../Missions/SelectedMission';
import Sidebar from '../../components/Sidebar/Sidebar';

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  console.log(blob);
  const audio = document.createElement('audio');
  audio.src = url;
  audio.controls = true;

  const appContainer = document.querySelector('.App');
  appContainer.appendChild(audio);

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
      appContainer.appendChild(successMessage);
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
  const [selectedOption, setSelectedOption] = useState(''); // Default option

  // Fetch student information when the component mounts
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

  // Fetch missions when the component mounts
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
  // eslint-disable-next-line
  const [_res, setRes] = useState({});
  const [file, setFile] = useState(null);
  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
    setSelectedOption('upload'); // Switch to the upload option when a file is selected
  };
  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    console.log(file);
    data.set('file', file);
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
    <>
      <div className="student-page">
        <Sidebar />

        {student && (
          <h2 className="student-page__studentname">{`Hey, ${student.name}! 🚀`}</h2>
        )}

        <div className="student-page__mission">
          <h2 className="student-page__today">
            Ready for another mission today?
          </h2>
        </div>
      </div>

      {missions && <SelectedMission mission={missions} />}

      <div className="audio">
        <h2 className="audio__title">Submit Your Mission</h2>

        {/* Toggle button for selecting recording or uploading */}
        <div className="audio__toggle-options">
          <button
            onClick={() => setSelectedOption('record')}
            className={`button ${selectedOption === 'record' ? 'active' : ''}`}
          >
            Record
          </button>
          <span className="audio__toggle-spacer">or</span>
          <button
            onClick={() => setSelectedOption('upload')}
            className={`button ${selectedOption === 'upload' ? 'active' : ''}`}
          >
            Upload
          </button>
        </div>

        {/* Toggle between audio recording and file upload options */}
        {selectedOption === 'record' && (
          <div className="audio__record">
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={false}
              downloadFileExtension="webm"
            />
            <p className="audio__record-title">Record Now</p>
          </div>
        )}

        {selectedOption === 'upload' && (
          <div className="audio__upload">
            <p className="audio__upload-title">Upload Your Audio</p>

            <label className="audio__fileselect" htmlFor="file">
              {' '}
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
                <button className="button" onClick={uploadFile}>
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
        )}
      </div>
    </>
  );
}

export default StudentPage;
