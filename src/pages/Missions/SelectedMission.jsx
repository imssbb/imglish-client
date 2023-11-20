import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectedMission.scss';

//components

function SelectedMission() {
  const params = useParams();
  const [selectedMission, setSelectedMission] = useState();

  useEffect(() => {
    const getSelectedMission = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/missions/${params.id}`
        );
        setSelectedMission(response.data);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };
    getSelectedMission();
  }, [params.id]);

  return (
    <div>
      <p>Header</p>

      <div>
        {selectedMission && (
          <div key={selectedMission.id}>
            <h1>{selectedMission.mission_title}</h1>
            {/* Use preformatted text tag */}
            <pre>{selectedMission.intro_text}</pre>
            <p>Listen & Fill-in:</p>
            <ul>
              {JSON.parse(selectedMission.empty_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
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
            <p>Explanation: {selectedMission.explanation}</p>

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
            <ul>
              {JSON.parse(selectedMission.practice_pattern).entries.map(
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
    </div>
  );
}

export default SelectedMission;

// const MissionComponent = ({ missionData }) => {
//   const { empty_dialogue } = missionData;
//   const parsedDialogue = JSON.parse(empty_dialogue);
//   const [userInputs, setUserInputs] = useState(parsedDialogue.entries.map(() => ''));

//   const handleInputChange = (index, value) => {
//     const newInputs = [...userInputs];
//     newInputs[index] = value;
//     setUserInputs(newInputs);
//   };

//   return (
//     <div>
//       <h2>{parsedDialogue.title}</h2>
//       {parsedDialogue.entries.map((entry, index) => (
//         <div key={index}>
//           <p>{entry.speaker}:
//             {entry.text !== '' ? entry.text :
//               <input
//                 type="text"
//                 value={userInputs[index]}
//                 onChange={(e) => handleInputChange(index, e.target.value)}
//                 placeholder="Type your dialogue here"
//               />}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MissionComponent;
