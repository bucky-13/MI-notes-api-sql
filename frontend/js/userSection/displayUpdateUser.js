import {
  createH2,
  createInputWithLabel,
  createButton,
  createParagraph,
  createDiv,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import updateUser from './updateUser.js';
let app = document.querySelector('#app');

export default function displayUpdateUser() {
  clearAppPlusFeedbackContainer();
  let userName = localStorage.getItem('userName');
  let userEmail = localStorage.getItem('userEmail');

  let h2 = createH2('Update user information:');

  let userNameInput = createInputWithLabel(
    'text',
    'userName',
    'User Name: ',
    userName
  );
  let userEmailInput = createInputWithLabel(
    'email',
    'userEmail',
    'Email: ',
    userEmail
  );
  let newPasswordInput = createInputWithLabel(
    'password',
    'newPassword',
    'New Password: (optional) '
  );

  let div = createDiv('user-info-update-div');
  let p = createParagraph(
    'To update your new user information, type in your old password.'
  );
  div.append(p);

  let oldPasswordInput = createInputWithLabel(
    'password',
    'oldPassword',
    'Old Password:'
  );

  let updateUserBtn = createButton(
    'updateUserBtn',
    'Update user information',
    'margin-top-1-rem'
  );

  app.append(
    h2,
    userNameInput,
    userEmailInput,
    newPasswordInput,
    div,
    oldPasswordInput,
    updateUserBtn
  );

  document.querySelector('#updateUserBtn').addEventListener('click', () => {
    updateUser();
  });
}
