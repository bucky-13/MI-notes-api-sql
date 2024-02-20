import { displayFeedbackContainer } from '../lib/userFeedback.js';
import updateNavUser from '../navSection/updateNavUser.js';
import displayLogin from './displayLogin.js';

export default function logoutUser() {
  localStorage.clear();
  updateNavUser();
  displayLogin();
  displayFeedbackContainer('Logout successful.', 'msg-success');
}
