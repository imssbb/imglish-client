import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from './pages/Home/Home';
import Missions from './pages/Missions/Missions';
import SelectedMission from './pages/Missions/SelectedMission';
import StudentPage from './pages/StudentPage/StudentPage';
import FeedbackList from './pages/Feedback/FeedbackList';
import FeedbackSelected from './pages/Feedback/FeedbackSelected';
import Submissions from './pages/Submissions/SubmissonsPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}

        <Routes>
          // HOME
          <Route path="/" element={<Home />}></Route>
          // STUDENT MAIN
          <Route path="/student/:id" element={<StudentPage />}></Route>
          // MISSION
          <Route path="/missions" element={<Missions />}></Route>
          <Route path="/missions/:id" element={<SelectedMission />}></Route>
          // FEEDBACK
          <Route
            path="/feedbacks/:id"
            // path="/student/:id/feedbacks"

            element={<FeedbackList />}
          ></Route>
          <Route
            path="/feedbacks/details/:id"
            // path="/student/:id/feedbacks/details/:id"
            element={<FeedbackSelected />}
          ></Route>
          // SUBMISSION
          <Route path="/submissions/:id" element={<Submissions />}></Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
