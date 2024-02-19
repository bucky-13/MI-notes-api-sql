import displayLogin from './displayLogin.js';
import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
} from '../lib/createElements.js';
import createUser from './createUser.js';

let app = document.querySelector('#app');

export default function displayCreateUser() {
  app.innerHTML = '';
  let h2 = createH2('Create new Account');
  let nameInput = createInputWithLabel('text', 'userName', 'User name:');
  let emailInput = createInputWithLabel('email', 'userEmail', 'Email:');
  let passwordInput = createInputWithLabel(
    'password',
    'userPassword',
    'Password:'
  );
  let link = createLink(
    'goToLoginLink',
    'Already a user? Click here to log in',
    'margin-top-1-rem'
  );
  let button = createButton('submitBtn', 'Create Account', 'margin-top-1-rem');

  app.append(h2, nameInput, emailInput, passwordInput, button, link);

  document.querySelector('#submitBtn').addEventListener('click', createUser);

  document
    .querySelector('#goToLoginLink')
    .addEventListener('click', displayLogin);
}
