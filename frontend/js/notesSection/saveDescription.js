import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createIconButton,
  createLink,
  createDiv,
  createParagraph,
  createTinyMCE,
} from '../lib/createElements.js';
import displayEditDescription from './DisplayEditDescription.js';
import saveNote from './saveNote.js';

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

  console.log(typeof textContent);

  fetch('http://localhost:3000/notes/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      if (data.info) {
        fetch(`http://localhost:3000/notes/${userId}/${noteId}`)
          .then((res) => res.json())
          .then((note) => {
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
            let descDiv = createDiv('flex', 'descDiv');
            descDiv.append(description, editDescBtn);
            let tinyMCEEditor = document.querySelector('#tinyMCEEditor');
            app.insertBefore(descDiv, tinyMCEEditor);
            document
              .querySelector('#editDescBtn')
              .addEventListener('click', () => {
                displayEditDescription(noteId);
              });
          });
      } else {
        console.log(data.message);
      }
    });
}