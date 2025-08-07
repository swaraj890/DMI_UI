import React, { useState } from 'react';
import './Sidebar.css';

const agentNames = [
  "Pre-Migration Insights Agents",
  "Data Ingestion, Pre-Check & ETL Pipeline Agents",
  "Migration Execution & Oversight Agents",
  "Post-Migration Verification & Management Agents",
  "Cross-Cutting & Support Agents"
];

function Sidebar({ onAgentClick }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-circle"></div>
        <div className="logo-text">Logo</div>
      </div>
      <nav className="nav-menu">
        <ul>
          {agentNames.map((name) => (
            <li 
              key={name}
              className={`nav-item ${activeItem === name ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(name);
                onAgentClick(name);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;