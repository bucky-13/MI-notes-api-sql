import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
  createTinyMCE,
} from '../createElements.js';

let app = document.querySelector('#app');

export default function editNote(noteId) {
  let userId = localStorage.getItem('userId');
  app.innerHTML = '';
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let h2 = createH2(note.headline);
      let description = createParagraph(note.description);
      let tinyMCE = createTinyMCE(note);
      //   let p = createParagraph(note.textContent);
      app.append(h2, description, tinyMCE);

      tinymce.init({
        selector: 'textarea#tinyMCEEditor',
      });
    });
}
