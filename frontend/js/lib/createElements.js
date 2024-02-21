import createIcon from './createIcons.js';

// pass in the text that will be displayed in the h2 element
function createH2(text, id) {
  let h2 = document.createElement('h2');
  h2.textContent = text;
  if (id) {
    h2.id = id;
  }
  return h2;
}

// pass in the text that will be displayed in the h2 element
function createH3(text, id) {
  let h3 = document.createElement('h3');
  h3.textContent = text;
  if (id) {
    h3.id = id;
  }
  return h3;
}

// first parameter: the type of input (i.e. text, password etc)
// second parameter: the id for the input
// third parameter: the text displayed in the span (essentially the label)
// fourth parameter: OPTIONAL, value in input
function createInputWithLabel(type, id, spanText, value) {
  let label = document.createElement('label');
  label.classList.add('form-label');

  let span = document.createElement('span');
  span.textContent = spanText;

  let input = document.createElement('input');
  input.setAttribute('type', type);
  input.classList.add('textfield');
  input.id = id;

  if (value) {
    input.value = value;
  }

  label.append(span, input);
  return label;
}

function createInputNoLabel(type, textContent, id, inputClass) {
  let input = document.createElement('input');

  input.setAttribute('type', type);
  input.id = id;
  input.value = textContent;
  if (inputClass) {
    input.classList.add(inputClass);
  }

  return input;
}

// first parameter: the Id of the button
// second parameter: the text displayed in the button
// thrid parameter: OPTIONAL. if a class is needed, add the class here
function createButton(btnId, btnText, btnClass) {
  let btn = document.createElement('button');
  btn.textContent = btnText;
  btn.id = btnId;
  if (btnClass) {
    btn.classList.add(btnClass);
  }
  return btn;
}
// first parameter: the Id of the button
// second parameter: the text displayed in the button
// third parameter: the icon for the button
// fourth parameter: OPTIONAL. if a class is needed, add the class here
function createIconButton(btnId, btnText, btnIconType, btnClass, btnClass2) {
  let btn = document.createElement('button');
  let btnIcon = createIcon(btnIconType);
  if (btnText === '') {
    btn.innerHTML = `${btnIcon}`;
  } else {
    let btnP = `<p>${btnText}</p>`;
    btn.innerHTML = `${btnIcon} ${btnP}`;
  }
  btn.id = btnId;
  if (btnClass) {
    btn.classList.add(btnClass);
  }
  if (btnClass2) {
    btn.classList.add(btnClass2);
  }
  return btn;
}

// first parameter: the Id of the link
// second parameter: the text displayed in the link
// thrid parameter: OPTIONAL. if a class is needed, add the class here
function createLink(aId, aText, aClass) {
  let a = document.createElement('a');
  a.href = '#';
  a.textContent = aText;
  a.id = aId;
  if (aClass) {
    a.classList.add(aClass);
  }
  return a;
}

function createDiv(divClass, id) {
  let div = document.createElement('div');
  if (divClass) {
    div.classList.add(divClass);
  }

  if (id) {
    div.id = id;
  }

  return div;
}

function createParagraph(pText, pClass, pId) {
  let p = document.createElement('p');
  p.innerHTML = pText;
  if (pClass) {
    p.classList.add(pClass);
  }
  if (pId) {
    p.id = pId;
  }
  return p;
}

function createTinyMCE(note) {
  let textarea = document.createElement('textarea');
  textarea.id = 'tinyMCEEditor';
  textarea.innerText = note.textContent;
  return textarea;
}

export {
  createH2,
  createH3,
  createInputWithLabel,
  createInputNoLabel,
  createButton,
  createIconButton,
  createLink,
  createDiv,
  createParagraph,
  createTinyMCE,
};
