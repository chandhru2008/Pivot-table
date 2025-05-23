import AggregationSelector from "./AggregationSelector";
import DragDropArea from "./DrageAndDropArea";

const Sidebar = ({
  fields,
  rows,
  columns,
  values,
  setRows,
  setColumns,
  setValues,
  fieldTypes,
}) => {
  const availableFields = fields.filter(
    (f) => !rows.includes(f) && !columns.includes(f) && !values.some((v) => v.field === f)
  );

  const handleAggregationChange = (field, selected) => {
    setValues((prev) => {
      const others = prev.filter((v) => v.field !== field);
      return [...others, { field, aggregations: selected }];
    });
  };

  const valueFields = values.map((v) => v.field);

  return (
    <div className="sidebar">
      <h3>Pivot Controls</h3>
      <DragDropArea title="Available" items={availableFields} setItems={() => {}} />
      <DragDropArea title="Rows" items={rows} setItems={setRows} />
      <DragDropArea title="Columns" items={columns} setItems={setColumns} />
      <DragDropArea
        title="Values"
        items={valueFields}
        setItems={(newOrder) => {
          setValues((prev) =>
            newOrder.map((field) => {
              const existing = prev.find((v) => v.field === field);
              return existing || { field, aggregations: ["Sum"] };
            })
          );
        }}
        renderItem={(field) => (
          <div>
            {field}
            <AggregationSelector
              type={fieldTypes[field]}
              selected={values.find((v) => v.field === field)?.aggregations || []}
              onChange={(selected) => handleAggregationChange(field, selected)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Sidebar;
