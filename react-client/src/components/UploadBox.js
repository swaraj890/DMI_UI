import React, { useState } from 'react';
import './UploadBox.css';

function UploadBox({ onUploadSuccess }) {
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!allowedTypes.includes(file.type)) {
      setUploadMessage('Unsupported file type.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5003/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadMessage('File uploaded successfully');
        onUploadSuccess(file.name); // Pass filename back to AgentPage
      } else {
        setUploadMessage('Upload failed');
      }
    } catch (err) {
      console.error(err);
      setUploadMessage('Upload error');
    }
  };

  return (
    <div className="upload-box">
      <div className="upload-content">
        <div className="upload-icon">📂</div>
        <p>Drag and Drop or Browse File</p>
        <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileChange} />
        <small>Supported Formats: .CSV, .XLS, .XLSX</small><br />
        <small>Maximum Size: 200 MB</small>
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      </div>
    </div>
  );
}

export default UploadBox;

