'use strict';

// getting DOM Elements
const form = document.getElementById('form');
const list = document.getElementById('list');

const Todo = function (activity, date) {
  this.activity = activity;
  this.date = date;
  Todo.all.push(this);
};
Todo.all = [];

Todo.prototype.addToLocalStorage = function () {
  localStorage.setItem('Todo', JSON.stringify(Todo.all));
};

//Event Functions

const handleSubmit = function (event) {
  event.preventDefault();

  let doing = event.target.doing.value;
  let date = event.target.date.value;

  let todo = new Todo(doing, date);

  todo.addToLocalStorage();
  form.reset();
  renderTodos();
};
const handleDelete = function (event) {
  if (event.target.matches('.remove')) {
    console.log('hello');
    Todo.all.splice(event.target.id, 1);
    localStorage.setItem('Todo', JSON.stringify(Todo.all));
    renderTodos();
    console.log(Todo.all);
  }
};

//
const renderTodos = function () {
  if (localStorage.Todo) {
    Todo.all = JSON.parse(localStorage.getItem('Todo'));
  }
  list.innerHTML = '';
  for (let index = 0; index < Todo.all.length; index++) {
    let container = document.createElement('div');
    let inner = document.createElement('div');
    let inner2 = document.createElement('div');

    let heading = document.createElement('h2');
    let par = document.createElement('p');
    let remove = document.createElement('span');

    heading.textContent = `${index + 1}. ${Todo.all[index].activity}`;
    par.textContent = `${Todo.all[index].date}`;

    inner.appendChild(heading);
    inner.appendChild(remove);
    remove.textContent = 'X';
    remove.setAttribute('id', index);
    remove.setAttribute('class', 'remove');

    inner2.appendChild(par);

    container.appendChild(inner);
    container.appendChild(inner2);
    container.classList.add('item');
    list.appendChild(container);
  }
};
renderTodos();

// event listeners
form.addEventListener('submit', handleSubmit);
list.addEventListener('click', handleDelete);
