import {
  createH2,
  createInputWithLabel,
  createButton,
  createLink,
} from '../createElements.js';

let app = document.querySelector('#app');

export default function displayNotesOverview() {
  app.innerHTML = '';
  let h2 = createH2('Look at all these notes! :D');

  app.append(h2);
}
