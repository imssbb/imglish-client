import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

// Import images
import heroImage from '../../assets/imgs/yellowchat.jpg';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">
            Master English Pronunciation with Imglish
          </h1>
          <p className="hero__description">
            Welcome to Imglish, where language learning meets innovation! We
            specialize in refining your English pronunciation for clear and
            confident communication.
          </p>
        </div>
        <img className="hero__image" src={heroImage} alt="English Learners" />
      </section>

      {/* <Link to="/signup" className="cta-button hero__cta-button">
            Start Your Imglish Journey
          </Link> */}

      <section className="key-features">
        <h2 className="key-features__title">Key Features</h2>
        <ul className="key-features__list">
          <li className="key-features__item">
            Tailored Daily Missions for Pronunciation Practice
          </li>
          <li className="key-features__item">
            Submit Audio Recordings for Personalized Feedback
          </li>
          <li className="key-features__item">
            Engage in Targeted Lessons for Pronunciation Enhancement
          </li>
          <li className="key-features__item">
            Immersive Learning Experience for Professionals and Learners Alike
          </li>
        </ul>
      </section>

      <section className="home__problem-solution">
        <h2 className="problem-solution__title">
          Struggling with English Pronunciation?
        </h2>
        <p className="problem-solution__description">
          Traditional resources not providing the feedback you need? Imglish
          bridges the gap by offering personalized daily missions and
          constructive audio feedback to elevate your spoken English to new
          heights.
        </p>
      </section>

      <section className="home__user-profiles">
        <h2 className="user-profiles__title">Who Can Benefit from Imglish?</h2>
        <p className="user-profiles__description">Imglish is designed for:</p>
        <ul className="user-profiles__list">
          <li className="user-profiles__item">
            English learners aiming to strengthen and practice their
            pronunciation.
          </li>
          <li className="user-profiles__item">
            Individuals residing in English-speaking countries who wish to
            revitalize and enhance their language skills.
          </li>
          <li className="user-profiles__item">
            Professionals seeking to elevate spoken communication to articulate
            ideas clearly in workplace interactions.
          </li>
        </ul>
      </section>

      <section className="home__call-to-action">
        <h2 className="call-to-action__title">
          Ready to Level Up Your Pronunciation Skills?
        </h2>
        <p className="call-to-action__description">
          Start your Imglish journey today! Sign up for a free trial or download
          the app now.
        </p>
        <Link to="/signup" className="cta-button call-to-action__cta-button">
          Get Started
        </Link>
      </section>

      <section className="home__testimonial">
        <h2 className="testimonial__title">What Our Users Say</h2>
        <div className="testimonial__content">
          <p className="testimonial__quote">
            "Joining Imglish was a game-changer for me. The personalized
            feedback made all the difference!"
          </p>
          <span className="testimonial__author">- Sarah, Imglish User</span>
        </div>
        {/* Add more testimonials as needed */}
      </section>

      <footer className="home__footer">
        <p className="footer__contact">
          Have questions or suggestions? Contact us at [your email address].
        </p>
        {/* Add social media links with appropriate class names */}
      </footer>
    </div>
  );
}

export default Home;
