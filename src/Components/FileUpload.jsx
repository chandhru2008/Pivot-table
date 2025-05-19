import Papa from "papaparse";

const FileUpload = ({
  data,
  setData,
  setFields,
  setFieldTypes,
  setRows,
  setColumns,
  setValues,
  setFileName,
  fileName
}) => {

  const handleFileUpload = (e) => {
    const [file] = e.target.files;
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        const headers = results.meta.fields;

        const types = {};
        for (const field of headers) {
          const sample = parsedData[0]?.[field];
          types[field] = !isNaN(Number(sample)) ? "number" : "string";
        }

        //  Reset
        setRows([]);
        setColumns([]);
        setValues([]);
        setFields(headers);
        setData(parsedData);
        setFieldTypes(types);
      },
      error: (error) => {
        console.error("PapaParse error:", error);
      }
    });
  };

  return (
    <div>
       <div className="upload-container">
        <div className="upload-box">
          <div className="upload-content">
            <img
              alt="File Icon"
              src="https://img.icons8.com/dusk/64/csv.png"
              className="upload-icon"
            />
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="upload-input"
          />
        </div>
        {fileName && <div className="file-name">{fileName}</div>}
      </div>
    </div>
   
  );
};

export default FileUpload;
