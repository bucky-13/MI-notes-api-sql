import displayLogin from './userSection/displayLogin.js';
import updateNavUser from './navSection/updateNavUser.js';
import displayNotesOverview from './notesSection/displayNotesOverview.js';
import displayUserinfo from './userSection/displayUserInfo.js';
import displayAboutSection from './navSection/displayAboutSection.js';

let navNotes = document.querySelector('#navNotes');
navNotes.addEventListener('click', displayNotesOverview);

let navUsername = document.querySelector('#navUsername');
navUsername.addEventListener('click', displayUserinfo);

let logoContainer = document.querySelector('#logoContainer');
logoContainer.addEventListener('click', displayAboutSection);

updateNavUser();

if (localStorage.getItem('userId')) {
  displayNotesOverview();
} else {
  displayLogin();
}
