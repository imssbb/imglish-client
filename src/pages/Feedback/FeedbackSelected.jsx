import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeedbackSelected = () => {
  const { id } = useParams();
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);

  useEffect(() => {
    const fetchSelectedFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/feedbacks/details/${id}`
        );
        setSelectedFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchSelectedFeedbacks();
  }, [id]);
  return (
    <div>
      <h1>{selectedFeedbacks.mission_title}</h1>
      {selectedFeedbacks && (
        <div>
          <audio src={selectedFeedbacks.feedback_link} controls />
          <ul>
            {selectedFeedbacks.main_dialogue &&
              JSON.parse(selectedFeedbacks.main_dialogue).entries.map(
                (entry, index) => (
                  <li key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
          </ul>
          <p>
            <strong>Feedback: </strong>
            {selectedFeedbacks.feedback}
          </p>
          <p>
            <strong>Practice Words: </strong>
            {selectedFeedbacks.practice_words}
          </p>
        </div>
      )}
    </div>
  );
};
export default FeedbackSelected;
