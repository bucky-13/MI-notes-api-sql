import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
} from '../createElements.js';
import deleteNote from './deleteNote.js';
import displayOneNote from './displayOneNote.js';

let app = document.querySelector('#app');

export default function displayDeleteNote(noteId, headline, description) {
  app.innerHTML = '';
  let h2 = createH2('Do you really want to delete this note?');
  let h3 = createH3(headline);
  let p = createParagraph(description);
  let btnReturn = createButton('viewNote', 'No, view the note instead');
  let btnDelete = createButton(
    'deleteNote',
    'Yes, delete this note',
    'btn-red'
  );
  app.append(h2, h3, p, btnReturn, btnDelete);

  document.querySelector('#viewNote').addEventListener('click', () => {
    displayOneNote(noteId);
  });
  document.querySelector('#deleteNote').addEventListener('click', () => {
    deleteNote(noteId);
  });
}
