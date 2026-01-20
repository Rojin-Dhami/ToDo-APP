const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const remainingDisplay = document.getElementById('remaining-count');
const completedDisplay = document.getElementById('completed-count');

// Initialize State
let tasks = [];

// 1. Add Task
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(newTask);
    input.value = '';
    render();
});

// 2. Handle Clicks (Delete and Toggle)
todoList.addEventListener('click', (e) => {
    const id = Number(e.target.parentElement.dataset.id);

    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(t => t.id !== id);
    } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'LI') {
        const taskId = e.target.closest('li').dataset.id;
        const task = tasks.find(t => t.id == taskId);
        task.completed = !task.completed;
    }
    render();
});

// 3. Update UI and Scoreboard
function render() {
    todoList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);
    });

    // Update Scoreboard
    const completedCount = tasks.filter(t => t.completed).length;
    completedDisplay.innerText = completedCount;
    remainingDisplay.innerText = tasks.length - completedCount;
}