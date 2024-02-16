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
      } else {
        console.log(data.message);
      }
    });
}
