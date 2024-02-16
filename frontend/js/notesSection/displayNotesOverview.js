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
          let a = createLink(`link-${note.noteId}`, '');
          let h3 = createH3(note.headline, `note-${note.noteId}`);
          a.append(h3);
          let pText = 'Created: ' + note.created;
          let p = createParagraph(pText);

          div.append(a, p);
          app.append(div);
          document
            .querySelector(`#note-${note.noteId}`)
            .addEventListener('click', () => {
              console.log('I work? ' + note.noteId);
            });
        });
      });
  } else {
    let h2 = createH2('You have no notes since you are not logged in');
    app.append(h2);
  }
}
