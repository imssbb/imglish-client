import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeedbackList.scss';

const FeedbackList = () => {
  const { id } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/feedbacks/${id}`
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [id]);

  return (
    <div className="feedbacklist">
      <h1 className="feedbacklist__title">Feedback</h1>
      <ul>
        {feedbacks.map((feedback) => (
          <li className="feedbacklist__container" key={feedback.id}>
            <Link to={`/feedbacks/details/${feedback.id}`}>
              <p className="feedbacklist__list feedbacklist__mission">
                {feedback.mission_title}:
              </p>
              <p className="feedbacklist__list">{feedback.feedback}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
