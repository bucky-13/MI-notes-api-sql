import { displayFeedbackContainer } from '../lib/userFeedback.js';
import updateNavUser from '../navSection/updateNavUser.js';
import displayUserinfo from './displayUserInfo.js';

export default function updateUser() {
  let oldPassword = document.querySelector('#oldPassword').value;
  let newPassword = document.querySelector('#newPassword').value;
  let userEmail = document.querySelector('#userEmail').value;
  let userName = document.querySelector('#userName').value;
  let userId = localStorage.getItem('userId');

  if (newPassword == '') {
    newPassword = oldPassword;
  }

  let updatedUserInformation = {
    userId: userId,
    userEmail: userEmail,
    userName: userName,
    newPassword: newPassword,
    oldPassword: oldPassword,
  };

  fetch('http://localhost:3000/users/updateUser', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUserInformation),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.userId) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('userEmail', data.userEmail);
        updateNavUser();
        displayUserinfo();
        displayFeedbackContainer(
          'Your information has been successfully updated!',
          'msg-success'
        );
      } else {
        displayFeedbackContainer(data.message, 'msg-failure');
      }
    });
}
