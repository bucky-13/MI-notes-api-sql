import { displayFeedbackContainer } from '../lib/userFeedback.js';
import loginUser from './loginUser.js';

export default function createUser() {
  let userName = document.querySelector('#userName');
  let userEmail = document.querySelector('#userEmail');
  let userPassword = document.querySelector('#userPassword');

  let user = {
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  console.log(user);

  fetch('http://localhost:3000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertId) {
        loginUser();
        displayFeedbackContainer(
          'Account successfully created.',
          'msg-success'
        );
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
