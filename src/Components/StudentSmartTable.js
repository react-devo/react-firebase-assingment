import React from 'react';
import { useTable, useEditable } from 'react-table';

const SmartTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { editable },
  } = useTable(
    {
      columns,
      data,
      initialState: { editable: {} },
    },
    useEditable
  );

  const handleEdit = (rowIndex) => {
    const rowId = rows[rowIndex]?.id;
    if (rowId) {
      editable.toggleRowEditing(rowId);
    }
  };

  // ... rest of the component

  return (
    <div>
      {/* ... other parts of the component */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {editable[row.id] ? (
                    <input
                      type="text"
                      value={cell.value}
                      onChange={(e) => editable.setValue(cell.column.id, row.id, e.target.value)}
                      onBlur={() => editable.toggleRowEditing(row.id)}
                    />
                  ) : (
                    cell.render('Cell')
                  )}
                </td>
              ))}
              <td>
                <button onClick={() => handleEdit(rowIndex)}>Edit</button>
                {/* ... rest of the actions */}
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* ... rest of the component */}
    </div>
  );
};

export default SmartTable;
