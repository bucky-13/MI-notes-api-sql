import {
  createH2,
  createH3,
  createButton,
  createIconButton,
  createDiv,
  createParagraph,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayCreateNote from './displayCreateNote.js';
import displayDeleteNote from './displayDeleteNote.js';
import displayOneNote from './displayOneNote.js';
import editNote from './editNote.js';

let app = document.querySelector('#app');

export default function displayNotesOverview() {
  let userId = localStorage.getItem('userId');
  clearAppPlusFeedbackContainer();
  if (userId) {
    let divTop = createDiv('flex');
    let divBottom = createDiv('notes-overview-flex');
    let h2 = createH2('Overview notes');
    let button = createIconButton(
      'createNoteBtn',
      'Create New Note',
      'newIcon',
      'flex-edit-btn'
    );
    divTop.append(h2, button);
    app.append(divTop, divBottom);
    document
      .querySelector('#createNoteBtn')
      .addEventListener('click', displayCreateNote);

    fetch(`http://localhost:3000/notes/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((note) => {
          let div = createDiv('notes-grid');

          let h3 = createH3(note.headline, `note-${note.noteId}`);
          let description = createParagraph(note.description);
          let date = new Date(note.created);
          let time = `${date.getHours()}:${
            (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
          }`;
          let yearMonthDay = `${date.getFullYear()}-${
            (date.getMonth() < 10 ? '0' : '') + date.getMonth()
          }-${(date.getDay() < 10 ? '0' : '') + date.getDay()}`;

          let pText = `<span class="bold">Created:</span><br> ${yearMonthDay}, ${time}`;
          let p = createParagraph(pText, 'alignment-right');

          let viewBtn = createIconButton(
            `view-btn-${note.noteId}`,
            'View',
            'search',
            'flex-edit-btn'
          );
          let editBtn = createIconButton(
            `edit-btn-${note.noteId}`,
            'Edit',
            'edit',
            'flex-edit-btn'
          );
          let deleteBtn = createIconButton(
            `delete-btn-${note.noteId}`,
            'Delete',
            'deleteIcon',
            'flex-edit-btn',
            'btn-red'
          );

          div.append(h3, description, viewBtn, editBtn, deleteBtn, p);
          divBottom.append(div);
          document
            .querySelector(`#view-btn-${note.noteId}`)
            .addEventListener('click', () => {
              displayOneNote(note.noteId);
            });

          document
            .querySelector(`#edit-btn-${note.noteId}`)
            .addEventListener('click', () => {
              editNote(note.noteId);
            });

          document
            .querySelector(`#delete-btn-${note.noteId}`)
            .addEventListener('click', () => {
              displayDeleteNote(note.noteId, note.headline, note.description);
            });
        });
      });
  } else {
    let h2 = createH2('You have no notes since you are not logged in');
    app.append(h2);
  }
}
