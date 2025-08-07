// src/components/ProfileIcon.js
import { useState } from 'react';
import './ProfileIcon.css';

export default function ProfileIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const userName = "Admin User"; // Replace with real auth later

  return (
    <div className="profile-container">
      <div 
        className="profile-circle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {userName.charAt(0).toUpperCase()}
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-big-circle">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <p className="profile-name">{userName}</p>
              <p className="profile-email">admin@example.com</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="profile-button">Settings</button>
            <button className="profile-button logout">Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}