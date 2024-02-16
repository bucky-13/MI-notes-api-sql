import {
  createH2,
  createH3,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
} from '../createElements.js';

let app = document.querySelector('#app');

export default function displayCreateNote() {
  app.innerHTML = '';

  let h2 = createH2('Create New Note');
  let input = createInputWithLabel('text', 'headline', 'Note Headline: ');
  let button = createButton(
    'createNoteBtn',
    'Save Note and start writing',
    'margin-top-1-rem'
  );

  app.append(h2, input, button);
}
