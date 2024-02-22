export default function removeTinyMCE() {
  let textarea = document.querySelector('textarea');
  if (textarea) {
    tinymce.activeEditor.remove('textarea');
  }
}
