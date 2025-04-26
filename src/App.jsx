import React, { useState } from 'react';
import CsvUploader from './Components/CsvUploader'
import FieldMapper from './Components/FieldMapper'
import PivotTable from './Components/PivotTable';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [rowFields, setRowFields] = useState([]);
  const [columnFields, setColumnFields] = useState([]);
  const [valueFields, setValueFields] = useState([]);

  function handleDataParsed(parsedData) {
    setData(parsedData);
    if (parsedData.length > 0) {
      setHeaders(Object.keys(parsedData[0])); // Set headers based on CSV data
    }
  }

  return (
    <>
      <div className="app-container">
        <CsvUploader onDataParsed={handleDataParsed} />
        <PivotTable
          headers={headers}
          data={data}
          rowFields={rowFields}
          columnFields={columnFields}
          valueFields={valueFields}
        />
        <FieldMapper
          headers={headers}
          rowFields={rowFields}
          setRowFields={setRowFields}
          columnFields={columnFields}
          setColumnFields={setColumnFields}
          valueFields={valueFields}
          setValueFields={setValueFields}
        />

      </div>

    </>
  );
}

export default App;
