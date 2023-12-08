
import db from './config/firebaseconfig';
import React, {useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import SyllabusForm from './Components/Syllabus';
import { Table } from './Table/Table.tsx';




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
        <Table />
         {/* <SyllabusForm /> */}
    </div>
  );
}

export default App;
