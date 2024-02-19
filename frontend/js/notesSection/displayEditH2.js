import { createIconButton, createInputNoLabel } from '../lib/createElements.js';

export default function displayEditH2(noteId) {
  let h2Div = document.querySelector('#h2Div');
  let h2text = document.querySelector('#headline').textContent;
  let input = createInputNoLabel('text', h2text, 'h2Input', 'textfield');
  h2Div.innerHTML = '';
  h2Div.classList.add('margin-top-1-rem');
  let saveBtn = createIconButton('saveH2Btn', 'Save', 'save', 'flex-edit-btn');
  // let saveBtn = create;
  h2Div.append(input, saveBtn);
  // console.log(h2content);
}
