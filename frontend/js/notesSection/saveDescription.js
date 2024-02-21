import {
  createIconButton,
  createDiv,
  createParagraph,
} from '../lib/createElements.js';
import { displayFeedbackContainer } from '../lib/userFeedback.js';
import displayEditDescription from './DisplayEditDescription.js';

export default function saveDescription(noteId) {
  let userId = Number(localStorage.getItem('userId'));

  let headlineDOM = document.querySelector('#headline');
  let headline = '';

  if (headlineDOM.tagName === 'H2') {
    headline = document.querySelector('#headline').textContent;
  } else if (headlineDOM.tagName === 'INPUT') {
    headline = document.querySelector('#headline').value;
  }

  let descriptionDOM = document.querySelector('#description');
  let description = document.querySelector('#description');

  if (descriptionDOM.tagName === 'P') {
    description = document.querySelector('#description').textContent;
  } else if (descriptionDOM.tagName === 'INPUT') {
    description = document.querySelector('#description').value;
  }

  let textContent = document.querySelector('#tinyMCEEditor').value;

  let updatedNote = {
    userId: userId,
    noteId: noteId,
    headline: headline,
    description: description,
    textContent: textContent,
  };

  fetch('http://localhost:3000/notes/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.info) {
        fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
          .then((res) => res.json())
          .then((note) => {
            let fullNoteDiv = document.querySelector('#fullNoteDiv');
            document.querySelector('#descDiv').remove();
            let description = createParagraph(
              note.description,
              '',
              'description'
            );
            let editDescBtn = createIconButton(
              `editDescBtn`,
              '',
              'edit',
              'flex-edit-btn'
            );
            let descDiv = createDiv('edit-desc-div', 'descDiv');
            descDiv.append(description, editDescBtn);
            let tinyMCEEditor = document.querySelector('#tinyMCEEditor');
            fullNoteDiv.insertBefore(descDiv, tinyMCEEditor);
            document
              .querySelector('#editDescBtn')
              .addEventListener('click', () => {
                displayEditDescription(noteId);
              });
          });
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
