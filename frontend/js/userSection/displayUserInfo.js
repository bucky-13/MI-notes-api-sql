import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
  createDiv,
  createParagraph,
} from '../lib/createElements.js';
let app = document.querySelector('#app');

export default function displayUserinfo() {
  let userId = localStorage.getItem('userId');
  let userName = localStorage.getItem('userName');
  let userEmail = localStorage.getItem('userEmail');

  if (userId) {
    app.innerHTML = '';
    console.log('you are logged in');
    let h2 = createH2('User information about: ' + userName);
    let div = createDiv('flex-column');
    let p1 = createParagraph(`User Name: ${userName}`);
    let p2 = createParagraph(`User Email: ${userEmail}`);
    let p3 = createParagraph(`User Id: ${userId}`);
    div.append(p1, p2, p3);
    let button = createButton(
      'changeUserDataBtn',
      'Update your personal information (not functional yet)',
      'margin-top-1-rem'
    );
    app.append(h2, div, button);
  }
}
