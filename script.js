const tasks = [];
const completedTasks = [];

const newTaskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task');
const pendingTasksList = document.querySelector('#pending-tasks-list');
const completedTasksList = document.querySelector('#completed-tasks-list');

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const newTask = newTaskInput.value.trim();
  
  if (newTask !== '') {
    const task = {
      id: Date.now(),
      name: newTask,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    };
    tasks.push(task);

    const li = createTaskListItem(task);
    pendingTasksList.appendChild(li);
  }
  
  newTaskInput.value = '';
}

function createTaskListItem(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  li.innerHTML = `
    <span>${task.name}</span>
    <button class="complete-task-btn">Complete</button>
    <button class="delete-task-btn">&times;</button>
  `;
  
  const completeBtn = li.querySelector('.complete-task-btn');
  const deleteBtn = li.querySelector('.delete-task-btn');
  completeBtn.addEventListener('click', completeTask);
  deleteBtn.addEventListener('click', deleteTask);

  return li;
}

function completeTask() {
  const taskId = parseInt(this.parentNode.getAttribute('data-id'));

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks[taskIndex].completed = true;
  tasks[taskIndex].completedAt = new Date();

  const completedTask = tasks.splice(taskIndex, 1)[0];
  completedTasks.push(completedTask);

  updateTaskListItems();
}

function deleteTask() {
  const taskId = parseInt(this.parentNode.getAttribute('data-id'));

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  tasks.splice(taskIndex, 1);

  const taskListItem = document.querySelector(`[data-id="${taskId}"]`);
  taskListItem.remove();

  updateTaskListItems();
}

function updateTaskListItems() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach(task => {
    const li = createTaskListItem(task);
    if (task.completed) {
      completedTasksList.appendChild(li);
    } else {
      pendingTasksList.appendChild(li);
    }
  });
}

updateTaskListItems();
