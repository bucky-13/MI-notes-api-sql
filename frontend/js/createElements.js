// pass in the text that will be displayed in the h2 element
function createH2(text) {
  let h2 = document.createElement('h2');
  h2.textContent = text;
  return h2;
}

// first parameter: the type of input (i.e. text, password etc)
// second parameter: the id for the input
// third parameter: the text displayed in the span (essentially the label)
function createInputWithLabel(type, id, spanText) {
  let label = document.createElement('label');
  label.classList.add('form-label');

  let span = document.createElement('span');
  span.textContent = spanText;

  let input = document.createElement('input');
  input.setAttribute('type', type);
  input.classList.add('textfield');
  input.id = id;

  label.append(span, input);
  return label;
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

export { createH2, createInputWithLabel, createButton, createLink };
