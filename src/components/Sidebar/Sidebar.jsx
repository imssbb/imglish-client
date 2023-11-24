// import React, { useState } from 'react';
import './Sidebar.scss';
function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="navicon">
        <div></div>
      </div>

      <a className="navicon__menu" href="hi">
        Missions
      </a>
      <a className="navicon__menu" href="hi">
        Submissions
      </a>
      <a className="navicon__menu" href="hi">
        Feedback
      </a>
      <a className="navicon__menu" href="hi">
        Profile
      </a>
    </nav>
  );
}

export default Sidebar;
