import { NewDemo } from '@ne1410s/new-demo';
import './styles.scss';
export { NewDemo };

const redMenu = document.createElement('new-demo');
const redItem1 = document.createElement('li');
const redSub1 = document.createElement('ul');
const redSubItem1 = document.createElement('li');
redItem1.innerText = 'Item 1 Prog';
redSubItem1.innerText = 'Edit labels';
redSub1.appendChild(redSubItem1);
redItem1.appendChild(redSub1);
redMenu.appendChild(redItem1);
document.querySelector('.red.box')!.appendChild(redMenu);
document.querySelectorAll<NewDemo>('new-demo').forEach((m) => {
  m.addEventListener('itemselect', (event) => console.log(event));
  m.addEventListener('itemhover', (event) => console.log(event));
  m.addEventListener('itemunhover', (event) => console.log(event));
});
