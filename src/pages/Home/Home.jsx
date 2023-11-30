import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

// Import images
// import heroImage from '../../assets/imgs/yellowchat.jpg';
// import heroImage from '../../assets/imgs/HAPPY.png';
import heroImage from '../../assets/imgs/Brazuca - Airport.png';
import missionImage1 from '../../assets/imgs/missions1.png';
// import missionImage2 from '../../assets/imgs/missions2.png';
import missionImage3 from '../../assets/imgs/mission3.png';
// import missionImage4 from '../../assets/imgs/missions4.png';
// import missionImage5 from '../../assets/imgs/missions5.png';
import missionImage6 from '../../assets/imgs/missions6.png';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Sound Better, Feel Better.</h1>
          <h2 className="hero__subtitle">
            English Pronunciation Mastery through Daily Missions.
          </h2>
        </div>
        <img className="hero__image" src={heroImage} alt="English Learners" />

        <p className="hero__description">
          Welcome to Imglish, where language learning meets innovation! We
          specialize in refining your English pronunciation for clear and
          confident communication.
        </p>
      </section>

      <section className="key-features">
        <div className="key-features__container">
          <h2 className="key-features__title">Key Features</h2>
          <img
            className="key-features__image1"
            src={missionImage3}
            alt="English Learners"
          />
        </div>

        <ul className="key-features__list">
          <li className="key-features__item">
            1️⃣ Tailored Daily Missions for Pronunciation Practice
          </li>
          <li className="key-features__item">
            2️⃣ Submit & Receive Audio Recordings for Personalized Feedback
          </li>
          <li className="key-features__item">
            3️⃣ Engage in Targeted Lessons for Pronunciation Enhancement
          </li>
        </ul>
      </section>

      <section className="herostruggle">
        <h1 className="herostruggle__title">
          Struggling with English Pronunciation?
        </h1>
        <h2 className="herostruggle__description">
          Imglish bridges the gap by offering personalized daily missions and
          constructive audio feedback to elevate your spoken English to new
          heights.
        </h2>
        <img
          className="herostruggle__image"
          src={missionImage1}
          alt="English Learners"
        />
      </section>

      <section className="targetuser">
        <h2 className="targetuser__title">Who Can Benefit from Imglish?</h2>
        <ul className="targetuser__list">
          <li className="targetuser__item">
            🗣️ English learners aiming to strengthen and practice their
            pronunciation.
          </li>
          <li className="targetuser__item">
            🏠 Individuals residing in English-speaking countries who wish to
            revitalize and enhance their language skills.
          </li>
          <li className="targetuser__item">
            📈 Professionals seeking to elevate spoken communication to
            articulate ideas clearly in workplace interactions.
          </li>
          <img
            className="targetuser__image2"
            src={missionImage6}
            alt="English Learners"
          />
        </ul>
      </section>

      <section className="cta">
        <h2 className="cta-title">
          Ready to Level Up Your Pronunciation Skills?
        </h2>
        <p className="cta-description">
          Start your Imglish journey today! Sign up for a free trial or download
          the app now 👋
        </p>
        <Link to="/signup" className="cta-button call-to-action__cta-button">
          Get Started
        </Link>
      </section>
    </>
  );
}

export default Home;
