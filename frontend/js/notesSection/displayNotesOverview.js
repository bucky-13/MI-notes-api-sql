import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
} from '../createElements.js';

let app = document.querySelector('#app');

export default function displayNotesOverview() {
  app.innerHTML = '';
  if (localStorage.getItem('userId')) {
    let h2 = createH2('Look at all these notes! :D');
    app.append(h2);
  } else {
    let h2 = createH2('You have no notes since you are not logged in');
    app.append(h2);
  }
}
