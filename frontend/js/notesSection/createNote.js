import { displayFeedbackContainer } from '../lib/userFeedback.js';
import editNote from './displayEditNote.js';

export default function createNote(headline, description) {
  let userId = Number(localStorage.getItem('userId'));

  let newNote = {
    userId: userId,
    headline: headline,
    description: description,
  };

  fetch('http://localhost:3000/notes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertId) {
        editNote(data.insertId);
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
