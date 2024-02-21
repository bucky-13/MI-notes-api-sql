import { createDiv, createH2, createParagraph } from '../lib/createElements.js';

let app = document.querySelector('#app');

let firstP = `The Candlekeep Library, what was considered to be the largest and most comprehensive collection of scholarly writings, lore and knowledge in all of Faerûn. It addition to the great works and rare tome found within, the Great Library held a seemingly endless amount of paltry and insignificant documents such as recipes, inscribed song lyrics, journals of fairly unremarkable individuals and other such trivial writings. It held a dozen towers, known as "necessariums", that offered seekers ample place to study and read in peace.`;

let secondP = `Scholars of all races and backgrounds, even those from other planes of existence, were granted a place in Candlekeep, so long as they abided by the Orders of Accordance. The Avowed counted Humans, tieflings, dragonborn, and even githzerai among its members, and at least one ogre scholar was granted residence within the keep's walls. There were even a small number of modrons granted safe harbor in Candlekeep, far away from their home plane of Mechanus.`;

let thirdP = `The subterranean vaults guarded by the ghost of the silver dragon Miirym the Sentinel Wyrm, who was bound to defend Candlekeep and the Avowed by the great sorcerer Torth.`;

export default function displayAboutSection() {
  app.innerHTML = '';

  let div = createDiv('about-div');
  let h2 = createH2('About Candlekeep Library');

  let image = document.createElement('img');
  image.setAttribute('src', '/frontend/images/candlekeep.webp');
  image.setAttribute('width', '400');
  image.setAttribute('height', '400');
  image.classList.add('about-img');

  let p1 = createParagraph(firstP);
  let p2 = createParagraph(secondP);
  let p3 = createParagraph(thirdP);
  let p4 = createParagraph('by Volothamp Geddarm', 'italic');
  div.append(h2, p1, image, p2, p3, p4);
  app.append(div);
  console.log('about');
}
