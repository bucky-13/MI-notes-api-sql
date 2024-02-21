import {
  createH2,
  createButton,
  createIconButton,
  createDiv,
  createParagraph,
  createTinyMCE,
} from '../lib/createElements.js';
import removeTinyMCE from '../lib/removeTinyMCE.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayEditDescription from './DisplayEditDescription.js';
import displayEditHeadline from './displayEditHeadline.js';
import displayOneNote from './displayOneNote.js';
import saveNote from './saveNote.js';

let app = document.querySelector('#app');

export default function editNote(noteId) {
  let userId = localStorage.getItem('userId');
  clearAppPlusFeedbackContainer();
  fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
    .then((res) => res.json())
    .then((note) => {
      let fullNoteDiv = createDiv('tiny-mce-content-centered', 'fullNoteDiv');
      let h2 = createH2(note.headline, 'headline');
      h2.classList.add('edit-note-h2');
      let edith2Btn = createIconButton(
        `editH2Btn`,
        '',
        'edit',
        'flex-edit-btn'
      );
      let h2Div = createDiv('edit-h2-div', 'h2Div');
      h2Div.append(h2, edith2Btn);
      let description = createParagraph(note.description, '', 'description');
      let editDescBtn = createIconButton(
        `editDescBtn`,
        '',
        'edit',
        'flex-edit-btn'
      );
      let descDiv = createDiv('edit-desc-div', 'descDiv');
      descDiv.append(description, editDescBtn);
      let tinyMCE = createTinyMCE(note);
      let btnDiv = createDiv('view-note-btns');
      let saveButton = createIconButton(
        'saveNoteBtn',
        'Save Note',
        'save',
        'flex-edit-btn'
      );
      let viewButton = createIconButton(
        `viewNoteBtn`,
        'View Note',
        'search',
        'flex-edit-btn'
      );
      btnDiv.append(viewButton, saveButton);
      fullNoteDiv.append(h2Div, descDiv, tinyMCE, btnDiv);
      app.append(fullNoteDiv);

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
        removeTinyMCE();
        saveNote(noteId);
      });
      document.querySelector('#editH2Btn').addEventListener('click', () => {
        displayEditHeadline(noteId);
      });
      document.querySelector('#editDescBtn').addEventListener('click', () => {
        displayEditDescription(noteId);
      });
      document.querySelector('#viewNoteBtn').addEventListener('click', () => {
        removeTinyMCE();
        displayOneNote(noteId);
      });
    });
}
