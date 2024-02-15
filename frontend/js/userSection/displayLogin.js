import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
} from '../createElements.js';
import displayCreateUser from './displayCreateUser.js';

let app = document.querySelector('#app');

export default function displayLogin() {
  app.innerHTML = '';
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

  let userEmail = document.querySelector('#userEmail');
  let userPassword = document.querySelector('#userPassword');

  document.querySelector('#submitBtn').addEventListener('click', () => {
    console.log(userEmail.value, userPassword.value);
  });

  document
    .querySelector('#addNewUserLink')
    .addEventListener('click', displayCreateUser);
}
