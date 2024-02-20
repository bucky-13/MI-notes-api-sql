import {
  createH2,
  createButton,
  createDiv,
  createParagraph,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayUpdateUser from './displayUpdateUser.js';
let app = document.querySelector('#app');

export default function displayUserinfo() {
  let userId = localStorage.getItem('userId');
  let userName = localStorage.getItem('userName');
  let userEmail = localStorage.getItem('userEmail');

  if (userId) {
    clearAppPlusFeedbackContainer();
    let h2 = createH2('User information about: ' + userName);
    let div = createDiv('flex-column');
    let p1 = createParagraph(`User Name: ${userName}`);
    let p2 = createParagraph(`User Email: ${userEmail}`);
    let p3 = createParagraph(`User Id: ${userId}`);
    div.append(p1, p2, p3);
    let button = createButton(
      'updateUserDataBtn',
      'Update your personal information',
      'margin-top-1-rem'
    );
    app.append(h2, div, button);

    document
      .querySelector('#updateUserDataBtn')
      .addEventListener('click', () => {
        displayUpdateUser();
      });
  }
}
