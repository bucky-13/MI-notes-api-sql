import {
  createDiv,
  createIconButton,
  createInputNoLabel,
} from '../lib/createElements.js';
import saveDescription from './saveDescription.js';

export default function displayEditDescription(noteId) {
  let descDiv = document.querySelector('#descDiv');
  let descText = document.querySelector('#description').textContent;

  let input = createInputNoLabel(
    'text',
    descText,
    'description',
    'textfield-100-w'
  );

  descDiv.innerHTML = '';
  descDiv.classList.add('edit-mode');

  let saveBtn = createIconButton(
    'saveDescriptionBtn',
    '',
    'save',
    'flex-edit-btn'
  );

  descDiv.append(input, saveBtn);

  document
    .querySelector('#saveDescriptionBtn')
    .addEventListener('click', () => {
      saveDescription(noteId);
    });
}
