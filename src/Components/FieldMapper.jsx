function FieldMapper({headers, rowFields, setRowFields, columnFields, setColumnFields, valueFields, setValueFields}) {



    return ( 
        <div className="container">
            <div className='avaible-fields' onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    const field = e.dataTransfer.getData("field");
                    const source = e.dataTransfer.getData("source");

                    if (source == "row") setRowFields((prev) => prev.filter((f) => f != field));
                    else if (source == "column") setColumnFields((prev) => prev.filter((f) => f != field));
                    else if (source == "value") setValueFields((prev) => prev.filter((f) => f != field));

                }}
            >

                <strong>Available Fields:</strong>
                {headers.filter((f) => {
                    return (!rowFields.includes(f) && !columnFields.includes(f) && !valueFields.includes(f))
                }).map((header) => (
                    <div key={header} draggable onDragStart={(e) => e.dataTransfer.setData("field", header)}>
                        {header}
                    </div>
                ))}
            </div>

            {/* {console.log(headers.length)} */}




            <div className="row-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    const field = e.dataTransfer.getData("field");
                    const source = e.dataTransfer.getData("source");
                    if (!rowFields.includes(field)) {
                        if (source === "column") {
                            setColumnFields((prev) => prev.filter((f) => f !== field));
                        } else if (source === "value") {
                            setValueFields((prev) => prev.filter((f) => f !== field));
                        }
                        setRowFields((prev) => [...prev, field]);

                    }
                }}
            >
                <strong>Row Fields:</strong>
                {rowFields.map((field) => (
                    <div draggable onDragStart={(e) => { e.dataTransfer.setData("field", field); e.dataTransfer.setData("source", "row") }}
                        key={field}
                        // onConlick={() => setRowFields(prev => prev.filter((f) => f !== field))}
                        style={{ cursor: 'pointer' }}
                    >
                        {field}
                    </div>
                ))}
            </div>


            <div className="column-zone" onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    const field = e.dataTransfer.getData("field");
                    const source = e.dataTransfer.getData("source");
                    if (!columnFields.includes(field)) {
                        if (source === "row") {
                            setRowFields((prev) => prev.filter((f) => f !== field));
                        } else if (source === "value") {
                            setValueFields((prev) => prev.filter((f) => f !== field));
                        }
                        setColumnFields((prev) => [...prev, field]);

                    }
                }}>
                <strong>Column Fields:</strong>{
                    columnFields.map((field) => (
                        <div draggable onDragStart={(e) => { e.dataTransfer.setData("field", field); e.dataTransfer.setData("source", "column") }}
                            key={field}>
                            {field}
                        </div>
                    ))
                }
            </div>

            <div className="value-zone" onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    const field = e.dataTransfer.getData("field");
                    const source = e.dataTransfer.getData("source");

                    if (!valueFields.includes(field)) {
                        if (source === "row") {
                            setRowFields((prev) => prev.filter((f) => f !== field));
                        } else if (source === "column") {
                            setColumnFields((prev) => prev.filter((f) => f !== field));
                        }
                        setValueFields((prev) => [...prev, field]);
                    }
                }}>
                <strong>Value Fields:</strong>
                {valueFields.map((field) => (
                    <div
                        key={field}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("field", field);
                            e.dataTransfer.setData("source", "value");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {field}
                    </div>
                ))}
            </div>

        </div>

    );
}
export default FieldMapper;  