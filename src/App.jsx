import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from './pages/Home/Home';
import Missions from './pages/Missions/Missions';
import SelectedMission from './pages/Missions/SelectedMission';
import StudentPage from './pages/StudentPage/StudentPage';
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
          {/* <Route
            path="/student/:id/missions/:missionID"
            element={<StudentPage />}
          ></Route> */}
          // FEEDBACK
          <Route path="/student/:id/feedback" element={<StudentPage />}></Route>
          <Route
            path="/student/:id/feedback/:feddbackID"
            element={<StudentPage />}
          ></Route>
          {/* // SUBMISSION
          <Route
            path="/student/:id/submission"
            element={<StudentPage />}
          ></Route>
          <Route
            path="/student/:id/submission/:submissionID"
            element={<StudentPage />}
          ></Route> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
