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

export default function displayOneNote(noteId) {
  let userId = localStorage.getItem('userId');
  app.innerHTML = '';
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let h2 = createH2(note.headline);
      let description = createParagraph(note.description);
      let div = createDiv('tiny-mce-content');
      div.innerHTML = note.textContent;
      app.append(h2, description, div);
    });
}
