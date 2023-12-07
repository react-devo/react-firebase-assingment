import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useFilters, useGlobalFilter, useRowSelect } from 'react-table';
import { AiFillDelete } from 'react-icons/ai';

// Example data for school classes
const initialData = [
  { id: 1, className: 'Class A', teacher: 'Mr. Smith', students: 25 },
  { id: 2, className: 'Class B', teacher: 'Ms. Johnson', students: 30 },
  // Add more classes as needed
];

const TextFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search ${column.Header}`}
    />
  );
};

const NumberFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  return (
    <input
      type="number"
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search ${column.Header}`}
    />
  );
};

const SmartTable = () => {
  const [data, setData] = useState(initialData);

  const columns = useMemo(() => {
    const handleEdit = (rowData) => {
      // Implement your edit logic here
      console.log('Edit', rowData);
    };

    const handleDelete = (rowId) => {
      // Implement your delete logic here
      setData((prevData) => prevData.filter((row) => row.id !== rowId));
    };

    return [
      { Header: 'ID', accessor: 'id', sortType: 'basic' },
      { Header: 'Class Name', accessor: 'className', Filter: TextFilter, editable: true },
      { Header: 'Teacher', accessor: 'teacher', Filter: TextFilter, editable: true },
      { Header: 'Students', accessor: 'students', Filter: NumberFilter, editable: true },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleEdit(row.original)}>Edit</button>
            <button onClick={() => handleDelete(row.id)}>
              <AiFillDelete />
            </button>
          </>
        ),
      },
    ];
  }, [setData, TextFilter, NumberFilter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect // Required for row selection
  );

  const { globalFilter } = state;

  return (
    <div>
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns"
      />
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                  {column.canFilter ? column.render('Filter') : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SmartTable;
