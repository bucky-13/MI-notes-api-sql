import {
  createH2,
  createButton,
  createIconButton,
  createDiv,
  createParagraph,
  createTinyMCE,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayEditDescription from './DisplayEditDescription.js';
import displayEditHeadline from './displayEditHeadline.js';
import saveNote from './saveNote.js';

let app = document.querySelector('#app');

export default function editNote(noteId) {
  let userId = localStorage.getItem('userId');
  clearAppPlusFeedbackContainer();
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let h2 = createH2(note.headline, 'headline');
      let editBtn = createIconButton(`editH2Btn`, '', 'edit', 'flex-edit-btn');
      let h2Div = createDiv('flex', 'h2Div');
      h2Div.append(h2, editBtn);
      let description = createParagraph(note.description, '', 'description');
      let editDescBtn = createIconButton(
        `editDescBtn`,
        '',
        'edit',
        'flex-edit-btn'
      );
      let descDiv = createDiv('flex', 'descDiv');
      descDiv.append(description, editDescBtn);

      let tinyMCE = createTinyMCE(note);
      let button = createButton('saveNoteBtn', 'Save Note', 'margin-top-1-rem');
      app.append(h2Div, descDiv, tinyMCE, button);

      tinymce.init({
        selector: 'textarea#tinyMCEEditor',
        height: 600,
        width: '90%',
        skin: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'oxide-dark'
          : 'oxide',
        content_css: window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'default',
        plugins: 'code',
        toolbar:
          'undo redo | styleselect bold italic blockquote | forecolor backcolor | alignleft aligncenter alignright | bullist numlist outdent indent code | cut copy paste | visualaid',

        setup: function (editor) {
          editor.on('change', function () {
            editor.save();
          });
        },
      });

      document.querySelector('#saveNoteBtn').addEventListener('click', () => {
        saveNote(noteId);
      });
      document.querySelector('#editH2Btn').addEventListener('click', () => {
        displayEditHeadline(noteId);
      });
      document.querySelector('#editDescBtn').addEventListener('click', () => {
        displayEditDescription(noteId);
      });
    });
}
