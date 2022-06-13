const clearBtn = document.querySelector('.clear-completed');

let todos = JSON.parse(localStorage.getItem('todo-list')) || [];
const refBtn = document.querySelector('.refresh-btn');

refBtn.addEventListener('click', () => {
  window.location.reload();
});
const form = document.querySelector('.form-input');

window.updateStatus = (selectedTask) => {
  const task = selectedTask.parentElement.nextElementSibling.firstElementChild;

  if (selectedTask.checked) {
    task.classList.add('checked');
    todos[selectedTask.id - 1].completed = true;
  } else {
    task.classList.remove('checked');
    todos[selectedTask.id - 1].completed = false;
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
};

const displayTask = (todo) => {
  const isCompleted = todo.completed === true ? 'checked' : '';
  const divEl = document.querySelector('.task-ul');
  const div = document.createElement('div');
  div.classList.add('todo-div');
  div.innerHTML = `
  <div>
    <input onclick="updateStatus(this)" class="check" type="checkbox" id="${todo.index}" ${isCompleted} />
    </div>
    <div class="para-div">
    <p class=${isCompleted} contenteditable="true" class="todo-para">${todo.name}</p>
    </div>
    <div>
    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
    <ion-icon id="delete" name="trash-outline"></ion-icon>
    
    </div>
    `;
  divEl.appendChild(div);
};

const showNewTodo = () => {
  todos.forEach((todo) => {
    if (todo.index >= todos.length) {
      displayTask(todo);
    }
  });
};

const showTodo = () => {
  todos.forEach((todo) => {
    displayTask(todo);
  });
};

showTodo();
function editFunc() {
  const par = document.body.querySelectorAll('.todo-para');

  par.forEach((item) => {
    let previousTask = item.textContent;
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newTask = item.textContent;
        const filteredNew = todos.filter((todo) => todo.name === previousTask);
        todos[filteredNew[0].index - 1].name = newTask;
        previousTask = newTask;
        localStorage.setItem('todo-list', JSON.stringify(todos));
      }
    });
  });
}
editFunc();

function showError() {
  const messageDiv = document.querySelector('.message');
  const para = document.createElement('p');
  para.classList.add('error');
  para.textContent = 'Enter a todo';
  messageDiv.appendChild(para);
  function hideElement() {
    messageDiv.style.display = 'none';
  }
  setTimeout(hideElement, 2000);
}
function deleteFunc() {
  const btnCl = document.querySelectorAll('#delete');
  btnCl.forEach((item) => {
    item.addEventListener('click', (e) => {
      const divVar = e.target.parentElement.previousElementSibling.textContent.trim();
      todos = todos.filter((todo) => todo.name !== divVar);
      for (let i = 0; i < todos.length; i += 1) {
        todos[i].index = i + 1;
      }
      const deletedItem = item.parentElement.parentElement;
      const parent = deletedItem.parentElement;
      parent.removeChild(deletedItem);
      localStorage.setItem('todo-list', JSON.stringify(todos));
    });
  });
}
deleteFunc();

form.addEventListener('submit', (e) => {
  const todoVal = document.querySelector('#todo');
  const todoValue = todoVal.value.trim();
  if (!todoValue) {
    e.preventDefault();
    showError();
  } else {
    e.preventDefault();
    todoVal.value = '';
    if (!todos) {
      todos = [];
    }
    const taskInfo = {
      name: todoValue,
      completed: false,
      index: todos.length + 1,
    };
    todos.push(taskInfo);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showNewTodo();
    editFunc();
    deleteFunc();
  }
});

function deleteCompleted() {
  const checkBox = document.querySelectorAll('.check');
  const divEl = document.querySelector('.task-ul');
  checkBox.forEach((item) => {
    if (item.checked) {
      const checkPa = item.parentElement.parentElement;
      divEl.removeChild(checkPa);
    }
  });
  todos = todos.filter((todo) => todo.completed !== true);
  for (let i = 0; i < todos.length; i += 1) {
    todos[i].index = i + 1;
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
}

clearBtn.addEventListener('click', () => {
  deleteCompleted();
});
