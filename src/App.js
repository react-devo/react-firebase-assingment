
import db from './config/firebaseconfig';
import React, { useMemo, useState,useEffect } from 'react';
import SmartTable from './Components/SchoolTable';
import UserAccountPage from './Components/UserAccountEditBox';
import Sidebar from './Components/Sidebar';
import UserAccountView from './Components/UserAccount';
import StudentsSmartTable from './Components/StudentSmartTable';
import SyllabusForm from './Components/Syllabus';

const columns = [
  {
    Header: 'Class Name',
    accessor: 'className',
    Filter: ({ column }) => <input type="text" {...column.filterProps} />,
  },
  {
    Header: 'Teacher',
    accessor: 'teacher',
    Filter: ({ column }) => <input type="text" {...column.filterProps} />,
  },
  {
    Header: 'Students',
    accessor: 'students',
    Filter: ({ column }) => <input type="text" {...column.filterProps} />,
  },
];

const data = [
  { className: 'Math', teacher: 'Mr. Smith', students: 25 },
  { className: 'English', teacher: 'Mrs. Johnson', students: 22 },
  // Add more data as needed
];


function App() {

  useEffect(() => {
    // createCollection();
  }, []);

  const createCollection = async () => {
    try {
      const collectionRef = db.collection('yourCollectionName');

      // Add a document to the collection
      await collectionRef.add({
        field1: 'value1',
        field2: 'value2',
      });

      console.log('Document added to collection successfully!');
    } catch (error) {
      console.error('Error adding document to collection: ', error);
    }
  };

  
  
  return (
    <div className="">
        <Sidebar />
         {/* <StudentsSmartTable columns={columns} data={data} /> */}
         <SyllabusForm />
    </div>
  );
}

export default App;
