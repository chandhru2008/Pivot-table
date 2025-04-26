import React, { useState, useEffect } from 'react';

function PivotTable({ headers, data, rowFields, columnFields, valueFields }) {
    // console.log(data, rowFields, columnFields, valueFields);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {

        if (rowFields.length === 0 && columnFields.length === 0 && valueFields.length === 0) {
            // console.log("useEffect called successfully")

            return;
        }
        // console.log("This is the data ->" + data);

        transformData();

        

        function transformData() {

            let rowDataMap = {};

            data.forEach((record) => {


                let rowKey = [];
                let columnKey = [];

                //record is a object we get the key from rowField
                for (let i = 0; i < rowFields.length; i++) {
                    // rowKey.push(record.rowFields[i]); --> We can not do like this because we are trying to access a element that does not exit like if the field is 'Employee id' it will throw a error 
                    rowKey.push(record[rowFields[i]]);
                }
                console.log(rowKey);

                //simular Like the row 
                for (let i = 0; i < columnFields.length; i++) {
                    columnKey.push(record[columnFields[i]]);
                }


                // console.log("Row key->" + rowKey);
                // console.log("Column key->" + columnKey);

                // Check the Key isbexit in the column

                // // console.log('This is recod ->' , record);
                // if(record.ID != 1){
                //     console.log('This is rowKey ->' , rowDataMap[rowKey][columnKey]);
                // }

                console.log(rowDataMap);

                // console.log(record);
                if (!rowDataMap[rowKey]) {
                    // console.log(rowFields)
                    rowDataMap[rowKey] = {}; // Initialize with Empty object
                }


                // console.log("Column key is there are not ->" ,rowDataMap[rowKey][columnKey]);

                console.log([columnKey]);

                if (!rowDataMap[rowKey][columnKey]) {
                    rowDataMap[rowKey][columnKey] = 0; // Initialize with 0
                }


                // console.log("Column key is there value ->" ,rowDataMap[rowKey]);
                // console.log('This is rowDataMap ->' , rowDataMap);


                valueFields.forEach((field) => {
                    console.log("Value field inside coming");
                    rowDataMap[rowKey][columnKey] += record[field];
                });
                // console.log(tableData[rowKey][columnKey]);
            });

            setTableData(rowDataMap);
            // console.log(tableData);
        };


    }, [data, rowFields, columnFields, valueFields]);


    function renderTableHeader() {

        const columnHeaders = Object.keys(tableData).reduce((columns, rowKey) => {
            const keys = Object.keys(tableData[rowKey]);
            console.log('Keys for rowKey', rowKey, ':', keys);
        
            keys.forEach((columnKey) => {
                if (!columns.includes(columnKey)) {
                    columns.push(columnKey);
                }
            });
            return columns;
        }, []);
        
        console.log('columnHeaders:', columnHeaders);
        console.log('columnHeaders[0]:', columnHeaders[0]);
        

        // console.log(columnHeaders);

        // console.log(columnHeaders[0]);

        return (
            <thead style={{ color: 'black' }}>
                {columnFields.map((h, i) => (
                    <tr key={i}>
                        <th>{h}</th>
                        {columnHeaders.map((header, index) => (
                            <th key={index} >{header}</th>
                        ))}
                    </tr>
                ))}
            </thead>
        );
    };

    function renderTableBody() {


        // console.log(Object.keys(tableData));

        return (
            <tbody style={{ color: 'black' }}>
                {Object.keys(tableData).map((rowKey) => (
                    <tr key={rowKey}>
                        <td>{rowKey}</td>
                        {Object.keys(tableData[rowKey]).map((columnKey) => (
                            <td key={columnKey} style={{ color: 'black' }}>{tableData[rowKey][columnKey]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <div className="pivot-table">
            <table>
                {renderTableHeader()}
                {renderTableBody()}
            </table>
        </div>
    );
}

export default PivotTable;
