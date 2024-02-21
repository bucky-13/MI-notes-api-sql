import removeTinyMCE from '../lib/removeTinyMCE.js';
import displayLogin from '../userSection/displayLogin.js';
import logoutUser from '../userSection/logoutUser.js';

let navUsername = document.querySelector('#navUsername');
let navUserBtn = document.querySelector('#navUserBtn');

export default function updateNavUser() {
  if (localStorage.getItem('userId')) {
    navUsername.textContent =
      'Logged in as: ' + localStorage.getItem('userName');
    navUserBtn.textContent = 'Log out';
    navUserBtn.removeEventListener('click', displayLogin);
    navUserBtn.addEventListener('click', () => {
      removeTinyMCE();
      logoutUser();
    });
  } else {
    navUsername.textContent = '';
    navUserBtn.textContent = 'Log In / Create Account';
    navUserBtn.removeEventListener('click', logoutUser);
    navUserBtn.addEventListener('click', displayLogin);
  }
}
