import React, { useState } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
      <span className="nav-logo">Quizz</span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <a href="/">Home</a>
        <a href="/quizzes">Quizzes</a>
        <a href="/keynotes">Keynotes</a>
        <a href="/addquizz">Add Quizz</a>
        <a href="/addkeynote">Add Keynote</a>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;