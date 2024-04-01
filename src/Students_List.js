import React, { useState } from 'react';

function StudentTable({ data }) {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortData = (columnIndex) => {
    const column = Object.keys(data[0])[columnIndex];
    if (sortedColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortedColumn) {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];
      if (isNaN(aValue)) {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  const calculateTotalMarks = (student) => {
    return student.physics + student.maths + student.english;
  };

  const highestMarksStudent = sortedData.reduce((prev, current) => {
    return calculateTotalMarks(prev) > calculateTotalMarks(current) ? prev : current;
  });

  const lowestMarksStudent = sortedData.reduce((prev, current) => {
    return calculateTotalMarks(prev) < calculateTotalMarks(current) ? prev : current;
  });

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((column, index) => (
            <th key={index} onClick={() => sortData(index)}>
              {column}
              {sortedColumn === column && (
                <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((student, index) => (
          <tr key={index} className={student === highestMarksStudent ? 'high-score' : (student === lowestMarksStudent ? 'low-score' : '')}>
            {Object.values(student).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
