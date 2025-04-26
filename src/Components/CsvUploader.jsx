import React from 'react';
import { parse } from 'papaparse';

function CsvUploader({ onDataParsed }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          onDataParsed(results.data);
        }
      });
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.addEventListener('change', handleFileUpload);
    input.click();
  };

  return (
    <div className='app-header'>
      <h1 style={{color : "black"}}>Pivot table generator</h1>
      <button style={{backgroundColor : "#3498db"}} onClick={triggerFileInput}>Upload CSV</button>
    </div>
  );
}

export default CsvUploader;