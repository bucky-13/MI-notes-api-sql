import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
} from '../createElements.js';
import displayCreateNote from './displayCreateNote.js';
import displayDeleteNote from './displayDeleteNote.js';
import editNote from './editNote.js';

let app = document.querySelector('#app');

export default function displayOneNote(noteId) {
  let userId = localStorage.getItem('userId');
  app.innerHTML = '';
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let btnDiv = createDiv('flex');
      let editButton = createButton('editNoteBtn', 'Edit Note');
      let deleteButton = createButton(
        'deleteNoteBtn',
        'Delete Note',
        'btn-red'
      );
      btnDiv.append(editButton, deleteButton);

      let h2 = createH2(note.headline);
      let description = createParagraph(note.description);
      let div = createDiv('tiny-mce-content');
      div.innerHTML = note.textContent;
      app.append(btnDiv, h2, description, div);

      document.querySelector(`#editNoteBtn`).addEventListener('click', () => {
        editNote(noteId);
      });

      document.querySelector(`#deleteNoteBtn`).addEventListener('click', () => {
        displayDeleteNote(note.noteId, note.headline, note.description);
      });
    });
}
