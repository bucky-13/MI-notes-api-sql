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
import displayOneNote from './displayOneNote.js';

let app = document.querySelector('#app');

export default function displayNotesOverview() {
  let userId = localStorage.getItem('userId');
  app.innerHTML = '';
  if (userId) {
    let divTop = createDiv('flex');
    let h2 = createH2('Look at all these notes! :D');
    let button = createButton('createNoteBtn', 'Create New Note');
    divTop.append(h2, button);
    app.append(divTop);
    document
      .querySelector('#createNoteBtn')
      .addEventListener('click', displayCreateNote);

    fetch(`http://localhost:3000/notes/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((note) => {
          let div = createDiv('whiteboard');

          let h3 = createH3(note.headline, `note-${note.noteId}`);
          let description = createParagraph(note.description);
          let pText = 'Created: ' + note.created;
          let p = createParagraph(pText);
          let viewBtn = createButton(`view-btn-${note.noteId}`, 'View');
          let editBtn = createButton(`edit-btn-${note.noteId}`, 'Edit');

          div.append(h3, description, viewBtn, editBtn, p);
          app.append(div);
          document
            .querySelector(`#view-btn-${note.noteId}`)
            .addEventListener('click', () => {
              displayOneNote(note.noteId);
            });
        });
      });
  } else {
    let h2 = createH2('You have no notes since you are not logged in');
    app.append(h2);
  }
}
