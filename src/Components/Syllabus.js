import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import db from '../config/firebaseconfig';
import CustomDropDown from './CustomDropDown';

const BoardType = ["CBSE", "ICSE", "IB", "NIOS", "UP Board"];
const ClassType = ["Class I", "Class II", "Class III", "Class IV", "Class V"];
const SubjectType = ["Hindi", "English", "Math", "Physics", "CS"];
const Years = ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24"];

const SyllabusForm = () => {
  const [board, setBoard] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState([{ topic: '', subtopics: [''] }]);

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index].topic = value;
    setTopics(updatedTopics);
  };

  const handleSubtopicChange = (topicIndex, subtopicIndex, value) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].subtopics[subtopicIndex] = value;
    setTopics(updatedTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, { topic: '', subtopics: [''] }]);
  };

  const handleAddSubtopic = (topicIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].subtopics.push('');
    setTopics(updatedTopics);
  };

  const handleSaveSyllabus = async () => {
    // Save syllabus data to Firestore
    const syllabusData = {
      board,
      classLevel,
      subject,
      year,
      description,
      topics,
    };
    console.log(syllabusData, 'syllabusData')
    return
    try {
      // Assuming 'syllabus' is your Firestore collection name
      await db.collection('syllabus').add(syllabusData);
      console.log('Syllabus saved successfully!');
      // You can add a success message or redirect the user to another page.
    } catch (error) {
      console.error('Error saving syllabus:', error);
      // Handle error, show an error message, or log the error as needed.
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Syllabus Form
      </Typography>
      <form>
        {/* Dropdowns for board, class, subject, and year selection */}
        <CustomDropDown title={"Board"} value={board} setValue={setBoard} MenuData={BoardType} />
        <CustomDropDown title={"Class"} value={classLevel} setValue={setClassLevel} MenuData={ClassType} />
        <CustomDropDown title={"Subject"} value={subject} setValue={setSubject} MenuData={SubjectType} />
        <CustomDropDown title={"Acedmic years"} value={year} setValue={setYear} MenuData={Years} />
        {/* Similar dropdowns for class, subject, and year */}

        {/* Metadata form */}
        <TextField
          label="Small Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
        />

        {/* Dynamic Topics and Subtopics */}
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} style={{ marginBottom: '1.5rem' }}>
            <TextField
              label={`Topic ${topicIndex + 1}`}
              variant="outlined"
              fullWidth
              value={topic.topic}
              onChange={(e) => handleTopicChange(topicIndex, e.target.value)}
            />
            <Button onClick={handleAddTopic} style={{ marginTop: '1rem' }}>
              Remove Topic
            </Button>
            {topic.subtopics.map((subtopic, subtopicIndex) => (
              <>
                <TextField
                  key={subtopicIndex}
                  label={`Subtopic ${subtopicIndex + 1}`}
                  variant="outlined"
                  fullWidth
                  value={subtopic}
                  onChange={(e) => handleSubtopicChange(topicIndex, subtopicIndex, e.target.value)}
                  style={{ marginTop: '1rem' }}
                />
                <Button onClick={() => handleAddSubtopic(topicIndex)} style={{ marginTop: '1rem' }}>
                  Remove Subtopic
                </Button>
              </>
            ))}
            <Button onClick={() => handleAddSubtopic(topicIndex)} style={{ marginTop: '1rem' }}>
              Add Subtopic
            </Button>
          </div>
        ))}
        <Button onClick={handleAddTopic} style={{ marginTop: '1rem' }}>
          Add Topic
        </Button>

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSyllabus}
          disabled={!board || !classLevel || !subject || !year || !description || topics.some(t => t.topic === '' || t.subtopics.some(st => st === ''))}
          style={{ marginTop: '1.5rem' }}
        >
          Save Syllabus
        </Button>
      </form>
    </Container>
  );
};

export default SyllabusForm;
