import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeedbackSelected.scss';

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
    <div className="feedbackselected">
      <h1 className="feedbackselected__title">
        {selectedFeedbacks.mission_title}
      </h1>
      {selectedFeedbacks && (
        <div className="feedbackselected__container">
          <audio
            className="feedbackselected__audio"
            src={selectedFeedbacks.feedback_link}
            controls
          />
          <ul className="feedbackselected__list-container">
            {selectedFeedbacks.main_dialogue &&
              JSON.parse(selectedFeedbacks.main_dialogue).entries.map(
                (entry, index) => (
                  <li className="feedbackselected__list" key={index}>
                    <strong>{entry.speaker}:</strong> {entry.text}
                  </li>
                )
              )}
          </ul>
          <p className="feedbackselected__feedback">
            <strong>Feedback: </strong>
            {selectedFeedbacks.feedback}
          </p>
          <p className="feedbackselected__feedback">
            <strong>Practice Words: </strong>
            {selectedFeedbacks.practice_words}
          </p>
        </div>
      )}
    </div>
  );
};
export default FeedbackSelected;
