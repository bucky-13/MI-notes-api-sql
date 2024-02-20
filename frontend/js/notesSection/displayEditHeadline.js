import { createIconButton, createInputNoLabel } from '../lib/createElements.js';
import saveHeadline from './saveHeadline.js';

export default function displayEditHeadline(noteId) {
  let h2Div = document.querySelector('#h2Div');
  let h2text = document.querySelector('#headline').textContent;
  let input = createInputNoLabel('text', h2text, 'headline', 'textfield');

  h2Div.innerHTML = '';
  h2Div.classList.add('margin-top-1-rem');

  let saveBtn = createIconButton(
    'saveHeadlineBtn',
    'Save',
    'save',
    'flex-edit-btn'
  );

  h2Div.append(input, saveBtn);

  document.querySelector('#saveHeadlineBtn').addEventListener('click', () => {
    saveHeadline(noteId);
  });
}
