import updateNavUser from '../navSection/updateNavUser.js';
import displayLogin from './displayLogin.js';

export default function logoutUser() {
  localStorage.clear();
  updateNavUser();
  displayLogin();
}
