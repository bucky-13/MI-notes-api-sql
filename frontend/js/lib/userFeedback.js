import { createDiv, createParagraph } from './createElements.js';

let app = document.querySelector('#app');
let feedbackSection = document.querySelector('#feedbackSection');

function displayFeedbackContainer(message, pClass) {
  feedbackSection.innerHTML = '';
  let div = createDiv('feedback-container');
  let p = createParagraph(message, pClass);
  div.append(p);
  feedbackSection.append(div);
}

function clearAppPlusFeedbackContainer() {
  app.innerHTML = '';
  feedbackSection.innerHTML = '';
}

export { displayFeedbackContainer, clearAppPlusFeedbackContainer };
