import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import UploadBox from './components/UploadBox';
import AgentDescription from './components/AgentDescription';
import SARNarrative from './components/SARNarrative';
import ProfileIcon from './components/ProfileIcon';
import './App.css';

function App() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentInfo, setAgentInfo] = useState({ 
    description: '', 
    narrative: '',
    status: {
      isActive: false,
      lastActive: null,
      tasksCompleted: 0
    }
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [agentsStatus, setAgentsStatus] = useState({});

  // Fetch initial agent statuses
  useEffect(() => {
    const fetchAgentStatuses = async () => {
      try {
        const response = await fetch('http://localhost:5003/agent-status');
        const data = await response.json();
        setAgentsStatus(data);
      } catch (error) {
        console.error('Error fetching agent statuses:', error);
      }
    };
    
    fetchAgentStatuses();
    const interval = setInterval(fetchAgentStatuses, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleAgentSelect = async (agentName) => {
    try {
      const res = await fetch(`http://localhost:5003/agent/${encodeURIComponent(agentName)}`);
      const data = await res.json();
      
      setSelectedAgent(agentName);
      setAgentInfo({
        description: data.description,
        narrative: data.narrative,
        status: agentsStatus[agentName] || {
          isActive: false,
          lastActive: 'Never',
          tasksCompleted: 0
        }
      });

      if (agentName === "Migration Execution & Oversight Agents" && uploadedFile) {
        const migrationRes = await fetch('http://localhost:5003/migrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: `uploads/${uploadedFile}` }),
        });
        const migrationData = await migrationRes.json();
        if (migrationData.message) {
          alert("✅ " + migrationData.message);
        } else {
          alert("❌ Migration failed: " + migrationData.error);
        }
      }
    } catch (error) {
      console.error('Failed to fetch agent data or migrate:', error);
    }
  };

  const handleAgentControl = async (action) => {
    if (!selectedAgent) return;
    
    try {
      const response = await fetch('http://localhost:5003/agent-control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent,
          action: action
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setAgentInfo(prev => ({
          ...prev,
          status: {
            ...prev.status,
            isActive: action === 'start',
            lastActive: new Date().toLocaleString()
          }
        }));
      } else {
        alert(`Failed to ${action} agent: ${result.error}`);
      }
    } catch (error) {
      console.error('Agent control error:', error);
      alert(`Error trying to ${action} agent`);
    }
  };

  return (
    <div className="app">
      <Sidebar onAgentClick={handleAgentSelect} />
      <main className="main-section">
        {/* Top Bar with Profile and Upload */}
        <div className="top-bar">
          <div className="left-section">
            <UploadBox onUploadSuccess={setUploadedFile} />
          </div>
          <ProfileIcon />
        </div>
        
        {/* Main Content Area */}
        <div className="content-area">
          {/* Left Content - Agent Description */}
          <div className="left-content">
            <AgentDescription 
              description={agentInfo.description} 
              agentName={selectedAgent}
              status={agentInfo.status}
              onControl={handleAgentControl}
            />
          </div>
          
          {/* Right Panel - SAR Narrative */}
          <SARNarrative
            header={selectedAgent ? selectedAgent : 'Summary'}
            narrative={agentInfo.narrative}
          />
        </div>
      </main>
    </div>
  );
}

export default App;