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
          `http://localhost:8080/feedbacks/details/${id}`
        );
        setSelectedFeedbacks(response.data);
        console.log(response.data);
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
