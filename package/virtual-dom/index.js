import Element from './Element';
import diff from './diff';
import patch from './patch';

let ul = new Element(
    'ul',
    {
        id: 'list'
    },
    [
        new Element('li', { class: 'item' }, ['Item1']),
        new Element('li', { class: 'item' }, ['Item2']),
        new Element('li', { class: 'item' }, ['Item3']),
        new Element('li', { class: 'item', key: 4 }, ['Item4']),
    ]
);

let ul2 = new Element(
    'ul',
    {
        id: 'list'
    },
    [
        new Element('li', { class: 'item' }, ['Item3']),
        new Element('li', { class: 'item' }, ['Item2']),
        new Element('li', { class: 'item', key: 4 }, ['Item4']),
        new Element('li', { class: 'item' }, ['Item1']),
    ]
);

let ulRoot = ul.render();
let patches = diff(ul, ul2);
console.log(patches);
document.body.appendChild(ulRoot);

setTimeout(function () {
    patch(ulRoot, patches)
}, 4000);