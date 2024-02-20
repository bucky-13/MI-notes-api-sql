import { displayFeedbackContainer } from '../lib/userFeedback.js';
import displayNotesOverview from './displayNotesOverview.js';

export default function deleteNote(noteId) {
  let userId = Number(localStorage.getItem('userId'));

  let deletedNote = {
    noteId: noteId,
    userId: userId,
  };
  fetch('http://localhost:3000/notes/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deletedNote),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.changedRows) {
        displayNotesOverview();
        displayFeedbackContainer('Note successfully deleted', 'msg-success');
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
