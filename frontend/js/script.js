import displayLogin from './userSection/displayLogin.js';
import updateNavUser from './navSection/updateNavUser.js';
import displayNotesOverview from './notesSection/displayNotesOverview.js';
import displayUserinfo from './userSection/displayUserInfo.js';

tinymce.init({
  selector: 'textarea#default',
});

let navNotes = document.querySelector('#navNotes');
navNotes.addEventListener('click', displayNotesOverview);

let navUsername = document.querySelector('#navUsername');
navUsername.addEventListener('click', displayUserinfo);

updateNavUser();

if (localStorage.getItem('userId')) {
  displayNotesOverview();
} else {
  displayLogin();
}
