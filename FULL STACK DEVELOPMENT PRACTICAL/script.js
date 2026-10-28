let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

filterAll.addEventListener('click', () => setFilter('all'));
filterActive.addEventListener('click', () => setFilter('active'));
filterCompleted.addEventListener('click', () => setFilter('completed'));
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Please enter a valid task.');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;
    
    filterAll.classList.remove('active');
    filterActive.classList.remove('active');
    filterCompleted.classList.remove('active');

    if (filter === 'all') filterAll.classList.add('active');
    if (filter === 'active') filterActive.classList.add('active');
    if (filter === 'completed') filterCompleted.classList.add('active');

    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed);
    taskCounter.textContent = `${activeTasks.length} remaining`;
}

function renderTasks() {
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="list-group-item text-center text-muted">No tasks yet. Add your first task!</li>`;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const div = document.createElement('div');
        div.className = 'form-check';

        const checkbox = document.createElement('input');
        checkbox.className = 'form-check-input';
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.id = `task-${task.id}`;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const label = document.createElement('label');
        label.className = `form-check-label ${task.completed ? 'completed-task' : ''}`;
        label.htmlFor = `task-${task.id}`;
        label.textContent = task.text;

        div.appendChild(checkbox);
        div.appendChild(label);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(div);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateCounter();
}

renderTasks();