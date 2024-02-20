import { displayFeedbackContainer } from '../lib/userFeedback.js';
import updateNavUser from '../navSection/updateNavUser.js';
import displayNotesOverview from '../notesSection/displayNotesOverview.js';

export default function loginUser() {
  let userEmail = document.querySelector('#userEmail');
  let userPassword = document.querySelector('#userPassword');

  let user = {
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.userId) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userEmail', data.userEmail);
        updateNavUser();
        displayNotesOverview();
        displayFeedbackContainer('Login successful.', 'msg-success');
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
