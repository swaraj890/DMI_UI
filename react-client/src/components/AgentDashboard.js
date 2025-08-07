import React from 'react';
import AgentDashboard from './AgentDashboard';
import './AgentDescription.css';

function AgentDescription({ description, agentName }) {
  // Mock data - replace with real data from your API
  const agentStatus = {
    isActive: Math.random() > 0.5, // Random active/inactive for demo
    lastActive: new Date().toLocaleTimeString()
  };

  return (
    <div className="agent-description-container">
      <AgentDashboard 
        agentName={agentName}
        isActive={agentStatus.isActive}
        lastActive={agentStatus.lastActive}
      />
      
      <div className="agent-description">
        <h4>Detailed Description</h4>
        <div className="chat-box">
          {description || (
            <p style={{ color: '#666', fontStyle: 'italic' }}>
              No agent selected. Choose one from the sidebar.
            </p>
          )}
        </div>
        <div className="input-area">
          <input type="text" placeholder="Ask about this agent..." />
          <button>➤</button>
        </div>
      </div>
    </div>
  );
}

export default AgentDescription;