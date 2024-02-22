import { createDiv, createParagraph } from './createElements.js';

let app = document.querySelector('#app');
let feedbackSection = document.querySelector('#feedbackSection');

function displayFeedbackContainer(message, pClass) {
  feedbackSection.innerHTML = '';
  let div = createDiv('feedback-container');
  let p = createParagraph(message, pClass);
  div.append(p);
  feedbackSection.append(div);
  setTimeout(clearFeedbackContainer, 5000);
}

function clearAppPlusFeedbackContainer() {
  app.innerHTML = '';
  feedbackSection.innerHTML = '';
}
function clearFeedbackContainer() {
  feedbackSection.innerHTML = '';
}

export { displayFeedbackContainer, clearAppPlusFeedbackContainer };
