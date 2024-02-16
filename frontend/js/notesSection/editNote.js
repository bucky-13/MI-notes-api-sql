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
import saveNote from './saveNote.js';

let app = document.querySelector('#app');

export default function editNote(noteId) {
  let userId = localStorage.getItem('userId');
  app.innerHTML = '';
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let h2 = createH2(note.headline, 'headline');
      let description = createParagraph(note.description, '', 'description');
      let tinyMCE = createTinyMCE(note);
      let button = createButton('saveNoteBtn', 'Save Note', 'margin-top-1-rem');
      app.append(h2, description, tinyMCE, button);

      tinymce.init({
        selector: 'textarea#tinyMCEEditor',
        plugins: 'code',
        toolbar:
          'undo redo | styleselect bold italic | forecolor backcolor | alignleft aligncenter alignright | code',

        setup: function (editor) {
          editor.on('change', function () {
            editor.save();
          });
        },
      });

      document.querySelector('#saveNoteBtn').addEventListener('click', () => {
        saveNote(noteId);
      });
    });
}
