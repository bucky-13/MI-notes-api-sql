import editNote from './editNote.js';

export default function saveNote(noteId) {
  console.log('I will save you!');
  let userId = Number(localStorage.getItem('userId'));
  let headline = document.querySelector('#headline').textContent;
  let description = document.querySelector('#description').textContent;
  let textContent = document.querySelector('#tinyMCEEditor').value;

  let updatedNote = {
    userId: userId,
    noteId: noteId,
    headline: headline,
    description: description,
    textContent: textContent,
  };

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
      console.log('data', data);
      if (data.changedRows) {
        editNote(noteId);
      } else {
        console.log(data.message);
      }
    });

  console.log(updatedNote);
}
