import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Missions from './pages/Missions/Missions';
import SelectedMission from './pages/Missions/SelectedMission';
import StudentPage from './pages/StudentPage/StudentPage';
import FeedbackList from './pages/Feedback/FeedbackList';
import FeedbackSelected from './pages/Feedback/FeedbackSelected';
import Submissions from './pages/Submissions/SubmissonsPage';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/student/:id" element={<StudentPage />}></Route>

          <Route path="/missions" element={<Missions />}></Route>
          <Route path="/missions/:id" element={<SelectedMission />}></Route>

          <Route path="/feedbacks/:id" element={<FeedbackList />}></Route>
          <Route
            path="/feedbacks/details/:id"
            element={<FeedbackSelected />}
          ></Route>

          <Route path="/submissions/:id" element={<Submissions />}></Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
