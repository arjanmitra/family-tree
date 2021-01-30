class FamilyTree {
  constructor(value) {
    if (value == undefined || typeof value != 'string') {
      throw error;
    }
    this.value = value;
    this.children = [];
  }
  insert(child) {
    const descendant = new FamilyTree(child);
    this.children.push(descendant);
  }
  findMember(name) {
    if (this.value === name) {
      return this;
    } else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].findMember(name) != undefined) {
          return this.children[i].findMember(name);
        }
      }
    }
  }
  log(depth = 1) {
    let dashes = '';
    for (let i = 0; i < depth; i++) {
      dashes += '--';
    }
    let result = `${dashes} ${this.value}`;
    if (this.children.length > 0) {
      for (let child of this.children) {
        result += `\n${child.log(depth + 1)}`;
      }
    }
    return result;
  }
  familySize() {
    return 1 + this.children.length;
  }
}

var currentNode = null;
var ancestor;
let currentChildren;

const input = document.getElementById('input');
const insert = document.getElementById('insert');
let head = document.getElementById('head');
const selectedChild = document.getElementsByClassName('child');

let dashes = '--';

insert.addEventListener('click', function () {
  if (input.value === '' || input.value === null || input.value === undefined) {
    alert('enter a name!');
  }
  if (currentNode === null) {
    ancestor = new FamilyTree(input.value);
    let newparent = document.createElement('li');
    newparent.innerHTML = input.value;
    newparent.id = input.value;
    head.appendChild(newparent);
    currentNode = ancestor;
  } else {
    currentNode.insert(input.value);
    currentChildren = currentNode.children;
    let ulchild = document.createElement('ul');
    let newchild = document.createElement('li');
    newchild.id = input.value;
    newchild.innerHTML = input.value;
    head.appendChild(ulchild);
    ulchild.appendChild(newchild);
    // head.innerHTML += `<div>||</div><div id=${input.value}>${dashes}<button>${input.value}</button></div>`;
  }
  console.log(currentNode);
});

head.addEventListener('click', function (child) {
  if (child.target.tagName === 'LI') {
    currentNode = ancestor.findMember(child.target.id);
    head = document.getElementById(child.target.id);
    console.log(head);
  }
});
