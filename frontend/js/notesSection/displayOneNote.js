import {
  createH2,
  createButton,
  createDiv,
  createParagraph,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayDeleteNote from './displayDeleteNote.js';
import editNote from './editNote.js';

let app = document.querySelector('#app');

export default function displayOneNote(noteId) {
  let userId = localStorage.getItem('userId');
  clearAppPlusFeedbackContainer();
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let fullNoteDiv = createDiv('tiny-mce-content');

      let btnDiv = createDiv('view-note-btns');
      let editButton = createButton('editNoteBtn', 'Edit Note');
      let deleteButton = createButton(
        'deleteNoteBtn',
        'Delete Note',
        'btn-red'
      );
      btnDiv.append(editButton, deleteButton);

      let h2 = createH2(note.headline);
      h2.classList.add('view-note-h2');
      let description = createParagraph(note.description, 'viewNoteP');
      let div = createDiv('view-note-text-content-container');
      div.innerHTML = note.textContent;
      fullNoteDiv.append(h2, description, div, btnDiv);
      app.append(fullNoteDiv);

      document.querySelector(`#editNoteBtn`).addEventListener('click', () => {
        editNote(noteId);
      });

      document.querySelector(`#deleteNoteBtn`).addEventListener('click', () => {
        displayDeleteNote(note.noteId, note.headline, note.description);
      });
    });
}
