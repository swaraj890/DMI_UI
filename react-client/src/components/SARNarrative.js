// import React from 'react';
// import './SARNarrative.css';

// function SARNarrative() {
//   return (
//     <div className="sar-narrative">
//       <h4>SAR Narrative</h4>
//       <div className="sar-content"></div>
//     </div>
//   );
// }

// export default SARNarrative;

import React from 'react';
import './SARNarrative.css';

function SARNarrative({ header, narrative }) {
  return (
    <div className="sar-narrative">
      <h4>{header}</h4>
      <div className="sar-content">
        <p>{narrative}</p>
      </div>
    </div>
  );
}

export default SARNarrative;

