// import React from 'react';
// import './AgentDescription.css';

// function AgentDescription() {
//   return (
//     <div className="agent-description">
//       <h4>Agents Description</h4>
//       <div className="chat-box">
//         <input type="text" placeholder="Type Here" />
//         <button className="send-btn">➤</button>
//       </div>
//     </div>
//   );
// }

// export default AgentDescription;


import React from 'react';
import './AgentDescription.css';

function AgentDescription({ description }) {
  return (
    <div className="agent-description">
      <h4>Agent Description</h4>
      <div className="chat-box">
        <p>{description || 'Click an agent to view description.'}</p>
      </div>
    </div>
  );
}

export default AgentDescription;
