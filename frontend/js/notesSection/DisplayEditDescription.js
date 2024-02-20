import { createIconButton, createInputNoLabel } from '../lib/createElements.js';
import saveDescription from './saveDescription.js';

export default function displayEditDescription(noteId) {
  let descDiv = document.querySelector('#descDiv');
  let descText = document.querySelector('#description').textContent;
  let input = createInputNoLabel('text', descText, 'description', 'textfield');

  descDiv.innerHTML = '';
  descDiv.classList.add('margin-top-1-rem');

  let saveBtn = createIconButton(
    'saveDescriptionBtn',
    'Save',
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
