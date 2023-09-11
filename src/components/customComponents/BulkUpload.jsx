import React, { useState } from 'react';
import axios from 'axios';
import { ExpetedHeader } from '../../ScreenJson';

function CSVUpload() {

  const [validationMessage, setValidationMessage] = useState('');
  const [expectedHeaders, setExpectedHeaders] = useState(ExpetedHeader.property);

  const handleFileUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const headers = csvData.split('\n')[0].split(',').map((header) => header.trim());

      // Check if all expected headers are present in the CSV
      const headersValid = {};
      expectedHeaders.forEach((header) => {
        headersValid[header] = headers.includes(header.trim());
      });

      // Update the state with the headers validation result
      const allHeadersValid = Object.values(headersValid).every((valid) => valid);

      if (allHeadersValid) {
        // Now that the headers are validated, proceed with the file upload
        uploadFile(formData);
      } else {
        setValidationMessage('CSV file is missing some expected headers.');
        console.log('Missing headers:', Object.keys(headersValid).filter((header) => !headersValid[header]));
      }
    };

    reader.readAsText(file);
  };

  const uploadFile = async (formData) => {
    try {
      const response = await axios.post('https://builder-floor-backend-n2ib.onrender.com/api/properties/importProperties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { message } = response.data;
      setValidationMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <button type="submit">Submit</button>
        <div>{validationMessage}</div>
      </form>
    </div>
  );
}

export default CSVUpload;
