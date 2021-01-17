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

const input = document.getElementById('input');
const insert = document.getElementById('insert');
let head = document.getElementById('head');
const selectedChild = document.getElementsByClassName('child');

//document.addEventListener('click');
let dashes = '--';

insert.addEventListener('click', function () {
  if (input.value === '' || input.value === null || input.value === undefined) {
    alert('enter a name!');
  }
  if (currentNode === null) {
    ancestor = new FamilyTree(input.value);
    head.innerHTML += `<div id=${input.value}><button>${input.value}</button></div>`;
    currentNode = ancestor;
  } else {
    currentNode.insert(input.value);
    head.innerHTML += `<div id=${input.value}>${dashes}<button>${input.value}</button></div>`;
  }
  console.log(currentNode);
});

head.addEventListener('click', function (child) {
  if (!currentNode.children.includes(child.target.innerHTML)) {
    dashes += '--';
  }
  currentNode = ancestor.findMember(child.target.innerHTML);
  head = document.getElementById(child.target.innerHTML);
});
