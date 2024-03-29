import {
  createH2,
  createIconButton,
  createDiv,
} from '../lib/createElements.js';
import { displayFeedbackContainer } from '../lib/userFeedback.js';
import displayEditHeadline from './displayEditHeadline.js';

export default function saveHeadline(noteId) {
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
            document.querySelector('#h2Div').remove();
            let h2 = createH2(note.headline, 'headline');
            h2.classList.add('edit-note-h2');
            let editBtn = createIconButton(
              `editH2Btn`,
              '',
              'edit',
              'flex-edit-btn'
            );
            let h2Div = createDiv('edit-h2-div', 'h2Div');
            h2Div.append(h2, editBtn);
            fullNoteDiv.prepend(h2Div);
            document
              .querySelector('#editH2Btn')
              .addEventListener('click', () => {
                displayEditHeadline(noteId);
              });
          });
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
