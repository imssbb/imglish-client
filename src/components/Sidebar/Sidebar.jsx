import './Sidebar.scss';
function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="navicon">
        <div></div>
      </div>

      <a className="navicon__menu" href="/missions">
        Missions
      </a>
      <a className="navicon__menu" href="/submissions/1">
        Submissions
      </a>
      <a className="navicon__menu" href="/feedbacks/1">
        Feedback
      </a>
      <a className="navicon__menu" href="/student/1">
        Profile
      </a>
    </nav>
  );
}

export default Sidebar;
