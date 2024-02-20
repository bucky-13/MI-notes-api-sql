import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
} from '../lib/createElements.js';
import { clearAppPlusFeedbackContainer } from '../lib/userFeedback.js';
import displayCreateUser from './displayCreateUser.js';
import loginUser from './loginUser.js';

let app = document.querySelector('#app');

export default function displayLogin() {
  clearAppPlusFeedbackContainer();
  let h2 = createH2('Login');
  let emailInput = createInputWithLabel('email', 'userEmail', 'Email:');
  let passwordInput = createInputWithLabel(
    'password',
    'userPassword',
    'Password:'
  );
  let button = createButton('submitBtn', 'Login', 'margin-top-1-rem');
  let link = createLink(
    'addNewUserLink',
    'Not a user? Click here to create an account',
    'margin-top-1-rem'
  );

  app.append(h2, emailInput, passwordInput, button, link);

  document.querySelector('#submitBtn').addEventListener('click', loginUser);

  document
    .querySelector('#addNewUserLink')
    .addEventListener('click', displayCreateUser);
}
