import { displayFeedbackContainer } from '../lib/userFeedback.js';
import editNote from './editNote.js';

export default function saveNote(noteId) {
  // console.log('I will save you!');
  let userId = Number(localStorage.getItem('userId'));

  let headlineDOM = document.querySelector('#headline');
  let headline = '';

  if (headlineDOM.tagName === 'H2') {
    headline = document.querySelector('#headline').textContent;
  } else if (headlineDOM.tagName === 'INPUT') {
    headline = document.querySelector('#headline').value;
  }

  let descriptionDOM = document.querySelector('#description');
  let description = document.querySelector('#description');

  if (descriptionDOM.tagName === 'P') {
    description = document.querySelector('#description').textContent;
  } else if (descriptionDOM.tagName === 'INPUT') {
    description = document.querySelector('#description').value;
  }

  let textContent = document.querySelector('#tinyMCEEditor').value;

  let updatedNote = {
    userId: userId,
    noteId: noteId,
    headline: headline,
    description: description,
    textContent: textContent,
  };

  console.log(updatedNote);

  console.log(typeof textContent);

  fetch('http://localhost:3000/notes/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.info) {
        editNote(noteId);
        displayFeedbackContainer('Note saved successfully!', 'msg-success');
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });

  // console.log(updatedNote);
}
