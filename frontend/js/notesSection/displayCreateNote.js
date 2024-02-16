import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
} from '../createElements.js';
import createNote from './createNote.js';

let app = document.querySelector('#app');

export default function displayCreateNote() {
  app.innerHTML = '';

  let h2 = createH2('Create New Note');
  let inputHeadline = createInputWithLabel(
    'text',
    'headline',
    'Note Headline: '
  );
  let inputDescription = createInputWithLabel(
    'text',
    'description',
    'Note Description: '
  );
  let button = createButton(
    'createNoteBtn',
    'Save Note and start writing',
    'margin-top-1-rem'
  );

  app.append(h2, inputHeadline, inputDescription, button);
  let headline = document.querySelector('#headline');
  let description = document.querySelector('#description');

  document.querySelector('#createNoteBtn').addEventListener('click', () => {
    createNote(headline.value, description.value);
    // console.log(headline.value + ', ' + description.value);
  });
}
