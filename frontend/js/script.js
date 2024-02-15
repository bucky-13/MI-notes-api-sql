import displayLogin from './userSection/displayLogin.js';
import updateNavUser from './navSection/updateNavUser.js';
import displayNotesOverview from './notesSection/displayNotesOverview.js';

tinymce.init({
  selector: 'textarea#default',
});

let navNotes = document.querySelector('#navNotes');
navNotes.addEventListener('click', displayNotesOverview);

updateNavUser();

if (localStorage.getItem('userId')) {
  displayNotesOverview();
} else {
  displayLogin();
}
